import React from "react";
import trophy from "../../../assets/Dashboard/Trophy1.svg"
import star from "../../../assets/Dashboard/Star.svg"
import BookOpen from "../../../assets/Dashboard/BookOpen (1).svg"
import img from "../../../assets/Dashboard/achievement-illustration-XEdEaO5Z 1.svg"

export default function AchievementsCard() {
  const achievements = [
    { icon: <img src={trophy} />, title: "Week Warrior", description: "7-day streak completed" },
    { icon: <img src={star} />, title: "Quick Learner", description: "Completed 5 lessons in one day" },
    { icon: <img src={BookOpen} />, title: "Vocab Master", description: "Learned 100 new words" },
  ];

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg mb-3">Recent Achievements</h3>
      
      <ul className="space-y-3">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">{achievement.icon}</span>
            <div>
              <div className="font-semibold text-sm lg:text-base">
                {achievement.title}
              </div>
              <p className="text-gray-500 text-xs lg:text-sm">
                {achievement.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <img src={img} alt="" />
    </div>
  );
}
