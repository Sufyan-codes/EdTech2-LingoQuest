import { React, useState } from "react";
import logo from "../../assets/Icons/logo.svg";

import { useNavigate, Link } from "react-router-dom";

export default function ForgottenPassword() {
  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] h-screen  text-center">
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Main Title */}
      <img src={logo} alt="" />
      <div className="w-full max-w-md bg-[#218381] mt-4 p-4 rounded-md">
        {/* Welcome Section */}
        <h2 className="text-xl font-semibold text-center text-[#8F2D56] mb-1">
        Forgot Password?
        </h2>
        <p className="text-[#8F2D56] text-center mb-6">
        Enter your registered email address and we’ll send you a reset link
        </p>

      

        <form action="" className="flex flex-col text-left">
          <span className="text-sm font-medium text-white mb-2">Email</span>
          <input
            className="border border-gray-300 rounded-full px-3 py-2 text-[#8F2D56]"
            type="Email"
            name="Email"
            placeholder="Enter your email"
            id=""
          />

          
       

          <button className="bg-[#FFBC42] text-white text-center py-2 rounded font-medium mt-6">
            Login
          </button>
          <Link to='/login' className="text-center text-[#FFBC42] text-sm mb-4">
            Back to login
          </Link>
          
        </form>

       
            </div>
            <div className="text-center text-xs text-gray-500">
          By signing up, you agree to our{" "}
          <span className="text-blue-600">Terms of Service</span> and{" "}
          <span className="text-blue-600">Privacy Policy</span>
        </div>
    </div>
  </section>
  )
}
