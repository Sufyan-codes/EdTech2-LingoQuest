import React from "react";
import french from "../../assets/Icons/fxemoji_franceflag.svg";
import spain from "../../assets/Icons/fxemoji_spanishflag.svg";
import chinese from "../../assets/Icons/fxemoji_chineseflag.svg";
import nigeria from "../../assets/Icons/twemoji_flag-nigeria.svg";
import { Link } from "react-router-dom";

export default function BecomeATutor() {
  return (
    <section className="bg-[#ECF0DF] py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="max-w-2xl mx-auto mb-12 lg:mb-16">
        <h1 className="lg:text-4xl text-3xl font-bold text-[#1A535C] mb-4">
        Share Your Language Expertise
        </h1>
        <p className="lg:text-xl text-lg text-[#64646B] leading-relaxed">
        Join our global community of tutors and help learners achieve their language goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
       

        <Link 
          to="/languages/spanish" 
          className="block group"
        >
          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group-hover:scale-105 transition-transform">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img 
                src={spain} 
                alt="Spanish flag" 
                className="w-8 h-8"
              />
            </div>
                          <p className="text-[#1A535C] font-semibold text-lg">Flexible Schedule</p>
                          <span className="text-[#64646B]">Teach when it works for you, from anywhere in the world</span>
          </div>
        </Link>

        <Link 
          to="/languages/chinese" 
          className="block group"
        >
          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group-hover:scale-105 transition-transform">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img 
                src={chinese} 
                alt="Chinese flag" 
                className="w-8 h-8"
              />
            </div>
                          <p className="text-[#1A535C] font-semibold text-lg">Build Your Experience</p>
                          <span className="text-[#64646B]">Deepen your mastery by guiding learners and refining your teaching approach</span>
          </div>
        </Link>

        <Link 
          to="/languages/yoruba" 
          className="block group"
        >
          <div className="bg-white flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group-hover:scale-105 transition-transform">
            <div className="bg-[#E8F2F2] w-14 h-14 flex items-center justify-center rounded-lg mb-4">
              <img 
                src={nigeria} 
                alt="Nigerian flag for Yoruba language" 
                className="w-8 h-8"
              />
            </div>
                          <p className="text-[#1A535C] font-semibold text-lg">Global Impact</p>
                          <span className="text-[#64646B]">Connect with students world wide and make real difference</span>
          </div>
        </Link>
      </div>

      <div className="mt-12">
        <Link 
          to="/languages" 
          className="inline-flex items-center justify-center border-2 border-[#1A535C] text-[#1A535C] font-semibold py-3 px-8 rounded-lg hover:bg-[#218380] hover:text-white transition-all duration-300"
        >
          Become A Tutor
        </Link>
      </div>
    </div>
  </section>
  )
}
