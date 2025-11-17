import React, { useState } from "react";
import { Link } from "react-router-dom";
import career from "../../assets/Icons/onboarding/Suitcase.svg";
import student from "../../assets/Icons/onboarding/Student.svg";
import fun from "../../assets/Icons/onboarding/GameController.svg";
import travel from "../../assets/Icons/onboarding/vector.svg";

export default function Onboarding1() {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    { id: "travel", name: "Travel", icon: travel },
    { id: "study", name: "Study Abroad", icon: student },
    { id: "career", name: "Career", icon: career },
    { id: "fun", name: "Fun", icon: fun }
  ];

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between mb-3 text-[#8F2D56] font-medium">
            <p>Step 1 of 3</p>
            <p>33%</p>
          </div>
          <div className="bg-[#8F2D56] rounded-full h-3">
            <div 
              className="bg-[#FFBC42] h-3 rounded-full transition-all duration-500"
              style={{ width: '33%' }}
            ></div>
          </div>
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[#8F2D56] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            Why do you want to learn a new language?
          </h1>
          <p className="text-[#8F2D56] text-lg">Choose your main learning goal</p>
        </div>

        {/* Goals Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`flex flex-col items-center justify-center p-8 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedGoal === goal.id
                  ? "bg-[#218381] ring-4 ring-[#FFBC42] transform scale-105"
                  : "bg-[#218381] hover:bg-[#1a6b6a] hover:shadow-lg hover:transform hover:scale-105"
              }`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <img 
                src={goal.icon} 
                className="w-12 h-12 mb-4" 
                alt={`${goal.name} icon`} 
              />
              <p className="text-white text-xl font-medium text-center">{goal.name}</p>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Link
            to={selectedGoal ? "/onboarding2" : "#"}
            className={`inline-block px-12 py-4 font-semibold rounded-lg transition-all duration-300 ${
              selectedGoal
                ? "bg-[#FFBC42] text-[#8F2D56] hover:bg-[#ffa90d] hover:shadow-lg transform hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
}