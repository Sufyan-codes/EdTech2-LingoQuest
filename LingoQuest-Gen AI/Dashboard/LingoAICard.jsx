import React, { useState, useEffect } from "react";

export default function LingoAICard() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Initialize session on component mount
  useEffect(() => {
    startNewSession();
  }, []);

  const startNewSession = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/session/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'English',
          proficiency: 'beginner'
        })
      });

      const data = await response.json();
      if (data.session_id) {
        setSessionId(data.session_id);
        setResponse(`Hello! I'm LingoAI, your language learning assistant. How can I help you today?`);
      }
    } catch (error) {
      console.error('Error starting session:', error);
      setResponse('Welcome to LingoAI! Ready to help you learn languages.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    const userQuestion = prompt.trim();
    setPrompt("");

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userQuestion,
          session_id: sessionId,
          language: 'English',
          proficiency: 'beginner',
          use_voice: false
        })
      });

      const data = await response.json();
      if (data.bot_response) {
        setResponse(data.bot_response);
      } else if (data.error) {
        setResponse(`Sorry, I encountered an error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error calling LingoAI:', error);
      setResponse("I'm having trouble connecting to the AI tutor right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How do I say 'hello' in Spanish?",
    "Explain the past tense in French",
    "Help me practice ordering food in Italian",
    "What's the difference between 'ser' and 'estar'?"
  ];

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2EA148] to-[#4BC667] flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-white" 
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
          <h3 className="font-bold text-lg text-[#1A535C]">LingoAI Assistant</h3>
          <p className="text-gray-500 text-sm">Your AI language tutor</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Ask me anything about language learning! I can help with translations, grammar, or practice conversations.
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question here..."
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2EA148] focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2EA148] text-white p-2 rounded-lg hover:bg-[#248C3D] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "→"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2EA148]"></div>
          <p className="text-gray-500 text-sm mt-2">Thinking...</p>
        </div>
      )}

      {/* THIS IS THE MISSING SECTION - Add this to show responses */}
      {response && !loading && (
        <div className="bg-gradient-to-r from-[#DFF5F7] to-[#E8F7F8] p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#2EA148] flex items-center justify-center flex-shrink-0">
              <svg 
                className="w-4 h-4 text-white" 
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
            <div className="flex-1">
              <p className="text-gray-700 text-sm">{response}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3 pl-11">
            <button 
              className="text-xs text-[#2EA148] hover:underline px-2 py-1 hover:bg-[#2EA148]/10 rounded"
              onClick={() => navigator.clipboard.writeText(response)}
            >
              Copy Response
            </button>
            <button 
              className="text-xs text-[#2EA148] hover:underline px-2 py-1 hover:bg-[#2EA148]/10 rounded"
              onClick={() => setPrompt("Can we practice this conversation more?")}
            >
              Practice This
            </button>
            <button 
              className="text-xs text-[#2EA148] hover:underline px-2 py-1 hover:bg-[#2EA148]/10 rounded"
              onClick={startNewSession}
            >
              New Chat
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setPrompt(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}