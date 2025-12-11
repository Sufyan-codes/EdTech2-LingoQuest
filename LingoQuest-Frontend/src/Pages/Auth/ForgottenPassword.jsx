import React, { useState } from "react";
import { Link } from "react-router-dom";
import forgotIllustration from "../../assets/signup/Rectangle 14.svg";

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Enter your email");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // mock delay
    setLoading(false);
    setSent(true);
  };

  return (
    <section className="bg-[#EAEAEA] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-[#E9F8FA] rounded-[25px] shadow-lg p-10 flex items-center gap-10">

        {/* LEFT ILLUSTRATION */}
        <div className="w-1/2 flex justify-center">
          <img
            src={forgotIllustration}
            alt="Forgot Password Illustration"
            className="w-[80%] max-w-md"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2">
          {/* Back Button */}
          <Link to="/login" className="text-black font-medium flex items-center gap-2 mb-4">
            <span className="text-lg">←</span> Back
          </Link>

          <h1 className="text-3xl font-bold text-[#0E4E49] mb-2">
            Forgot your Password
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
            Enter your email address and we’ll send you a
            verification code to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="max-w-sm">
            <label className="block text-[#0E4E49] font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3EB5A5]"
            />

            <button
              type="submit"
              className="w-full mt-6 bg-[#2EA148] text-white rounded-md py-3 font-semibold hover:bg-[#27913F] transition"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>

            {sent && (
              <p className="text-green-600 text-sm mt-3">
                A reset link has been sent to your email (mock).
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
