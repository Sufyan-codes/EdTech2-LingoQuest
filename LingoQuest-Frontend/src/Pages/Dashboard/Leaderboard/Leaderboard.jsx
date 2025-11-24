import React from "react";
import Sidebar from "../Dashboard/Sidebar";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#FFF7E8] flex font-inter">
      <Sidebar />

   

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header>
          <h2 className="text-4xl font-bold text-[#0E3A2F] tracking-tight">Leaderboard & Achievements</h2>
          <p className="text-[#6B7A75] mt-1">Keep learning to move up the ranks!</p>
        </header>

        {/* Top Learners */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-bold text-[#0E3A2F]">Top Learners This Month</h3>

          <div className="mt-4 flex flex-col gap-3">
            {[
              { name: 'Precious', xp: '12,459', days: 45, badge: 'Top 1', bg: 'bg-[#FFF8D6]' },
              { name: 'Abubakar', xp: '11,280', days: 38, badge: 'Top 2', bg: 'bg-[#E3F7F7]' },
              { name: 'Hajara', xp: '10,950', days: 42, badge: 'Top 3', bg: 'bg-[#FFE9E9]' },
              { name: 'Sufyan', xp: '9,875', days: 30 },
              { name: 'Salma', xp: '8,929', days: 28 },
              { name: 'Onome', xp: '8,540', days: 25 },
              { name: 'Samuel', xp: '7,890', days: 22 },
              { name: 'Sam', xp: '7,320', days: 20 }
            ].map((user, i) => (
              <div
                key={user.name}
                className={`flex items-center justify-between p-4 rounded-xl border ${user.bg || 'bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-[#0E3A2F]">#{i + 1}</span>
                  <div>
                    <p className="font-semibold text-[#0E3A2F]">{user.name}</p>
                    <p className="text-sm text-[#6B7A75]">{user.xp} XP · {user.days} days</p>
                  </div>
                </div>
                {user.badge && (
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">
                    {user.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-bold text-[#0E3A2F] mb-4">Your Achievements</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["7-Day Streak","Grammar Guru","Speed Learner","Perfect Score","30-Day Streak","Master Speaker"].map((badge) => (
              <div key={badge} className="p-4 border rounded-xl flex flex-col items-center bg-[#FFFDF6] text-center shadow-sm">
                <div className="text-2xl mb-2">🎖️</div>
                <p className="font-semibold text-[#0E3A2F]">{badge}</p>
                <span className="text-green-600 text-sm mt-1">Unlocked</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
