import React from "react";
import { Link } from "react-router-dom"; // Add this import

export default function MobileNav() {
  const navItems = [
    { icon: "📊", label: "Dashboard", to: "/dashboard" },
    { icon: "📚", label: "Lessons", to: "/lessons" },
    { icon: "📝", label: "Quiz", to: "/quiz" },
    { icon: "🏆", label: "Leaderboard", to: "/leaderboard" },
    { icon: "🤖", label: "LingoAI", to: "/lingoai" }, // Add LingoAI
    { icon: "👤", label: "Profile", to: "/profile" },
  ];

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
        <div className="grid grid-cols-5 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center justify-center p-2 text-gray-600 hover:text-[#FF8373] transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:hidden h-20"></div>
    </>
  );
}