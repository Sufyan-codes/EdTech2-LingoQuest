import React from "react";

export default function HowItWorks() {
  return (
    <section className="bg-[#d6f0f0] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <div className="max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#6b1a3b] mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl">
            Start your language journey in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#f9b233] flex items-center justify-center text-[#6b1a3b] font-bold text-2xl mb-4 shadow-sm">
              1
            </div>
            <h3 className="font-semibold text-[#6b1a3b] text-lg mb-2">Sign Up</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create your free account in seconds
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#2f7b7b] flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-sm">
              2
            </div>
            <h3 className="font-semibold text-[#6b1a3b] text-lg mb-2">Choose Language</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pick from dozens of languages worldwide
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#c63663] flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-sm">
              3
            </div>
            <h3 className="font-semibold text-[#6b1a3b] text-lg mb-2">Learn with Lessons</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Interactive videos, quizzes, and exercises
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#6b1a3b] flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-sm">
              4
            </div>
            <h3 className="font-semibold text-[#6b1a3b] text-lg mb-2">Practice & Earn</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get XP, badges, and track your progress
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}