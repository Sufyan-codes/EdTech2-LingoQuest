import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Onboarding2() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const skillLevels = [
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between mb-3 text-[#8F2D56] font-medium">
            <p>Step 2 of 3</p>
            <p>67%</p>
          </div>
          <div className="bg-[#8F2D56] rounded-full h-3">
            <div 
              className="bg-[#FFBC42] h-3 rounded-full transition-all duration-500"
              style={{ width: '67%' }}
            ></div>
          </div>
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[#8F2D56] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            What's your skill level?
          </h1>
          <p className="text-[#8F2D56] text-lg">We'll customize your learning path accordingly</p>
        </div>

        {/* Skill Levels Grid */}
        <div className="max-w-md mx-auto mb-12 space-y-4">
          {skillLevels.map((level) => (
            <div
              key={level.id}
              className={`w-full p-6 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedLevel === level.id
                  ? "bg-[#218381] ring-4 ring-[#FFBC42] transform scale-105"
                  : "bg-[#218381] hover:bg-[#1a6b6a] hover:shadow-lg hover:transform hover:scale-105"
              }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <p className="text-white text-xl font-medium">{level.name}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/onboarding1"
            className="border-2 border-[#8F2D56] text-[#8F2D56] px-8 py-4 font-semibold rounded-lg hover:bg-[#8F2D56] hover:text-white transition-all duration-300"
          >
            Back
          </Link>
          <Link
            to={selectedLevel ? "/onboarding3" : "#"}
            className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
              selectedLevel
                ? "bg-[#FFBC42] text-[#8F2D56] hover:bg-[#ffa90d] hover:shadow-lg transform hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  )
}