import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useNavigate } from "react-router-dom";

export default function LingoAIPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [language, setLanguage] = useState("English");
  const [proficiency, setProficiency] = useState("beginner");
  const [useVoice, setUseVoice] = useState(false);
  
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    startNewSession();
  }, []);

  const startNewSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/session/new', {
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
          id: 1,
          text: `Hello! I'm your AI ${language} tutor. I'll help you practice at the ${proficiency} level. What would you like to talk about today? 🌟`,
          sender: "ai",
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error starting session:', error);
      setMessages([{
        id: 1,
        text: 'Welcome to Lingo AI! Currently, the AI tutor is unavailable. Please try again later or contact support.',
        sender: "ai",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId,
          language: language,
          proficiency: proficiency,
          use_voice: useVoice
        })
      });

      const data = await response.json();
      
      if (data.bot_response) {
        const aiResponse = {
          id: messages.length + 2,
          text: data.bot_response,
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);

        // Play audio if available and voice is enabled
        if (useVoice && data.audio_data) {
          playAudio(data.audio_data);
        }
      } else if (data.error) {
        setMessages(prev => [...prev, { 
          id: messages.length + 2,
          text: `Sorry, I encountered an error: ${data.error}`,
          sender: "ai",
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        id: messages.length + 2,
        text: 'Sorry, I cannot connect to the AI tutor right now. Please try again later or contact support.',
        sender: "ai",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
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
      setLoading(true);
      await fetch('http://localhost:5001/api/session/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      setMessages([{
        id: 1,
        text: `Conversation reset! Let's continue practicing ${language}. What would you like to talk about?`,
        sender: "ai",
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setTimeout(() => {
      startNewSession();
    }, 100);
  };

  const handleProficiencyChange = (newProficiency) => {
    setProficiency(newProficiency);
    setTimeout(() => {
      startNewSession();
    }, 100);
  };

  const getProficiencyColor = (level) => {
    const colors = {
      'beginner': '#2EA148',
      'intermediate': '#DDB824',
      'advanced': '#FF6B6B'
    };
    return colors[level] || '#2EA148';
  };

  const quickPrompts = [
    "How do you say 'hello' in Spanish?",
    "Can you help me practice ordering food in a restaurant?",
    "Explain the past tense in French",
    "What's the difference between 'ser' and 'estar'?",
    "Let's have a conversation about travel",
    "Help me with pronunciation practice"
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] flex flex-col lg:flex-row">
      <Header />
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2EA148] to-[#4BC667] flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1A535C]">LingoAI Assistant</h1>
              <p className="text-gray-600">
                Your AI-powered language learning companion. Practice conversations, get translations, and learn grammar.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
              {/* Controls */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select 
                    value={language} 
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EA148]"
                  >
                    <option value="English">English 🇺🇸</option>
                    <option value="Spanish">Spanish 🇪🇸</option>
                    <option value="French">French 🇫🇷</option>
                    <option value="German">German 🇩🇪</option>
                    <option value="Italian">Italian 🇮🇹</option>
                  </select>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Proficiency</label>
                  <select 
                    value={proficiency} 
                    onChange={(e) => handleProficiencyChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EA148]"
                    style={{ color: getProficiencyColor(proficiency) }}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Voice</label>
                  <button
                    onClick={() => setUseVoice(!useVoice)}
                    className={`px-3 py-2 rounded-lg font-medium ${useVoice ? 'bg-[#2EA148] text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {useVoice ? '🔊 Voice On' : '🔇 Voice Off'}
                  </button>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Actions</label>
                  <button 
                    onClick={resetConversation}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    🔄 New Chat
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[400px] overflow-y-auto mb-4 p-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-[#2EA148] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-left mb-4">
                    <div className="inline-block p-3 rounded-lg bg-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type your message in ${language}... (Press Enter to send)`}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EA148]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-[#2EA148] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#248C3D] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-bold text-lg mb-3">Quick Prompts</h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#2EA148] to-[#4BC667] rounded-xl p-4 text-white">
              <h3 className="font-bold text-lg mb-2">AI Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>🎯</span>
                  <span>Be specific about what you want to practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📚</span>
                  <span>Ask for vocabulary related to topics you enjoy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔊</span>
                  <span>Use voice features for pronunciation practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>💬</span>
                  <span>Don't worry about mistakes - that's how we learn!</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-bold text-lg mb-3">Session Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Current Language</p>
                  <p className="font-medium">{language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Proficiency Level</p>
                  <p className="font-medium" style={{ color: getProficiencyColor(proficiency) }}>
                    {proficiency.charAt(0).toUpperCase() + proficiency.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Messages</p>
                  <p className="font-medium">{messages.length} total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} style={{ display: 'none' }} />
        
        <MobileNav />
      </main>
    </div>
  );
}