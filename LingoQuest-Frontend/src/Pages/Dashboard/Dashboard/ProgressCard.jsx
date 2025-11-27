// src/components/ProgressCard.jsx
import React from "react";
import trophy from "../../../assets/Dashboard/Trophy1.svg";
import { Link } from "react-router-dom";

export default function ProgressCard({ data, loading }) {
  if (loading) {
    return <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse h-48" />;
  }

  const { courseName, courseProgress, lessonsCompleted, hoursLearned, averageQuiz } = data || {};

  return (
    <Link to="/lessons">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex gap-2 items-center">
          <img src={trophy} alt="" />
          <h3 className="font-bold text-lg text-[#1A535C] mb-1">Your Progress</h3>
        </div>
        <p className="text-[#699EA1] text-sm mb-3">Keep up the great work!</p>

        <div className="flex justify-between text-[#1A535C]">
          <p className="font-medium text-sm mb-2">{courseName}</p>
          <div>{courseProgress}%</div>
        </div>

        <div className="w-full h-3 bg-[#DDB824] rounded-full mb-4">
          <div className="h-full bg-[#2EA148] rounded-full transition-all duration-500" style={{ width: `${courseProgress}%` }} />
        </div>

        <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
          <div>
            <p className="text-lg lg:text-xl font-bold">{lessonsCompleted}</p>
            <p className="text-[#699EA1] text-xs lg:text-sm">Lessons Completed</p>
          </div>
          <div>
            <p className="text-lg lg:text-xl font-bold">{hoursLearned}</p>
            <p className="text-[#699EA1] text-xs lg:text-sm">Hours Learned</p>
          </div>
          <div>
            <p className="text-lg lg:text-xl font-bold">{averageQuiz}</p>
            <p className="text-[#699EA1] text-xs lg:text-sm">Average Quiz</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
