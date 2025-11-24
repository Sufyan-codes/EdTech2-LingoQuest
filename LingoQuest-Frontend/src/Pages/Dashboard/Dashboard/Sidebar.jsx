import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Icons/logo.svg"
import home from "../../../assets/Dashboard/House.svg"
import lesson from "../../../assets/Dashboard/BookOpen (1).svg"
import CheckCircle from "../../../assets/Dashboard/CheckCircle.svg"
import trophy from "../../../assets/Dashboard/Trophy.svg"
import user from "../../../assets/Dashboard/User.svg"
import logout from "../../../assets/Dashboard/SignOut.svg"

export default function Sidebar() {
  const menuItems = [
    { icon: <img src={home} />, label: "Dashboard", active: true },
    { icon: <img src={lesson} />, label: "Lessons" },
    { icon: <img src={CheckCircle} />, label: "Quiz" },
    { icon: <img src={trophy} />, label: "Leaderboard" },
    { icon: <img src={user} />, label: "Profile" },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
      <div>
        <div className="borcder border-b mb-10">
          <div className="text-2xl"><img src={logo} alt="" /></div>
         
        </div>

        <nav className="flex flex-col gap-4">
          
            <Link to='/dashboard'
              
              className={`flex items-center gap-2 py-3 px-4 rounded-xl text-left font-semibold transition-colors 
               
                  bg-[#FF6B6B] text-white
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <img src={home} />
              <span>Dashboard</span>
             
          </Link>
          <Link to='/lessons'
              
              className={`flex items-center gap-2 py-3 px-4 rounded-xl text-left font-semibold transition-colors 
               
                  ? "bg-[#FF6B6B] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <img src={lesson} />
              <span>Lessons</span>
             
          </Link>
          <Link to='/quiz'
              
              className={`flex items-center gap-2 py-3 px-4 rounded-xl text-left font-semibold transition-colors 
               
                  ? "bg-[#FF6B6B] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <img src={CheckCircle} />
              <span>Quiz</span>
             
          </Link>
          <Link to='/leaderboard'
              
              className={`flex items-center gap-2 py-3 px-4 rounded-xl text-left font-semibold transition-colors 
               
                  ? "bg-[#FF6B6B] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <img src={trophy} />
              <span>Leaderboard</span>
             
          </Link>
          <Link to='/profile'
              
              className={`flex items-center gap-2 py-3 px-4 rounded-xl text-left font-semibold transition-colors 
               
                  ? "bg-[#FF6B6B] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
            <img src={user} />  
            <span>Profile</span>
             
            </Link>
          
        </nav>
      </div>

      <button className="flex items-center gap-2 text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-xl transition-colors">
        <span><img src={logout} alt="" /></span>
        Log out
      </button>
    </aside>
  );
}