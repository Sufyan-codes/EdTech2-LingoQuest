// src/Pages/Dashboard/Dashboard/Header.jsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Icons/logo.svg";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Check if user is tutor
  const isTutor = () => {
    if (user?.role === "Tutor") return true;
    const email = user?.email?.toLowerCase() || "";
    return email.includes("@admin") || email.includes("@tutor");
  };

  const userIsTutor = isTutor();
  const userName = user?.name || "User";
  const initials = userName?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="lg:hidden sticky top-0 bg-white border-b border-gray-200 p-4 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="LingoQuest" className="h-8" />
          {userIsTutor && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
              Tutor
            </span>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
          </button>

          {/* Profile Avatar */}
          <button 
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8F87] flex items-center justify-center text-white text-sm font-bold shadow-md"
          >
            {initials}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* User Info Bar */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <div>
          <p className="font-semibold text-gray-800">
            Welcome, {userName}! 👋
          </p>
          <p className="text-gray-600 text-xs">
            {user?.targetLanguage || "Language"} Learning
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="text-center">
            <p className="font-bold text-[#2EA148]">{user?.streak || 0}</p>
            <p className="text-gray-500">Streak</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-[#FF6B6B]">{user?.points || 0}</p>
            <p className="text-gray-500">XP</p>
          </div>
        </div>
      </div>
    </header>
  );
}