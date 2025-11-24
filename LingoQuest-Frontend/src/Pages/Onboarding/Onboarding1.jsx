import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";
import career from "../../assets/Icons/onboarding/Suitcase.svg";
import student from "../../assets/Icons/onboarding/Student.svg";
import fun from "../../assets/Icons/onboarding/GameController.svg";
import travel from "../../assets/Icons/onboarding/vector.svg";

export default function Onboarding1() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const { setGoal, data } = useOnboarding();

  const goals = [
    { id: "travel", name: "Travel", icon: travel },
    { id: "study", name: "Study Abroad", icon: student },
    { id: "career", name: "Career", icon: career },
    { id: "fun", name: "Fun", icon: fun }
  ];

  const handleContinue = () => {
    if (!selectedGoal) return;
    setGoal(selectedGoal);
    navigate("/onboarding2");
  };

  return (
    <section className="bg-[#FFF8E7] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="mb-12">
          <div className="flex justify-between mb-3 text-[#1A535C] font-medium">
            <p>Step 1 of 3</p>
            <p>33%</p>
          </div>
          <div className="bg-[#4ECDC4] rounded-full h-3">
            <div className="bg-[#FF6B6B] h-3 rounded-full rounded-r" style={{ width: '33%' }} />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-[#1A535C] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            Why do you want to learn a new language?
          </h1>
          <p className="text-[#699EA1] text-lg">Choose your main learning goal</p>
          {data.language && <p className="text-sm mt-2 text-[#4A5D52]">Selected language: <strong>{data.language.name}</strong></p>}
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
          {goals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(goal.id)}
              className={`flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 text-center w-full ${
                selectedGoal === goal.id ? "bg-white ring-4 ring-[#FFBC42] scale-105" : "bg-white hover:shadow-lg hover:scale-105"
              }`}
            >
              <img src={goal.icon} className="w-12 h-12 mb-4" alt={`${goal.name} icon`} />
              <p className="text-[#1A535C] text-xl font-medium">{goal.name}</p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/language")}
            className="border-2 border-[#BDDBD9] text-[#1A535C] px-8 py-4 font-semibold rounded-lg mr-4"
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedGoal}
            className={`px-8 py-4 font-semibold rounded-lg ${
              selectedGoal ? "bg-[#FFB0A8] text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
