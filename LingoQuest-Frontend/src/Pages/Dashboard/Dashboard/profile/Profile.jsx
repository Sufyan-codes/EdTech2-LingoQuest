import React from "react";
import Sidebar from "../Sidebar";

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-[#F7F3E8]">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-semibold text-[#0C2A1A] mb-6">Profile</h1>

        {/* PROFILE HEADER */}
        <section className="bg-[#D6F2E1] p-6 rounded-2xl border border-[#A3DBC2] mb-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white text-4xl font-bold">
              B
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-[#0C2A1A]">Beauty</h2>
              <p className="text-[#4A5D52]">Beauty@example.com</p>
              <p className="text-[#4A5D52] text-sm">Joined January 2025</p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {[
                  "French Learner",
                  "Beginner",
                  "Week Warrior",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white border border-[#A3DBC2] rounded-full text-sm text-[#0C2A1A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE STATS */}
            <div className="text-right">
              <p className="text-xl font-semibold text-[#0C2A1A]">7</p>
              <p className="text-sm text-[#4A5D52] mb-4">Day Streak</p>

              <p className="text-xl font-semibold text-[#0C2A1A]">850</p>
              <p className="text-sm text-[#4A5D52]">XP Points</p>
            </div>
          </div>
        </section>

        {/* LEARNING STATS */}
        <section className="bg-white p-6 rounded-2xl border border-[#C7D7C5] mb-10">
          <h3 className="text-2xl font-bold text-[#0C2A1A] mb-1">Learning Statistics</h3>
          <p className="text-[#4A5D52] mb-4">Your Progress Overview</p>

          <div className="space-y-3">
            {[
              { label: "Lesson Completed", value: "24" },
              { label: "Hours Learned", value: "18" },
              { label: "Quiz Average", value: "92%" },
              { label: "Achievements", value: "12" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center bg-[#FAF0D4] p-4 rounded-xl"
              >
                <span className="font-medium text-[#0C2A1A]">{item.label}</span>
                <span className="font-semibold text-[#0C2A1A]">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="bg-white p-6 rounded-2xl border border-[#C7D7C5] mb-10">
          <h3 className="text-2xl font-bold text-[#0C2A1A] mb-1">Achievements</h3>
          <p className="text-[#4A5D52] mb-4">Your earned badges</p>

          <div className="space-y-3">
            {[
              { title: "Week Warrior", text: "Completed a 7-day streak" },
              { title: "Quick Learner", text: "Completed 5 lessons in one day" },
              { title: "Vocab Master", text: "Learned 100 new words" },
              { title: "Perfect Score", text: "Got 100% on a quiz" },
            ].map((ach) => (
              <div
                key={ach.title}
                className="bg-[#FAF0D4] p-4 rounded-xl border border-[#E6D7A6]"
              >
                <p className="font-semibold text-[#0C2A1A]">{ach.title}</p>
                <p className="text-sm text-[#4A5D52]">{ach.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SETTINGS */}
        <section className="bg-white p-6 rounded-2xl border border-[#C7D7C5] mb-10">
          <h3 className="text-2xl font-bold text-[#0C2A1A] mb-1">Settings</h3>
          <p className="text-[#4A5D52] mb-4">Manage your account preferences</p>

          <div className="space-y-4">
            {["Daily Goal", "Language Preference", "Notifications"].map(
              (setting, i) => (
                <div
                  key={setting}
                  className="flex justify-between items-center border-b border-[#E0E0E0] pb-3"
                >
                  <div>
                    <p className="font-medium text-[#0C2A1A]">{setting}</p>
                    <p className="text-sm text-[#4A5D52]">
                      {i === 0 && "15 minutes per day"}
                      {i === 1 && "French (Beginner)"}
                      {i === 2 && "Email reminders enable"}
                    </p>
                  </div>
                  <button className="px-4 py-1 border border-[#A3DBC2] rounded-full text-[#0C2A1A] text-sm">
                    {i === 2 ? "Manage" : "Change"}
                  </button>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}