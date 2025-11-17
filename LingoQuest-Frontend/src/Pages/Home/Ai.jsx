import React from 'react'
import ai from "../../assets/Icons/mingcute_ai-line.svg";
import user from "../../assets/Icons/user.svg"

export default function Ai() {
  return (
    <section className="bg-[#EFEDE9] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#8F2D56] mb-6">
            Meet Lingo AI - Your 24/7 Language Companion
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ask questions, practice conversations, and get instant feedback anytime
          </p>
        </div>

        <div className="flex justify-center">
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
                <button className="bg-[#FFBC42] text-[#8F2D56] font-semibold py-4 px-6 rounded-full shadow-lg hover:bg-[#8F2D56] hover:text-white transition-all duration-300 transform hover:scale-105 w-full max-w-xs">
                  Try Demo Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}