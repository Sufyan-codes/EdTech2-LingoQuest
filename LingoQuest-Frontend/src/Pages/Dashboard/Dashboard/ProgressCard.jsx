import React from "react";
import trophy from "../../../assets/Dashboard/trophy1.svg"
import { Link } from "react-router-dom";


export default function ProgressCard() {
  const progressStats = [
    { value: "24", label: "Lessons Completed" },
    { value: "18", label: "Hours Learned" },
    { value: "92%", label: "Average Quiz" },
  ];

  return (
    <>
      <Link to='/lessons'>
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex gap-2">
      <img src={trophy} alt="" />
      <h3 className="font-bold text-lg text-[#1A535C] mb-1"> Your Progress</h3>
      </div>
      <p className="text-[#699EA1] text-sm mb-3">Keep up the great work!</p>
      
      <div className="flex justify-between text-[#1A535C]">
        <p className="font-medium  text-sm mb-2">French - Beginner</p>
        <div>65%</div>
      </div>
      
      <div className="w-full h-3 bg-[#4ECDC4] rounded-full mb-4">
        <div
          className="h-full bg-[#FF6B6B] rounded-full transition-all duration-500"
          style={{ width: "65%" }}
        ></div>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
        {progressStats.map((stat, index) => (
          <div key={index}>
            <p className="text-lg lg:text-xl font-bold">{stat.value}</p>
            <p className="text-[#699EA1] text-xs lg:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
      </Link>
    </>
  );
}