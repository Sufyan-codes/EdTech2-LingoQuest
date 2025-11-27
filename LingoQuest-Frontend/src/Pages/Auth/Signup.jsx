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

    // Validation
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
      // Call signup with correct structure
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        targetLanguage: "English", // Default language
        role: "Learner"
      });

      // Navigate to onboarding after successful signup
      navigate("/onboarding");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <img src={logo} alt="LingoQuest Logo" className="w-40 mb-4" />
            <h2 className="text-3xl font-bold text-[#0E4E49]">Create Account</h2>
            <p className="text-gray-600 mt-2">Join LingoQuest and start learning!</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EA148] focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EA148] focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EA148] focus:outline-none"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EA148] focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 mr-2"
              />
              <label className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-[#2EA148] hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2EA148] text-white py-3 rounded-lg font-semibold hover:bg-[#27913F] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "SIGN UP"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2EA148] font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 bg-[#2EA148] flex items-center justify-center p-8">
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}