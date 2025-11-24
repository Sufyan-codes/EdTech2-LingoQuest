import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

export default function Onboarding3() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const { setMinutes, completeOnboarding, data } = useOnboarding();

  const learningGoals = [
    { id: "10min", minutes: "10 minutes/day", description: "Light practice" },
    { id: "20min", minutes: "20 minutes/day", description: "Balanced training" },
    { id: "30min", minutes: "30 minutes/day", description: "Intensive practice" }
  ];

  const handleFinish = () => {
    if (!selectedGoal) return;
    setMinutes(selectedGoal);
    completeOnboarding();
    navigate("/dashboard");
  };

  return (
    <section className="bg-[#FFF8E7] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="mb-12 mt-10">
          <div className="flex justify-between mb-3 text-[#1A535C] font-medium">
            <p>Step 3 of 3</p>
            <p>100%</p>
          </div>
          <div className="bg-[#8F2D56] rounded-full h-3">
            <div className="bg-[#FF6B6B] h-3 rounded-full" style={{ width: "100%" }} />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-[#1A535C] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            Set your daily learning goal
          </h1>
          <p className="text-[#699EA1] text-lg">How many minutes per day do you want to practice?</p>
          {data.level && <p className="text-sm mt-2 text-[#4A5D52]">Skill level: <strong>{data.level}</strong></p>}
        </div>

        <div className="max-w-md mx-auto mb-12 space-y-4">
          {learningGoals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(goal.id)}
              className={`w-full p-6 rounded-xl border border-[#BDDBD9] text-center ${
                selectedGoal === goal.id ? "bg-white ring-4 ring-[#FFBC42] scale-105" : "bg-white hover:shadow-lg hover:scale-105"
              }`}
            >
              <p className="text-[#1A535C] text-xl font-medium mb-2">{goal.minutes}</p>
              <p className="text-[#699EA1] text-sm">{goal.description}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={() => navigate("/onboarding2")} className="border-2 border-[#BDDBD9] text-[#1A535C] px-8 py-4 font-semibold rounded-lg">Back</button>

          <button onClick={handleFinish} disabled={!selectedGoal} className={`px-8 py-4 font-semibold rounded-lg ${selectedGoal ? "bg-[#FF6B6B] text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>Start Learning</button>
        </div>
      </div>
    </section>
  );
}
