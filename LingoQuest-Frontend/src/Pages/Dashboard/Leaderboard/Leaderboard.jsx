import React from "react";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#EAF7F5] p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E3B38] mb-2">
            Leaderboard & Achiements
          </h1>
          <p className="text-[#4F6E69]">
            Keep learning to move up the ranks!
          </p>
        </div>

        {/* Top Learners Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#173B38] mb-4">
            Top Learners This Month
          </h2>
          
          <div className="space-y-3">
            {/* Precious */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Precious</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">12.459 XP</span>
                  <span className="mx-1">45 days</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-[#1F3B36]">Top 1</div>
            </div>

            {/* Abubakar */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Abubakar</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">11.280 XP</span>
                  <span className="mx-1">38 days</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-[#1F3B36]">Top 2</div>
            </div>

            {/* Hajara */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Hajara</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">10.950 XP</span>
                  <span className="mx-1">42 days</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-[#1F3B36]">Top 3</div>
            </div>

            {/* Sufyan */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Sufyan</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">9,875 XP</span>
                  <span className="mx-1">30 days</span>
                </div>
              </div>
            </div>

            {/* Salma */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Salma</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">8,929 XP</span>
                  <span className="mx-1">28 days</span>
                </div>
              </div>
            </div>

            {/* Onome */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Onome</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">8,540 XP</span>
                  <span className="mx-1">25 days</span>
                </div>
              </div>
            </div>

            {/* Samuel */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Samuel</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">7,890 XP</span>
                  <span className="mx-1">22 days</span>
                </div>
              </div>
            </div>

            {/* Sam */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-[#123B39]">Sam</div>
                <div className="text-[#4F6E69] text-sm">
                  <span className="font-semibold text-[#083C2E]">7,320 XP</span>
                  <span className="mx-1">20 days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Achievements Section */}
        <section>
          <h3 className="text-lg font-semibold text-[#173B38] mb-4">
            Your Achievements
          </h3>

          <div className="space-y-4">
            {/* 7-Day Streak */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 bg-gray-400 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <div className="flex-1">
                <div className="text-[#4F6E69] text-sm mb-1">- 7-Day Streak</div>
                <div className="text-[#4F6E69] text-sm">- Unlocked</div>
              </div>
            </div>

            {/* Grammar Guru */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-sm"></div>
              <div className="flex-1">
                <div className="text-[#4F6E69] text-sm mb-1">Grammar Guru</div>
                <div className="text-[#4F6E69] text-sm">- Unlocked</div>
              </div>
            </div>

            {/* Speed Learner */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 bg-gray-400 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <div className="flex-1">
                <div className="text-[#4F6E69] text-sm mb-1">- Speed Learner</div>
                <div className="text-[#4F6E69] text-sm">- Unlocked</div>
              </div>
            </div>

            {/* Perfect Score */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-sm"></div>
              <div className="flex-1">
                <div className="text-[#4F6E69] text-sm mb-1">Perfect Score</div>
                <div className="text-[#4F6E69] text-sm">- Unlocked</div>
              </div>
            </div>

            {/* Master Speaker */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 border border-gray-400 rounded-sm"></div>
              <div className="flex-1">
                <div className="text-[#4F6E69] text-sm">Master Speaker</div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Progress Message */}
        <div className="text-[#3C4F48] text-sm">
          <span className="font-semibold">[+] Keep Learning!</span> You're on track to unlock 2 more badges this week.
        </div>
      </div>
    </div>
  );
}