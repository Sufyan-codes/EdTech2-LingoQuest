import React, { useState } from "react";
import logo from "../../assets/Icons/logo.svg";
import signupIllustration from "../../assets/signup/Rectangle 33.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        targetLanguage: "English",
        role: "Learner",
      });

      navigate("/onboarding");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] to-[#F0F7F0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">

        {/* FORM SIDE - ALWAYS VISIBLE */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <img src={logo} alt="logo" className="w-40 mb-6" />

          <h2 className="text-3xl font-bold text-[#0E4E49]">Create Account</h2>
          <p className="text-gray-600 mt-2 mb-4">
            Join LingoQuest and start learning!
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="you@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Create password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Confirm password"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a className="text-[#2EA148] underline">Terms</a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2EA148] text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating Account..." : "SIGN UP"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2EA148] font-semibold">
              Log In
            </Link>
          </p>
        </div>

        {/* RIGHT ILLUSTRATION → HIDDEN ON MOBILE */}
        <div className="hidden md:flex w-1/2 bg-[#2EA148] items-center justify-center p-8">
          <img src={signupIllustration} className="max-w-full" />
        </div>

      </div>
    </div>
  );
}
