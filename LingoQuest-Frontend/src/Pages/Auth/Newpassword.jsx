import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import resetIllustration from "../../assets/signup/Rectangle 33.svg";

export default function CreateNewPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false); // NEW

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      return setError("Both fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    // Show success modal instead of navigating immediately
    setSuccessModal(true);
  };

  const closeModalAndLogin = () => {
    navigate("/dashboard");
  };
  
  return (
    <section className="bg-[#EAEAEA] min-h-screen flex items-center justify-center px-6 relative">

      {/* SUCCESS MODAL OVERLAY */}
      {successModal && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[#FFFDF6] w-[460px] p-10 rounded-xl shadow-xl text-center animate-fadeIn">

            {/* Checkmark Circle */}
            <div className="mx-auto w-14 h-14 rounded-full border-2 border-[#2EA148] flex items-center justify-center mb-4">
              <span className="text-3xl text-[#2EA148]">✔</span>
            </div>

            <h2 className="text-[22px] font-semibold text-[#0E4E49] mb-6">
              Password changed successfully!
            </h2>

            <button
              onClick={closeModalAndLogin}
              className="bg-[#2EA148] text-white px-10 py-3 rounded-md font-semibold hover:bg-[#27913F] transition"
            >
              Log in
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white rounded-[25px] shadow-lg flex overflow-hidden">

        {/* LEFT SIDE – ILLUSTRATION */}
        <div className="w-1/2 bg-[#A5D8AB] flex justify-center items-center rounded-br-[120px] p-8">
          <img
            src={resetIllustration}
            alt="Reset Illustration"
            className="w-[70%] max-w-md"
          />
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="w-1/2 bg-[#E9F8FA] p-10">

          {/* BACK BUTTON */}
          <Link to="/otp" className="flex items-center gap-2 text-black font-medium mb-5">
            <span className="text-lg">←</span> Back
          </Link>

          <h1 className="text-3xl font-bold text-[#0E4E49] mb-2">
            Create a Secure Password
          </h1>

          <p className="text-gray-600 mb-8">
            Please suggest a strong password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">

            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="new password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA148]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-3 text-gray-500"
              >
                👁
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA148]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-4 top-3 text-gray-500"
              >
                👁
              </button>
            </div>

            {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

            {/* RESET BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#2EA148] text-white py-3 rounded-md font-semibold hover:bg-[#27913F] transition mt-4"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
