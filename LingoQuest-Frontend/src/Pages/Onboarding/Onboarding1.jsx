import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../services/user";
import { useOnboarding } from "../../context/OnboardingContext";
import suitcase from "../../assets/Icons/Onboarding/suitcase.svg";
import student from "../../assets/Icons/Onboarding/student.svg";
import gameController from "../../assets/Icons/Onboarding/gameController.svg";
import vector from "../../assets/Icons/Onboarding/vector.svg";

export default function Onboarding1() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const { setGoal, data } = useOnboarding();

  const goals = [
    { id: "travel", name: "Travel", icon: vector },
    { id: "study", name: "Study Abroad", icon: student },
    { id: "career", name: "Career", icon: suitcase },
    { id: "fun", name: "Fun", icon: gameController }
  ];

  const handleContinue = () => {
    if (!selectedGoal) return;
    setGoal(selectedGoal);
    navigate("/onboarding2");
  };

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="mb-12">
          <div className="flex justify-between mb-3 text-[#1A535C] font-medium">
            <p>Step 1 of 3</p>
            <p>33%</p>
          </div>
          <div className="bg-[#FFBC42] rounded-full h-3">
            <div className="bg-[#2EA148] h-3 rounded-full rounded-r" style={{ width: '33%' }} />
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
              selectedGoal ? "bg-[#2EA148] text-white" : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
