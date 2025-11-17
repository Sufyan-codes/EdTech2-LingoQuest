import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Onboarding3() {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const learningGoals = [
    { id: "10min", minutes: "10 minutes/day", description: "Light practice" },
    { id: "20min", minutes: "20 minutes/day", description: "Balanced training" },
    { id: "30min", minutes: "30 minutes/day", description: "Hard to stay" }
  ];

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between mb-3 text-[#8F2D56] font-medium">
            <p>Step 3 of 3</p>
            <p>100%</p>
          </div>
          <div className="bg-[#8F2D56] rounded-full h-3">
            <div 
              className="bg-[#FFBC42] h-3 rounded-full transition-all duration-500"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[#8F2D56] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            Set your daily learning goal
          </h1>
          <p className="text-[#8F2D56] text-lg">How many minutes per day do you want to practice?</p>
        </div>

        {/* Learning Goals Grid */}
        <div className="max-w-md mx-auto mb-12 space-y-4">
          {learningGoals.map((goal) => (
            <div
              key={goal.id}
              className={`w-full p-6 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedGoal === goal.id
                  ? "bg-[#218381] ring-4 ring-[#FFBC42] transform scale-105"
                  : "bg-[#218381] hover:bg-[#1a6b6a] hover:shadow-lg hover:transform hover:scale-105"
              }`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <p className="text-white text-xl font-medium mb-2">{goal.minutes}</p>
              <p className="text-[#FFBC42] text-sm">{goal.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/onboarding2"
            className="border-2 border-[#8F2D56] text-[#8F2D56] px-8 py-4 font-semibold rounded-lg hover:bg-[#8F2D56] hover:text-white transition-all duration-300"
          >
            Back
          </Link>
          <Link
            to={selectedGoal ? "/dashboard" : "#"}
            className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
              selectedGoal
                ? "bg-[#FFBC42] text-[#8F2D56] hover:bg-[#ffa90d] hover:shadow-lg transform hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  )
}