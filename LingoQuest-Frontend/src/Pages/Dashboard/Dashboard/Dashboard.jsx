import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import WelcomeBanner from "./WelcomeBanner";
import ProgressCard from "./ProgressCard";
import AchievementsCard from "./AchievementsCard";
import CoursesCard from "./CoursesCard";
import LeaderboardCard from "./LeaderboardCard";
import QuickActions from "./QuickActions";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8E7] flex flex-col lg:flex-row">
      {/* Top header (mobile) */}
      <Header />

      {/* Sidebar (desktop) */}
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <WelcomeBanner />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left two-thirds column */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressCard />
            <CoursesCard />
            <QuickActions />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <AchievementsCard />
            <LeaderboardCard />
          </div>
        </div>

        

        {/* Mobile bottom nav */}
        <MobileNav />
      </main>
    </div>
  );
}
