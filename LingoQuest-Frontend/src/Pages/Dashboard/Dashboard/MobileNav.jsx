import React from "react";
import { Link } from "react-router-dom"; // Add this import
import home from "../../../assets/Dashboard/House.svg"
import lesson from "../../../assets/Dashboard/BookOpen (1).svg"
import CheckCircle from "../../../assets/Dashboard/CheckCircle.svg"
import trophy from "../../../assets/Dashboard/Trophy.svg"
import user from "../../../assets/Dashboard/User.svg"


export default function MobileNav() {
  const navItems = [
    { icon: <img src={home} />, label: "Dashboard", to: "/dashboard" },
    { icon: <img src={lesson} />, label: "Lessons", to: "/lessons" },
    { icon: <img src={CheckCircle} />, label: "Quiz", to: "/lessons/:lessonId/quiz" },
    { icon: <img src={user} />, label: "Profile", to: "/profile" },
    { icon: <img src={user} />, label: "Tutor Dashboard", to: "/tutor" },
  ];

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3">
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
