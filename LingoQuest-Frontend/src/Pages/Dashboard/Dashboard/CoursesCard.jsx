import React from "react";
import { Link } from "react-router-dom";


export default function CoursesCard() {
  const courses = [
    {
      title: "Basic Greetings",
      description: "Lesson 5 • 12 mins",
      progress: 65,
      locked: false,
    },
    {
      title: "Numbering & Counting",
      description: "Lesson 6 • 15 mins",
      progress: 0,
      locked: true,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#D6E7E2] shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {courses.map((course, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 border 
              ${course.locked 
                ? "border-[#CFE1DB] bg-white"
                : "border-[#CFE1DB] bg-white"
              }`}
          >
            {/* Thumbnail */}
            <div
              className={`w-full h-28 rounded-xl flex items-center justify-center mb-4 
                ${course.locked
                  ? "bg-gradient-to-br from-[#EEF4F3] to-[#F7F9F8]"
                  : "bg-gradient-to-br from-[#FFE4DD] to-[#FFF5EE]"
                }`}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                className={`${course.locked ? "text-[#D9D9D9]" : "text-[#FF6B63]"}`}
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Title */}
            <p className="font-semibold text-[16px] text-[#083C2E]">
              {course.title}
            </p>

            {/* Description */}
            <p className="text-sm text-[#6C817A] mt-1">
              {course.description}
            </p>

            {/* Progress / Locked state */}
            {course.locked ? (
              <div className="flex items-center gap-1 text-xs text-[#80938C] mt-3">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#80938C"
                >
                  <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-5h-1V9a5 5 0 00-10 0v3H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-3 0H9V9a3 3 0 016 0v3z" />
                </svg>
                Complete previous lesson
              </div>
            ) : (
              <div className="mt-3">
                <div className="w-full h-2 bg-[#F1D0D2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#74D0C2] rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}

      </div>

      {/* Button */}
      <button className="mt-6 w-full py-3 rounded-full bg-[#FFF3D6] text-[#083C2E] font-medium text-sm border border-[#F4DFA2] hover:bg-[#FFEABB] transition">
        View All Courses
      </button>
    </div>
  );
}
