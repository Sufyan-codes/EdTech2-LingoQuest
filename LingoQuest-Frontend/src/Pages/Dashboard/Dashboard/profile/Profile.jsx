// src/Pages/Dashboard/Dashboard/Profile/Profile.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { getDashboardData } from "../../../../services/authService";
import { useAuth } from "../../../../context/AuthContext";

export default function Profile() {
  const { user: authUser, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    dailyGoal: 15,
    notifications: true
  });

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

  // Determine if user is tutor
  const isTutor = () => {
    if (authUser?.role === "Tutor") return true;
    
    const email = authUser?.email?.toLowerCase() || "";
    return email.includes("@admin") || email.includes("@tutor");
  };

  const userIsTutor = isTutor();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0]">
        <Sidebar />
        <main className="flex-1 p-10 animate-pulse">
          <div className="h-10 w-56 bg-gray-300 rounded mb-6"></div>
          <div className="h-40 bg-white rounded-2xl mb-6"></div>
          <div className="h-40 bg-white rounded-2xl mb-6"></div>
          <div className="h-40 bg-white rounded-2xl mb-6"></div>
        </main>
      </div>
    );
  }

  // Extract user data safely
  const userName = authUser?.name || authUser?.fullName || "User";
  const userEmail = authUser?.email || "user@example.com";
  const initials = userName?.charAt(0)?.toUpperCase() || "U";
  const joinDate = authUser?.createdAt 
    ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "Recently";

  // Stats from dashboard
  const streak = dashboard?.streak || authUser?.streak || 0;
  const xp = dashboard?.points || authUser?.points || 0;
  const lessonsCompleted = dashboard?.progress?.completed || 0;
  const hoursLearned = Math.floor(lessonsCompleted * 0.5) || 0;
  const quizAverage = "85%"; // This should come from backend calculation
  const targetLanguage = dashboard?.targetLanguage || authUser?.targetLanguage || "Language";

  // Achievements based on stats
  const achievements = [];
  if (streak >= 7) achievements.push("Week Warrior");
  if (streak >= 30) achievements.push("Month Master");
  if (lessonsCompleted >= 10) achievements.push("Learning Hero");
  if (xp >= 1000) achievements.push("XP Champion");

  // Role badge
  const roleBadge = userIsTutor ? "Tutor" : "Learner";
  const roleBadgeColor = userIsTutor ? "bg-purple-100 text-purple-700 border-purple-300" : "bg-blue-100 text-blue-700 border-blue-300";

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#0C2A1A] mb-6">
            My Profile
          </h1>

          {/* PROFILE HEADER */}
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-[#D6E7E2] shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8F87] flex items-center justify-center text-white text-4xl lg:text-5xl font-bold shadow-lg">
                {initials}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-semibold text-[#0C2A1A] mb-1">
                  {userName}
                </h2>
                <p className="text-[#4A5D52] mb-1">{userEmail}</p>
                <p className="text-[#4A5D52] text-sm mb-3">
                  Joined {joinDate}
                </p>

                <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
                  <span className={`px-3 py-1 ${roleBadgeColor} border rounded-full text-sm font-medium`}>
                    {roleBadge}
                  </span>
                  <span className="px-3 py-1 bg-[#D6F2E1] border border-[#A3DBC2] rounded-full text-sm text-[#0C2A1A]">
                    {targetLanguage} {userIsTutor ? "Teacher" : "Learner"}
                  </span>
                  {achievements.map((badge, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-[#FFF9F0] border border-[#DDB824] rounded-full text-sm text-[#0C2A1A]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex lg:flex-col gap-6 lg:gap-4 text-center lg:text-right">
                <div>
                  <p className="text-2xl lg:text-3xl font-semibold text-[#FF6B6B]">
                    {streak}
                  </p>
                  <p className="text-sm text-[#4A5D52]">Day Streak 🔥</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-semibold text-[#2EA148]">
                    {xp}
                  </p>
                  <p className="text-sm text-[#4A5D52]">XP Points ⭐</p>
                </div>
              </div>
            </div>
          </section>

          {/* LEARNING STATS - Show for all users, different metrics for tutors */}
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-[#D6E7E2] shadow-sm mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-[#0C2A1A] mb-1">
              {userIsTutor ? "Teaching Statistics" : "Learning Statistics"}
            </h3>
            <p className="text-[#4A5D52] mb-6">
              {userIsTutor ? "Your impact as an educator" : "Your progress overview"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-[#F0FFFB] to-[#D6F2E1] p-4 lg:p-5 rounded-xl border border-[#A3DBC2]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">📚</span>
                  <span className="text-2xl font-bold text-[#0C2A1A]">
                    {lessonsCompleted}
                  </span>
                </div>
                <p className="text-sm text-[#4A5D52] font-medium">
                  {userIsTutor ? "Lessons Created" : "Lessons Completed"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF0D4] p-4 lg:p-5 rounded-xl border border-[#DDB824]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">⏱️</span>
                  <span className="text-2xl font-bold text-[#0C2A1A]">
                    {hoursLearned}
                  </span>
                </div>
                <p className="text-sm text-[#4A5D52] font-medium">
                  {userIsTutor ? "Teaching Hours" : "Hours Learned"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFE4DD] to-[#FFF5EE] p-4 lg:p-5 rounded-xl border border-[#FF8F87]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">📝</span>
                  <span className="text-2xl font-bold text-[#0C2A1A]">
                    {quizAverage}
                  </span>
                </div>
                <p className="text-sm text-[#4A5D52] font-medium">
                  {userIsTutor ? "Student Avg" : "Quiz Average"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] p-4 lg:p-5 rounded-xl border border-[#4ECDC4]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🏆</span>
                  <span className="text-2xl font-bold text-[#0C2A1A]">
                    {achievements.length}
                  </span>
                </div>
                <p className="text-sm text-[#4A5D52] font-medium">Achievements</p>
              </div>
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-[#D6E7E2] shadow-sm mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-[#0C2A1A] mb-1">
              Achievements
            </h3>
            <p className="text-[#4A5D52] mb-6">Your earned badges</p>

            {achievements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-3">🎯</p>
                <p>Complete lessons and quizzes to unlock achievements!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, i) => (
                  <div 
                    key={i}
                    className="bg-gradient-to-br from-[#FFF9F0] to-[#FAF0D4] p-4 rounded-xl border border-[#DDB824] text-center"
                  >
                    <div className="text-4xl mb-2">🏆</div>
                    <p className="font-semibold text-sm text-[#0C2A1A]">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SETTINGS */}
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-[#D6E7E2] shadow-sm mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-[#0C2A1A] mb-1">
              Settings
            </h3>
            <p className="text-[#4A5D52] mb-6">Manage your account preferences</p>

            <div className="space-y-4">
              {/* Daily Goal */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-4 gap-2">
                <div>
                  <p className="font-medium text-[#0C2A1A]">Daily Goal</p>
                  <p className="text-sm text-[#4A5D52]">
                    {editData.dailyGoal} minutes per day
                  </p>
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-[#A3DBC2] rounded-full text-[#0C2A1A] text-sm hover:bg-[#F0FFFB] transition"
                >
                  Change
                </button>
              </div>

              {/* Language Preference */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-4 gap-2">
                <div>
                  <p className="font-medium text-[#0C2A1A]">Language Preference</p>
                  <p className="text-sm text-[#4A5D52]">{targetLanguage}</p>
                </div>
                <button className="px-4 py-2 border border-[#A3DBC2] rounded-full text-[#0C2A1A] text-sm hover:bg-[#F0FFFB] transition">
                  Change
                </button>
              </div>

              {/* Notifications */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-4 gap-2">
                <div>
                  <p className="font-medium text-[#0C2A1A]">Notifications</p>
                  <p className="text-sm text-[#4A5D52]">
                    Email reminders {editData.notifications ? "enabled" : "disabled"}
                  </p>
                </div>
                <button 
                  onClick={() => setEditData(prev => ({ ...prev, notifications: !prev.notifications }))}
                  className="px-4 py-2 border border-[#A3DBC2] rounded-full text-[#0C2A1A] text-sm hover:bg-[#F0FFFB] transition"
                >
                  Manage
                </button>
              </div>

              {/* Account Type */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-2">
                <div>
                  <p className="font-medium text-[#0C2A1A]">Account Type</p>
                  <p className="text-sm text-[#4A5D52]">
                    {userIsTutor ? "Tutor Account" : "Learner Account"}
                  </p>
                </div>
                <span className={`px-4 py-2 ${roleBadgeColor} border rounded-full text-sm font-medium`}>
                  {roleBadge}
                </span>
              </div>
            </div>
          </section>

          {/* LOGOUT BUTTON */}
          <div className="flex justify-center lg:justify-end">
            <button 
              onClick={logout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}