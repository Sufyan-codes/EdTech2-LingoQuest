import React from "react";

export default function Header() {
  return (
    <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-2xl">🎓</div>
        <h1 className="font-bold text-xl">LingoQuest</h1>
      </div>
      <button className="p-2">
        <span className="text-2xl">☰</span>
      </button>
    </div>
  );
}