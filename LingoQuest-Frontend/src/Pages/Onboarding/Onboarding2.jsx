import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

export default function Onboarding2() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();
  const { setLevel, data } = useOnboarding();

  const skillLevels = [
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  const handleContinue = () => {
    if (!selectedLevel) return;
    setLevel(selectedLevel);
    navigate("/onboarding3");
  };

  return (
    <section className="bg-[#FFF8E7] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="mb-12">
          <div className="flex justify-between mb-3 text-[#1A535C] font-medium">
            <p>Step 2 of 3</p>
            <p>67%</p>
          </div>
          <div className="bg-[#4ECDC4] rounded-full h-3">
            <div className="bg-[#FF6B6B] h-3 rounded-full rounded-r" style={{ width: '67%' }} />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-[#1A535C] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            What's your skill level?
          </h1>
          <p className="text-[#699EA1] text-lg">We'll customize your learning path accordingly</p>
          {data.goal && <p className="text-sm mt-2 text-[#4A5D52]">Chosen goal: <strong>{data.goal}</strong></p>}
        </div>

        <div className="max-w-md mx-auto mb-12 space-y-4">
          {skillLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelectedLevel(level.id)}
              className={`w-full p-6 rounded-xl border border-[#BDDBD9] text-center ${
                selectedLevel === level.id ? "bg-white ring-4 ring-[#FFBC42] scale-105" : "bg-white hover:shadow-lg hover:scale-105"
              }`}
            >
              <p className="text-[#1A535C] text-xl font-medium">{level.name}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={() => navigate("/onboarding1")} className="border-2 border-[#BDDBD9] text-[#1A535C] px-8 py-4 font-semibold rounded-lg">Back</button>

          <button onClick={handleContinue} disabled={!selectedLevel} className={`px-8 py-4 font-semibold rounded-lg ${selectedLevel ? "bg-[#FFB0A8] text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>Continue</button>
        </div>
      </div>
    </section>
  );
}
