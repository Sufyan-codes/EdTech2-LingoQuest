// src/Pages/Onboarding/WelcomeScreen.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import introImg from "../../assets/Onboarding/image 2.svg";
import convoImg from "../../assets/Onboarding/image 3.svg";
import grammarImg from "../../assets/Onboarding/image 4.svg";

export default function WelcomeScreen() {
  const { user } = useAuth();

  // FIXED: Safely handle user name extraction
  const displayName = user?.name || user?.fullName || "";
  const firstName = displayName ? String(displayName).split(" ")[0] : "Linguist";

  return (
    <section className="bg-[#FAF7F0] min-h-screen flex justify-center px-6 py-12">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0E4E49] leading-tight">
            Welcome to LingoQuest, {firstName}!
          </h1>

          <p className="text-lg text-[#6A7F7A] mt-4 max-w-2xl mx-auto">
            Ready to start your language learning journey? Let's make it fun and engaging!
          </p>

          <Link
            to="/language"
            className="inline-block bg-[#2EA148] mt-6 px-8 py-3 text-white font-semibold rounded-md shadow-md hover:bg-[#27913F] transition-all"
          >
            Start Learning
          </Link>
        </div>

        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0E4E49]">
            Your learning path starts here.
          </h2>

          <p className="text-[#6A7F7A] text-lg mt-3 max-w-2xl mx-auto">
            Begin with our carefully curated beginner courses designed to get you speaking confidently in no time.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-[#0E4E49]">Recommended Beginner Courses</h3>
          <button className="text-[#0E4E49] font-medium hover:underline">More</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 flex items-center gap-4 shadow-sm">
            <img src={introImg} alt="Introduction" className="w-20 h-20 object-contain" />
            <div>
              <h4 className="text-lg font-semibold text-[#0E4E49]">Introduction Course</h4>
              <p className="text-[#6A7F7A] text-sm mt-1">Learn basic greetings and essential phrases to get started.</p>
              <p className="text-[#395A59] text-sm mt-2">15 Lessons • 6 Hours</p>
            </div>
          </div>

          <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 flex items-center gap-4 shadow-sm">
            <img src={convoImg} alt="Daily Conversations" className="w-20 h-20 object-contain" />
            <div>
              <h4 className="text-lg font-semibold text-[#0E4E49]">Daily Conversations</h4>
              <p className="text-[#6A7F7A] text-sm mt-1">Practice real-world dialogues for everyday situations.</p>
              <p className="text-[#395A59] text-sm mt-2">20 Lessons • 8 Hours</p>
            </div>
          </div>

          <div className="bg-white border border-[#DDE7E5] rounded-xl p-6 flex items-center gap-4 shadow-sm">
            <img src={grammarImg} alt="Grammar Basics" className="w-20 h-20 object-contain" />
            <div>
              <h4 className="text-lg font-semibold text-[#0E4E49]">Grammar Basics</h4>
              <p className="text-[#6A7F7A] text-sm mt-1">Master fundamental grammar rules with interactive exercises.</p>
              <p className="text-[#395A59] text-sm mt-2">12 Lessons • 5 Hours</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-14">
          <p className="text-[#0E4E49] text-lg italic">
            "To have another language is to possess a second soul." — Charlemagne
          </p>
        </div>
      </div>
    </section>
  );
}