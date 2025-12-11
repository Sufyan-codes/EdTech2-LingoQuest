// src/components/WelcomeBanner.jsx
import React from "react";

export default function WelcomeBanner({ data, loading }) {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#2EA148] to-[#4BC667] rounded-xl p-4 lg:p-6 flex items-center justify-between mb-6 animate-pulse">
        <div className="h-6 bg-white/30 w-48 rounded"></div>
        <div className="h-8 w-28 bg-white/30 rounded"></div>
      </div>
    );
  }

  const name = data?.userName || "Learner";
  const streak = data?.streak ?? 0;
  const xp = data?.xp ?? 0;
  const started = data?.hasStartedCourse ?? false;

  return (
    <div className="bg-gradient-to-r from-[#2EA148] to-[#4BC667] rounded-xl p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-between mb-6 gap-4 shadow-sm">
      <div className="flex-1">
        <h2 className="text-xl lg:text-2xl font-bold text-white">Welcome Back, {name} 👋</h2>
        <p className="text-white opacity-90 text-sm lg:text-base">Continue your language journey!</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-[#DDB824] text-white px-4 lg:px-5 py-2 rounded-xl font-semibold shadow text-sm lg:text-base">
          {started ? "Resume Lesson" : "Start Lesson"}
        </button>

        <div className="flex gap-4 lg:gap-6 text-white font-semibold">
          <div className="text-center">
            <p className="text-sm lg:text-base text-white">{streak}d</p>
            <span className="text-xs lg:text-sm">Day Streak</span>
          </div>
          <div className="text-center">
            <p className="text-sm lg:text-base text-white">{xp}</p>
            <span className="text-xs lg:text-sm">XP Points</span>
          </div>
        </div>
      </div>
    </div>
  );
}
