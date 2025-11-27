import React from "react";
import world from "../../assets/Icons/lets-icons_world-light.svg";
import badge from "../../assets/Icons/marketeq_reward.svg";
import ai from "../../assets/Icons/mingcute_ai-line.svg";
import chat from "../../assets/Icons/ph_chat-bold.svg";

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-[#EFFAFB] via-[#C1D0D2] to-[#C1D0D2] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto mb-12 lg:mb-16">
          <h1 className="lg:text-4xl text-3xl font-bold text-[#1A2634] mb-4">
            Why Choose LingoQuest?
          </h1>
          <p className="lg:text-xl text-lg text-black leading-relaxed">
            Everything you need to master a new language, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img src={world} alt="Globe icon representing global learning" />
            </div>
            <h3 className="text-[#1A2634] font-semibold text-lg mb-2">
              Learn Anytime, Anywhere
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Study on any device at your own pace with our mobile-friendly platform.
            </p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img src={ai} alt="AI icon representing artificial intelligence tutor" />
            </div>
            <h3 className="text-[#1A2634] font-semibold text-lg mb-2">
              Practice with Lingo AI
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get instant feedback and personalized lessons from your AI tutor.
            </p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img src={badge} alt="Badge icon representing achievements and rewards" />
            </div>
            <h3 className="text-[#1A2634] font-semibold text-lg mb-2">
              Earn Badges & XP
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Stay motivated with achievements, rewards, and progress tracking.
            </p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img src={chat} alt="Chat icon representing real conversations" />
            </div>
            <h3 className="text-[#1A2634] font-semibold text-lg mb-2">
              Real-Life Conversations
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Practice with native speakers and peers in realistic scenarios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}