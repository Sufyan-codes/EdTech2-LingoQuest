import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LingoAIDemo.css';

const LingoAIDemo = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [language, setLanguage] = useState('English');
  const [proficiency, setProficiency] = useState('beginner');
  const [useVoice, setUseVoice] = useState(false);
  
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start new session when component mounts
  useEffect(() => {
    startNewSession();
  }, []);

  const startNewSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/session/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          proficiency: proficiency
        })
      });

      const data = await response.json();
      if (data.session_id) {
        setSessionId(data.session_id);
        setMessages([{
          type: 'bot',
          text: `Hello! I'm your AI tutor. I'll help you practice at the ${proficiency} level. Let's start chatting! 🌟`
        }]);
      }
    } catch (error) {
      console.error('Error starting session:', error);
      setMessages([{
        type: 'bot',
        text: 'Welcome to Lingo AI! Currently, the AI tutor is unavailable. Please try again later or contact support.'
      }]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
          language: language,
          proficiency: proficiency,
          use_voice: useVoice
        })
      });

      const data = await response.json();
      
      if (data.bot_response) {
        // Add bot response to chat
        setMessages(prev => [...prev, { type: 'bot', text: data.bot_response }]);

        // Play audio if available and voice is enabled
        if (useVoice && data.audio_data) {
          playAudio(data.audio_data);
        }
      } else if (data.error) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: `Sorry, I encountered an error: ${data.error}` 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I cannot connect to the AI tutor right now. Please check your connection and try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioBase64) => {
    try {
      const audioSrc = `data:audio/wav;base64,${audioBase64}`;
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const resetConversation = async () => {
    if (!sessionId) return;

    try {
      await fetch('http://localhost:5000/api/session/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      setMessages([{
        type: 'bot',
        text: `Conversation reset! Let's continue practicing ${language}. What would you like to talk about?`
      }]);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Reset conversation when language changes
    setTimeout(() => {
      startNewSession();
    }, 100);
  };

  const handleProficiencyChange = (newProficiency) => {
    setProficiency(newProficiency);
    // Reset conversation when proficiency changes
    setTimeout(() => {
      startNewSession();
    }, 100);
  };

  return (
    <div className="lingo-ai-demo-container">
      {/* Header */}
      <header className="demo-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Back to LingoQuest
        </button>
        <h1>Lingo AI Tutor Demo</h1>
        <p>Practice conversations with our AI language tutor</p>
      </header>

      {/* Main Chat Interface */}
      <div className="demo-main">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-info">
              <h2>Lingo AI Tutor</h2>
              <span className="status">Online</span>
            </div>
            
            <div className="chat-controls">
              <div className="control-group">
                <label>Language:</label>
                <select 
                  value={language} 
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="control-select"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              
              <div className="control-group">
                <label>Level:</label>
                <select 
                  value={proficiency} 
                  onChange={(e) => handleProficiencyChange(e.target.value)}
                  className="control-select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="control-group">
                <label className="voice-toggle">
                  <input 
                    type="checkbox" 
                    checked={useVoice}
                    onChange={(e) => setUseVoice(e.target.checked)}
                  />
                  Voice Responses
                </label>
              </div>

              <button onClick={resetConversation} className="control-btn reset-btn">
                New Conversation
              </button>
            </div>
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-icon">🤖</div>
                <h3>Welcome to Lingo AI!</h3>
                <p>Start a conversation to practice your language skills. I'll help you with corrections and natural conversations.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'bot' ? '🤖' : '👤'}
                  </div>
                  <div className="message-content">
                    <div className="message-bubble">
                      {message.text}
                    </div>
                    <div className="message-time">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type your message ... (Press Enter to send)`}
                disabled={isLoading}
                rows="2"
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="send-btn"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
            <div className="input-hint">
              💡 Tip: Try having a natural conversation. The AI will correct your mistakes gently.
            </div>
          </div>
        </div>

        {/* Demo Information Sidebar */}
        <div className="demo-sidebar">
          <div className="sidebar-section">
            <h3>About Lingo AI</h3>
            <p>This demo showcases our AI-powered language tutor that helps you practice real conversations with instant feedback.</p>
          </div>

          <div className="sidebar-section">
            <h3>Features</h3>
            <ul>
              <li>🌍 Multiple languages</li>
              <li>📊 Proficiency levels</li>
              <li>🔊 Voice responses</li>
              <li>✏️ Real-time corrections</li>
              <li>💬 Natural conversations</li>
            </ul>
          </div>

          <div className="sidebar-section">
            
            <div className="tips">
              <div className="tip">
                
              
                
              </div>
            </div>
          </div>

          <div className="sidebar-section cta-section">
            <h3>Ready for more?</h3>
            <p>Join LingoQuest for full access to all features:</p>
            <button 
              className="cta-button"
              onClick={() => navigate('/signup')}
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>

      {/* Hidden audio element for voice playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default LingoAIDemo;