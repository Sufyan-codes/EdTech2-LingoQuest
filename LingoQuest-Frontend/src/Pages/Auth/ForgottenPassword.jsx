import React, { useState } from "react";
import logo from "../../assets/Icons/logo.svg";
import { Link } from "react-router-dom";

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Enter your email");
    setLoading(true);
    // mock delay
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  };

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#218381] p-6">
          <div className="text-center mb-4">
            <img src={logo} alt="" className="mx-auto h-8 mb-4" />
            <h2 className="text-xl font-semibold text-[#8F2D56] mb-1">Forgot Password?</h2>
            <p className="text-[#8F2D56] text-sm">Enter your registered email address and we’ll send you a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-white text-left">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className="border border-gray-300 rounded-full px-3 py-2 text-[#8F2D56]" />

            <button type="submit" className="bg-[#FFBC42] text-white text-center py-2 rounded font-medium mt-2">{loading ? "Sending..." : "Send reset link"}</button>

            {sent && <p className="text-sm text-green-600">Reset link sent (mock)</p>}
            <Link to='/login' className="text-center text-[#FFBC42] text-sm">Back to login</Link>
          </form>
        </div>

        <div className="p-6">
          <div className="text-center text-xs text-gray-500">By using this you agree to our <span className="text-blue-600">Terms</span> and <span className="text-blue-600">Privacy Policy</span></div>
        </div>
      </div>
    </section>
  );
}
