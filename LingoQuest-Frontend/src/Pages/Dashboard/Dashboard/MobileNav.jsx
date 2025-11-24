import React from "react";

export default function MobileNav() {
  const navItems = [
    { icon: "📊", label: "Dashboard" },
    { icon: "📚", label: "Lessons" },
    { icon: "📝", label: "Quiz" },
    { icon: "🏆", label: "Leaderboard" },
    { icon: "👤", label: "Profile" },
  ];

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
        <div className="grid grid-cols-5 gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center p-2 text-gray-600 hover:text-[#FF8373] transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:hidden h-20"></div>
    </>
  );
}