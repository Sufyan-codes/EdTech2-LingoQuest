// src/Pages/Dashboard/Dashboard/Profile/Profile.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { getDashboardData } from "../../../../services/authService";
import { useAuth } from "../../../../context/AuthContext";

export default function Profile() {
  const { user: authUser } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardData();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F3E8]">
        <Sidebar />
        <main className="flex-1 p-10 animate-pulse">
          <div className="h-10 w-56 bg-gray-300 rounded mb-6"></div>
          <div className="h-40 bg-gray-300 rounded mb-6"></div>
          <div className="h-40 bg-gray-300 rounded mb-6"></div>
          <div className="h-40 bg-gray-300 rounded mb-6"></div>
        </main>
      </div>
    );
  }

  // FIXED: Use auth user data with fallback
  const userName = authUser?.name || authUser?.fullName || "User";
  const userEmail = authUser?.email || "user@example.com";
  const initials = userName?.charAt(0)?.toUpperCase() || "U";

  // Safe stats from dashboard API
  const streak = dashboard?.streak || authUser?.streak || 0;
  const xp = dashboard?.points || authUser?.points || 0;
  const lessonsCompleted = dashboard?.progress?.completed || 0;
  const hoursLearned = Math.floor(lessonsCompleted * 0.5) || 0;
  const quizAverage = "85%"; // Mock for now
  const targetLanguage = dashboard?.targetLanguage || authUser?.targetLanguage || "Language";

  return (
    <div className="flex min-h-screen bg-[#F7F3E8]">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-semibold text-[#0C2A1A] mb-6">Profile</h1>

        {/* PROFILE HEADER */}
        <section className="bg-[#D6F2E1] p-6 rounded-2xl border border-[#A3DBC2] mb-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white text-4xl font-bold">
              {initials}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-[#0C2A1A]">{userName}</h2>
              <p className="text-[#4A5D52]">{userEmail}</p>
              <p className="text-[#4A5D52] text-sm">
                Joined {authUser?.createdAt || "January 2025"}
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="px-3 py-1 bg-white border border-[#A3DBC2] rounded-full text-sm text-[#0C2A1A]">
                  {targetLanguage} Learner
                </span>
                <span className="px-3 py-1 bg-white border border-[#A3DBC2] rounded-full text-sm text-[#0C2A1A]">
                  Beginner
                </span>
                {streak >= 7 && (
                  <span className="px-3 py-1 bg-white border border-[#A3DBC2] rounded-full text-sm text-[#0C2A1A]">
                    Week Warrior
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-semibold text-[#0C2A1A]">{streak}</p>
              <p className="text-sm text-[#4A5D52] mb-4">Day Streak</p>

              <p className="text-xl font-semibold text-[#0C2A1A]">{xp}</p>
              <p className="text-sm text-[#4A5D52]">XP Points</p>
            </div>
          </div>
        </section>

        {/* LEARNING STATS */}
        <section className="bg-white p-6 rounded-2xl border border-[#C7D7C5] mb-10">
          <h3 className="text-2xl font-bold text-[#0C2A1A] mb-1">Learning Statistics</h3>
          <p className="text-[#4A5D52] mb-4">Your Progress Overview</p>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#FAF0D4] p-4 rounded-xl">
              <span className="font-medium text-[#0C2A1A]">Lessons Completed</span>
              <span className="font-semibold text-[#0C2A1A]">{lessonsCompleted}</span>
            </div>

            <div className="flex justify-between items-center bg-[#FAF0D4] p-4 rounded-xl">
              <span className="font-medium text-[#0C2A1A]">Hours Learned</span>
              <span className="font-semibold text-[#0C2A1A]">{hoursLearned}</span>
            </div>

            <div className="flex justify-between items-center bg-[#FAF0D4] p-4 rounded-xl">
              <span className="font-medium text-[#0C2A1A]">Quiz Average</span>
              <span className="font-semibold text-[#0C2A1A]">{quizAverage}</span>
            </div>

            <div className="flex justify-between items-center bg-[#FAF0D4] p-4 rounded-xl">
              <span className="font-medium text-[#0C2A1A]">Achievements</span>
              <span className="font-semibold text-[#0C2A1A]">0</span>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="bg-white p-6 rounded-2xl border border-[#C7D7C5] mb-10">
          <h3 className="text-2xl font-bold text-[#0C2A1A] mb-1">Achievements</h3>
          <p className="text-[#4A5D52] mb-4">Your earned badges</p>

          <div className="text-center text-gray-500 py-8">
            Complete lessons and quizzes to unlock achievements!
          </div>
        </section>

        {/* SETTINGS */}
        <section className="bg-white p-6 rounded-2xl border border-[#C7D7C5] mb-10">
          <h3 className="text-2xl font-bold text-[#0C2A1A] mb-1">Settings</h3>
          <p className="text-[#4A5D52] mb-4">Manage your account preferences</p>

          <div className="space-y-4">
            {["Daily Goal", "Language Preference", "Notifications"].map((setting, i) => (
              <div key={setting} className="flex justify-between items-center border-b border-[#E0E0E0] pb-3">
                <div>
                  <p className="font-medium text-[#0C2A1A]">{setting}</p>
                  <p className="text-sm text-[#4A5D52]">
                    {i === 0 && "15 minutes per day"}
                    {i === 1 && targetLanguage}
                    {i === 2 && "Email reminders enabled"}
                  </p>
                </div>

                <button className="px-4 py-1 border border-[#A3DBC2] rounded-full text-[#0C2A1A] text-sm">
                  {i === 2 ? "Manage" : "Change"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}