import React from "react";

export default function LeaderboardCard() {
  const leaderboardData = [
    { rank: 1, name: "Precious O.", xp: 1250 },
    { rank: 2, name: "You (Beauty)", xp: 950, isCurrentUser: true },
    { rank: 3, name: "Abubakar A.", xp: 720 },
    { rank: 4, name: "Hajara M.", xp: 680 },
    { rank: 5, name: "Sufyan A.", xp: 580 },
  ];

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg mb-3">Weekly Leaderboard</h3>
      <p className="text-gray-500 text-sm mb-4">Top learners this week</p>

      <ol className="space-y-2 lg:space-y-3">
        {leaderboardData.map((user) => (
          <li
            key={user.rank}
            className="flex justify-between items-center text-sm font-semibold"
          >
            <span
              className={user.isCurrentUser ? "text-[#FF8373]" : "text-gray-700"}
            >
              {user.rank}. {user.name}
            </span>
            <span
              className={user.isCurrentUser ? "text-[#FF8373]" : "text-gray-600"}
            >
              {user.xp} XP
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}