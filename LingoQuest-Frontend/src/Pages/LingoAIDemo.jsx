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
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Get API URL from environment variable or use default
  const API_URL = 'https://generative-ai-sbta.onrender.com' || 'http://localhost:5001';

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
      setIsLoading(true);
      
      // UPDATED: Use API_URL variable instead of hardcoded localhost
      const response = await fetch(`${API_URL}/api/session/new`, {
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
          text: `Hello! I'm your AI ${language} tutor. I'll help you practice at the ${proficiency} level. What would you like to talk about today? 🌟`,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error starting session:', error);
      setMessages([{
        type: 'bot',
        text: `Welcome to Lingo AI! I'm having trouble connecting to the AI tutor. Please check if the backend is running.`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const userMessageObj = {
      type: 'user', 
      text: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessageObj]);

    try {
      // UPDATED: Use API_URL variable instead of hardcoded localhost
      const response = await fetch(`${API_URL}/api/chat`, {
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
        const botMessageObj = {
          type: 'bot', 
          text: data.bot_response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessageObj]);

        // Play audio if available and voice is enabled
        if (useVoice && data.audio_data) {
          playAudio(data.audio_data);
        }
      } else if (data.error) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: `Sorry, I encountered an error: ${data.error}`,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I cannot connect to the AI tutor right now. Please check your connection and try again.',
        timestamp: new Date()
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
      setIsLoading(true);
      
      // UPDATED: Use API_URL variable instead of hardcoded localhost
      await fetch(`${API_URL}/api/session/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      setMessages([{
        type: 'bot',
        text: `Conversation reset! Let's continue practicing ${language}. What would you like to talk about?`,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    } finally {
      setIsLoading(false);
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

  // ... rest of your component remains the same
  // (formatTime, getLanguageFlag, getProficiencyColor, quickReplies, etc.)

  return (
    <div className="lingo-ai-demo-container">
      {/* ... rest of your JSX remains exactly the same ... */}
      
      {/* Don't forget to add the hidden audio element */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default LingoAIDemo;

