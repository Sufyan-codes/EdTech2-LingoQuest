import React from "react";
import hero from "../../assets/Hero image.svg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#FFFDF7] flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between md:flex-row flex-col items-center lg:gap-8 gap-8 pt-20">
          <div className="grid gap-6 flex-1">
            <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-[#1A2634] leading-tight">
              Learn Languages. <br />
              Connect the World.
            </h1>
            <p className="text-lg md:text-xl text-[#000000] max-w-2xl leading-relaxed">
              Master foreign languages through interactive videos, quizzes, live-tutor sessions and your own Ai tutor - Lingo Ai. Join thousands of learners from Africa and around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
                to='/signup'
                className="bg-[#2EA148] text-white font-semibold py-3 px-8 rounded-lg  hover:text-white transition duration-300 text-center"
              >
                Start Learning
              </Link>
              <Link 
                to="/login"
                className="border-2 border-[#2EA148] text-[#2EA148] font-semibold py-3 px-8 rounded-lg hover:bg-[#218380] hover:text-white transition duration-300 text-center"
              >
                Login
              </Link>
              {/* <Link 
                to="/becomeatutor"
                className="bg-[#1A535C] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#218380] hover:text-white transition duration-300 text-center"
              >
                Become a tutor
              </Link> */}
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <img 
              src={hero} 
              alt="Language learning illustration showing people connecting through language" 
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}