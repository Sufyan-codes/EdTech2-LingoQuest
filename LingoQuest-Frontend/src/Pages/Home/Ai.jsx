import React from 'react'
import { useNavigate } from 'react-router-dom';
import ai from "../../assets/Icons/mingcute_ai-line.svg";
import user from "../../assets/Icons/user.svg"

export default function Ai() {
  const navigate = useNavigate();

  const handleTryDemo = () => {
    // Navigate to the Lingo AI demo page
    navigate('/lingo-ai-demo');
  };

  return (
    <section className="bg-[#FCE9DA] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1A535C] mb-6">
            Meet Lingo AI - Your 24/7 Language Companion
          </h1>
          <p className="text-lg lg:text-xl text-[#64646B] max-w-3xl mx-auto leading-relaxed">
            Ask questions, practice conversations, and get instant feedback anytime
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Chat Demo Section */}
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              {/* AI Message */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#E8C2B1] via-[#F27E4D] to-[#F27E4D] rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={ai} 
                    className="w-5 h-5" 
                    alt="Lingo AI assistant" 
                  />
                </div>
                <div className="bg-[#E3F6F8] rounded-2xl px-4 py-3 flex-1">
                  <p className="text-[#8F2D56] text-sm lg:text-base">
                    Hi, I'm Lingo AI. Ready to practice your French?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start gap-3 mb-6 justify-end">
                <div className="bg-[#218381] rounded-2xl px-4 py-3 max-w-xs">
                  <p className="text-white text-sm lg:text-base">
                    Yes! Can you help me with greetings?
                  </p>
                </div>
                <div className="w-10 h-10 bg-[#8E2E5B] rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={user} 
                    className="w-5 h-5" 
                    alt="User profile" 
                  />
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3 mb-6 border-b pb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#E8C2B1] via-[#F27E4D] to-[#F27E4D] rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={ai} 
                    className="w-5 h-5" 
                    alt="Lingo AI assistant" 
                  />
                </div>
                <div className="bg-[#E3F6F8] rounded-2xl px-4 py-3 flex-1">
                  <p className="text-[#8F2D56] text-sm lg:text-base">
                    Of course! Let's start with "Bonjour" (Good morning) and "Bonsoir" (Good evening).
                  </p>
                </div>
              </div>

              {/* Demo Button */}
              <div className="text-center mt-8">
                <button 
                  onClick={handleTryDemo}
                  className="bg-[#FFBC42] text-[#8F2D56] font-semibold py-4 px-6 rounded-full shadow-lg hover:bg-[#8F2D56] hover:text-white transition-all duration-300 transform hover:scale-105 w-full max-w-xs"
                >
                  Try Demo Chat
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-md w-full">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                
                <p className="text-gray-600 mb-6">
                  
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-[#E3F6F8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#218381] text-sm">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8F2D56]">Real Conversations</h3>
                    <p className="text-gray-600 text-sm">Practice natural dialogues with instant feedback</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-[#E3F6F8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#218381] text-sm">🔊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8F2D56]">Voice Responses</h3>
                    <p className="text-gray-600 text-sm">Hear proper pronunciation with text-to-speech</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-[#E3F6F8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#218381] text-sm">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8F2D56]">Multiple Languages</h3>
                    <p className="text-gray-600 text-sm">Learn English, Spanish, French, German & more</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-[#E3F6F8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#218381] text-sm">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8F2D56]">Personalized Learning</h3>
                    <p className="text-gray-600 text-sm">Adapts to your proficiency level and goals</p>
                  </div>
                </div>
              </div>

              {/* Additional CTA */}
              <div className="text-center lg:text-left mt-8">
                <p className="text-gray-600 text-sm mb-4">
                  Ready to transform your language learning journey?
                </p>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-[#8F2D56] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#FFBC42] hover:text-[#8F2D56] transition-all duration-300 transform hover:scale-105"
                >
                  Get Started For Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
