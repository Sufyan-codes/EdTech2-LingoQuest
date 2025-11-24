import React from "react";

export default function WelcomeBanner() {
  const userStats = [
    { value: "7", label: "Day Streak" },
    { value: "850", label: "XP Points" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#FF6D6B] to-[#FFC06B] rounded-xl p-4 lg:p-6 flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 shadow-sm gap-4">
      <div className="flex-1">
        <h2 className="text-xl lg:text-2xl font-bold text-white">
          Welcome Back, Beauty! 👋
        </h2>
        <p className="text-white opacity-80 text-sm lg:text-base">
          Continue your French journey!
        </p>
      </div>
      <button className="bg-[#4ECDC4] text-white px-4 lg:px-5 py-2 rounded-xl font-semibold shadow text-sm lg:text-base whitespace-nowrap hover:bg-gray-50 transition-colors">
          Resume Lesson
        </button>
      <div className="flex items-center gap-4">
      

        <div className="flex gap-4 lg:gap-6 text-white font-semibold">
          {userStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-sm  text-black lg:text-base">{stat.value}</p>
              <span className="text-xs lg:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}