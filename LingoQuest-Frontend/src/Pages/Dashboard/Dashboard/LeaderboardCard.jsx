import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function LeaderboardCard() {
  const fallbackData = [
    { rank: 1, name: "Precious O.", xp: 1250 },
    { rank: 2, name: "You (Beauty)", xp: 950, isCurrentUser: true },
    { rank: 3, name: "Abubakar A.", xp: 720 },
    { rank: 4, name: "Hajara M.", xp: 680 },
    { rank: 5, name: "Sufyan A.", xp: 580 },
  ];

  const [leaderboard, setLeaderboard] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/leaderboard");
        const text = await res.text();

        // Try parsing JSON safely
        let json;
        try {
          json = JSON.parse(text);
        } catch (err) {
          // Non-JSON response → fallback to demo UI
          setLeaderboard(fallbackData);
          setLoading(false);
          return;
        }

        if (!res.ok || !json?.leaderboard) {
          setLeaderboard(fallbackData);
        } else {
          // Normalize into your UI format
          const processed = json.leaderboard.map((u, i) => ({
            rank: u.rank || i + 1,
            name: u.name || u.fullName || "Unknown",
            xp: u.xp || u.score || 0,
            isCurrentUser: u.isCurrentUser || false,
          }));

          setLeaderboard(processed);
        }
      } catch (err) {
        setLeaderboard(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">

      <h3 className="font-bold text-lg mb-3">Weekly Leaderboard</h3>
      <p className="text-gray-500 text-sm mb-4">Top learners this week</p>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <ol className="space-y-2 lg:space-y-3">
          {leaderboard.map((user) => (
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
      )}
    </div>
  );
}
