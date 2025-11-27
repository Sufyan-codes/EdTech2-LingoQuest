import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import forgotIllustration from "../../assets/signup/Rectangle 14.svg";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleOTPChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }

      // Auto-backspace go to previous
      if (!value && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    alert(`Entered OTP: ${otp.join("")}`);
  };

  return (
    <section className="bg-[#EAEAEA] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-[#E9F8FA] rounded-[25px] shadow-lg p-10 flex items-center gap-14">

        {/* LEFT ILLUSTRATION */}
        <div className="w-1/2 flex justify-center">
          <img
            src={forgotIllustration}
            alt="OTP Illustration"
            className="w-[80%] max-w-md"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">

          {/* Back */}
          <Link to="/forgot-password" className="text-black font-medium flex items-center gap-2 mb-4">
            <span className="text-lg">←</span> Back
          </Link>

          <h1 className="text-3xl font-bold text-[#0E4E49] mb-3">
            Forgot your Password
          </h1>

          <p className="text-gray-600 mb-6 max-w-md">
            A verification code has been sent to<br />
            <span className="font-medium">fa**********@gmail.com</span>
          </p>

          {/* OTP INPUTS */}
          <form onSubmit={handleVerify}>

            <label className="block text-[#0E4E49] font-semibold mb-3">
              Enter OTP
            </label>

            <div className="flex gap-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(e.target.value, index)}
                  className="w-14 h-14 border border-[#2EA148] rounded-md text-center text-2xl font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#2EA148]"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full border border-[#2EA148] text-[#2EA148] font-semibold py-3 rounded-full text-lg hover:bg-[#2EA148] hover:text-white transition"
            >
              Verify
            </button>

            <p className="mt-4 text-gray-600 text-sm text-center">
              Didn’t receive a code?{" "}
              <button type="button" className="text-[#2EA148] font-medium hover:underline">
                Resend code
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
