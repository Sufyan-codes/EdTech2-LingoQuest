import React from "react";
import book from "../../assets/Icons/BookOpen.svg";
import { Link } from "react-router-dom";

export default function WelcomeScreen() {
  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen">
      <div className="max-w-6xl mx-auto text-center px-4 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col gap-6 mb-12">
          <h1 className="text-[#8F2D56] lg:text-5xl md:text-4xl text-3xl font-bold leading-tight">
            Welcome to LingoQuest
          </h1>
          <p className="text-[#8F2D56] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to start your language learning journey? Let's make it fun and engaging!
          </p>
          <div className="mt-4">
            <Link 
              to='/language' 
              className="inline-block bg-[#FFBC42] text-[#8F2D56] font-semibold px-8 py-3 rounded-lg hover:bg-[#ffa90d] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="bg-[#218381] flex flex-col items-center gap-6 text-white p-8 lg:p-12 rounded-2xl mb-12 shadow-lg">
          <div className="p-4 bg-[#FFBC42] bg-opacity-30 rounded-full">
            <img src={book} className="w-12 h-12 lg:w-16 lg:h-16" alt="Book icon representing learning" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold">Your Learning Path Starts Here</h2>
          <p className="text-lg lg:text-xl max-w-3xl leading-relaxed text-center">
            Begin with our carefully curated beginner courses
            <br /> designed to get you speaking confidently in no time.
          </p>
          <div className="mt-4">
            <button className="bg-white text-[#8F2D56] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Browse Lessons
            </button>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="text-left mb-12">
          <h2 className="text-[#8F2D56] font-bold text-2xl lg:text-3xl mb-8">
            Recommended Beginner Courses
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* Course 1 */}
            <div className="bg-[#218381] flex flex-col text-left gap-4 rounded-xl text-white p-6 hover:shadow-xl transition-shadow duration-300">
              <div>
                <div className="bg-[#34777C] w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <p className="text-xl font-semibold">Introduction Course</p>
              <span className="text-[#8F2D56] text-sm leading-relaxed">
                Learn basic greetings and essential phrases to get started.
              </span>
              <span className="text-[#8F2D56] text-sm font-medium">15 Lessons • 6 Hours</span>
            </div>

            {/* Course 2 */}
            <div className="bg-[#218381] flex flex-col text-left gap-4 rounded-xl text-white p-6 hover:shadow-xl transition-shadow duration-300">
              <div>
                <div className="bg-[#34777C] w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
              </div>
              <p className="text-xl font-semibold">Daily Conversations</p>
              <span className="text-[#8F2D56] text-sm leading-relaxed">
                Practice real-world dialogues for everyday situations.
              </span>
              <span className="text-[#8F2D56] text-sm font-medium">20 Lessons • 8 Hours</span>
            </div>

            {/* Course 3 */}
            <div className="bg-[#218381] flex flex-col text-left gap-4 rounded-xl text-white p-6 hover:shadow-xl transition-shadow duration-300">
              <div>
                <div className="bg-[#34777C] w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
              </div>
              <p className="text-xl font-semibold">Grammar Basics</p>
              <span className="text-[#8F2D56] text-sm leading-relaxed">
                Master fundamental grammar rules with interactive exercises.
              </span>
              <span className="text-[#8F2D56] text-sm font-medium">12 Lessons • 5 Hours</span>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#218381] p-8 rounded-2xl shadow-lg">
          <p className="text-[#8F2D56] text-lg lg:text-xl italic font-medium leading-relaxed">
            "To have another language is to possess a second soul. - Charlemagne"
          </p>
        </div>
      </div>
    </section>
  );
}