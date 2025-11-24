import React from "react";

export default function QuickActions() {
  const actions = [
    { icon: "📕", title: "Flashcards", description: "Review vocabulary" },
    { icon: "📝", title: "Quiz", description: "Test your knowledge" },
    { icon: "🏆", title: "Leaderboard", description: "See rankings" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
      {actions.map((action, index) => (
        <button
          key={index}
          className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 text-center font-semibold hover:bg-gray-50 transition-colors"
        >
          <div className="text-lg lg:text-xl mb-2">{action.icon}</div>
          <div className="text-sm lg:text-base">{action.title}</div>
          <div className="text-gray-500 text-xs lg:text-sm mt-1">
            {action.description}
          </div>
        </button>
      ))}
    </div>
  );
}