// src/Pages/Dashboard/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import ProgressCard from "./ProgressCard";
import AchievementsCard from "./AchievementsCard";
import CoursesCard from "./CoursesCard";
import LeaderboardCard from "./LeaderboardCard";
import QuickActions from "./QuickActions";
import WelcomeBanner from "./WelcomeBanner";
import { getDashboardData } from "../../../services/authService";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    getDashboardData()
      .then((d) => {
        if (!mounted) return;
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
        setLoading(false);
      });
      
    return () => {
      mounted = false;
    };
  }, []);

  // Transform backend data to match frontend structure
  const transformedData = data ? {
    welcome: {
      userName: data.name,
      streak: data.streak,
      xp: data.points,
      hasStartedCourse: data.nextLesson !== null
    },
    progress: {
      courseName: data.progress?.targetLanguage || "Language Course",
      courseProgress: data.progress?.percentage || 0,
      lessonsCompleted: data.progress?.completed || 0,
      hoursLearned: Math.floor((data.progress?.completed || 0) * 0.5),
      averageQuiz: "85%",
      stats: [
        { value: data.progress?.completed || 0 },
        { value: Math.floor((data.progress?.completed || 0) * 0.5) },
        { value: "85%" }
      ]
    },
    courses: data.nextLesson ? [{
      id: data.nextLesson.id,
      title: data.nextLesson.title,
      description: "Continue your learning journey",
      progress: data.progress?.percentage || 0
    }] : [],
    achievements: [],
    leaderboard: [],
    quickActions: [
      { icon: "📕", title: "Flashcards", description: "Review vocabulary" },
      { icon: "📝", title: "Quiz", description: "Test your knowledge" },
      { icon: "🏆", title: "Leaderboard", description: "See rankings" },
    ]
  } : null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] flex flex-col lg:flex-row">
      <Header />
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded mb-4">
            Failed to load dashboard — {error}
          </div>
        )}

        <WelcomeBanner data={transformedData?.welcome} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <ProgressCard data={transformedData?.progress} loading={loading} />
            <CoursesCard courses={transformedData?.courses || []} loading={loading} />
            <QuickActions items={transformedData?.quickActions || []} loading={loading} />
          </div>

          <div className="space-y-6">
            <AchievementsCard
              achievements={transformedData?.achievements || []}
              loading={loading}
            />
            <LeaderboardCard
              items={transformedData?.leaderboard || []}
              loading={loading}
            />
          </div>
        </div>

        <MobileNav />
      </main>
    </div>
  );
}