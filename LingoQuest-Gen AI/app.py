import os
import requests
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from dotenv import load_dotenv

from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import LLMChain
import uuid
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["*"],  # For now, allow all. You can restrict later.
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Store user sessions
user_sessions = {}

class TextToSpeechProcessor:
    def __init__(self, target_language="English"):
        self.api_key = os.getenv("DEEPGRAM_API_KEY")
        if not self.api_key:
            raise ValueError("DEEPGRAM_API_KEY not found in environment variables")
        
        self.target_language = target_language
        self.model = self._select_best_model(target_language)
        
    def _select_best_model(self, language):
        """Select the best Deepgram model based on language and free tier constraints"""
        language_models = {
            "English": "aura-asteria-en",
            "Spanish": "aura-2-estrella-es",
        }
        return language_models.get(language, "aura-asteria-en")

    def text_to_speech(self, text: str):
        """Convert text to speech and return audio data"""
        if not text or not text.strip():
            return None
            
        # Clean text for TTS
        clean_text = self._clean_text_for_speech(text)
        if not clean_text:
            return None
            
        url = f"https://api.deepgram.com/v1/speak?model={self.model}&encoding=linear16&sample_rate=24000"
        headers = {
            "Authorization": f"Token {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {"text": clean_text}

        try:
            response = requests.post(url, headers=headers, json=payload)
            if response.status_code == 200:
                return response.content
            else:
                print(f"TTS Error {response.status_code}: {response.text}")
                return None
        except Exception as e:
            print(f"TTS Error: {e}")
            return None

    def _clean_text_for_speech(self, text):
        """Clean text for better TTS output"""
        import re
        clean_text = re.sub(r'\[Correction:[^\]]*\]', '', text)
        clean_text = re.sub(r'\*.*?\*', '', clean_text)
        clean_text = re.sub(r'_.*?_', '', clean_text)
        clean_text = ' '.join(clean_text.split())
        
        if len(clean_text) > 500:
            clean_text = clean_text[:500] + "..."
            
        return clean_text.strip()

class LanguageModelProcessor:
    def __init__(self, target_language="English", proficiency_level="beginner"):
        groq_api_key = os.getenv('GROQ_API_KEY')
        
        if not groq_api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        self.llm = ChatGroq(
            temperature=0.7,
            model_name="llama-3.1-8b-instant", 
            groq_api_key=groq_api_key,
            max_tokens=150
        )

        self.memory = ConversationBufferWindowMemory(
            memory_key="chat_history", 
            return_messages=True,
            k=6
        )
        
        self.target_language = target_language
        self.proficiency_level = proficiency_level

        # Load bot prompt
        try:
            with open('Bot_prompt_2.txt', 'r') as file:
                bot_prompt_template = file.read().strip()
        except FileNotFoundError:
            # Fallback prompt
            bot_prompt_template = """You are Lingo AI, a friendly AI language tutor for {target_language} at {proficiency_level} level. 
            Correct errors gently and have natural conversations."""
            
        self.bot_prompt = bot_prompt_template.format(
            target_language=target_language,
            proficiency_level=proficiency_level
        )

        self.prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(self.bot_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{text}")
        ])

        self.conversation = LLMChain(
            llm=self.llm,
            prompt=self.prompt,
            memory=self.memory,
            verbose=False
        )

    def process(self, text):
        try:
            start_time = time.time()
            response = self.conversation.invoke({"text": text})
            processing_time = time.time() - start_time
            
            if not response['text'].strip():
                return "I'd love to help you practice! Could you try rephrasing that?"
                
            return response['text']
        except Exception as e:
            return f"I'm having trouble responding right now. Please try again."

    def reset_conversation(self):
        """Reset the conversation memory"""
        self.memory.clear()

def get_or_create_session(session_id):
    """Get existing session or create new one"""
    if session_id not in user_sessions:
        user_sessions[session_id] = {
            'llm_processor': LanguageModelProcessor(),
            'tts_processor': TextToSpeechProcessor(),
            'created_at': time.time()
        }
    return user_sessions[session_id]

# API Routes
@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        session_id = data.get('session_id')
        language = data.get('language', 'English')
        proficiency = data.get('proficiency', 'beginner')
        use_voice = data.get('use_voice', False)

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        if not session_id:
            session_id = str(uuid.uuid4())

        # Get or create user session
        session_data = get_or_create_session(session_id)
        llm_processor = session_data['llm_processor']
        tts_processor = session_data['tts_processor']

        # Update language/proficiency if changed
        if (language != llm_processor.target_language or 
            proficiency != llm_processor.proficiency_level):
            llm_processor = LanguageModelProcessor(language, proficiency)
            tts_processor = TextToSpeechProcessor(language)
            session_data['llm_processor'] = llm_processor
            session_data['tts_processor'] = tts_processor

        # Get bot response
        bot_response = llm_processor.process(user_message)

        # Generate audio if requested
        audio_data = None
        if use_voice:
            audio_data = tts_processor.text_to_speech(bot_response)
            if audio_data:
                # Convert to base64 for frontend
                import base64
                audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            else:
                audio_base64 = None
        else:
            audio_base64 = None

        return jsonify({
            'session_id': session_id,
            'bot_response': bot_response,
            'audio_data': audio_base64,
            'language': language,
            'proficiency': proficiency
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/session/new', methods=['POST'])
def new_session():
    """Start a new chat session"""
    try:
        data = request.json
        language = data.get('language', 'English')
        proficiency = data.get('proficiency', 'beginner')
        
        session_id = str(uuid.uuid4())
        session_data = {
            'llm_processor': LanguageModelProcessor(language, proficiency),
            'tts_processor': TextToSpeechProcessor(language),
            'created_at': time.time()
        }
        user_sessions[session_id] = session_data

        return jsonify({
            'session_id': session_id,
            'language': language,
            'proficiency': proficiency,
            'message': 'New session started'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/session/reset', methods=['POST'])
def reset_session():
    """Reset conversation for current session"""
    try:
        data = request.json
        session_id = data.get('session_id')
        
        if session_id in user_sessions:
            user_sessions[session_id]['llm_processor'].reset_conversation()
            return jsonify({'message': 'Conversation reset successfully'})
        else:
            return jsonify({'error': 'Session not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/languages', methods=['GET'])
def get_languages():
    """Get available languages"""
    return jsonify({
        'languages': [
            {'code': 'en', 'name': 'English', 'model': 'aura-asteria-en'},
            {'code': 'es', 'name': 'Spanish', 'model': 'aura-2-estrella-es'}
        ]
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Lingo AI Backend'})

# Clean up old sessions (basic implementation)
def cleanup_old_sessions():
    """Remove sessions older than 1 hour"""
    current_time = time.time()
    expired_sessions = []
    for session_id, session_data in user_sessions.items():
        if current_time - session_data['created_at'] > 3600:  # 1 hour
            expired_sessions.append(session_id)
    
    for session_id in expired_sessions:
        del user_sessions[session_id]

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

# Update the port settings
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)

