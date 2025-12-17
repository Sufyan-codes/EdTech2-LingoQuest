// src/components/CoursesCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CoursesCard({ courses = [], loading }) {
  if (loading) {
    return <div className="bg-white p-6 rounded-3xl border border-[#D6E7E2] shadow-sm animate-pulse h-48" />;
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#D6E7E2] shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="rounded-2xl p-4 border bg-white">
            <div className="w-full h-28 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#FFE4DD] to-[#FFF5EE]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>

            <p className="font-semibold text-[16px] text-[#083C2E]">{course.title}</p>
            <p className="text-sm text-[#6C817A] mt-1">{course.description}</p>

            <div className="mt-3">
              <div className="w-full h-2 bg-[#F1D0D2] rounded-full overflow-hidden">
                <div className="h-full bg-[#74D0C2] rounded-full" style={{ width: `${course.progress || 0}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

 <div  className="mt-6 w-full py-3 rounded-full bg-[#2EA148] text-white font-medium text-sm border border-[#F4DFA2] hover:bg-[#FFEABB] transition">
      <Link to='/lessons'>
        View All Courses
      </Link>
 </div>
    </div>
  );
}
