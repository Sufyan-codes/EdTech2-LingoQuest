import React, { useState } from "react";
import logo from "../../assets/Icons/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const res = await signup({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (res.success) {
      navigate("/onboarding");
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#218381] p-6">
          <div className="text-center mb-4">
            <img src={logo} alt="LingoQuest Logo" className="mx-auto h-8 mb-4" />
            <h2 className="text-xl font-semibold text-[#8F2D56] mb-1">Welcome 👋</h2>
            <p className="text-[#8F2D56] text-sm">Sign Up to begin your language journey</p>
          </div>

          <div className="flex mb-6 bg-[#CDE2E4] p-1 rounded-full">
            <Link to="/login" className="flex-1 text-center py-2 text-[#8F2D56] hover:text-[#6b1a3b] transition-colors">Login</Link>
            <div className="flex-1 text-center py-2 bg-[#EFFAFB] text-[#8F2D56] rounded-full font-medium">Sign Up</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]" />
              {errors.fullName && <p className="text-red-300 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]" />
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]" />
              {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]" />
              {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} disabled={isLoading}
                className="w-4 h-4 border border-gray-300 rounded mr-2 text-[#218381] focus:ring-[#FFBC42] mt-1" />
              <span className="text-sm text-white">I agree to the <Link to="/terms" className="text-[#FFBC42] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#FFBC42] hover:underline">Privacy Policy</Link></span>
            </div>
            {errors.agreeToTerms && <p className="text-red-300 text-xs mt-1">{errors.agreeToTerms}</p>}

            <button type="submit" disabled={isLoading}
              className="w-full bg-[#FFBC42] text-[#8F2D56] text-center py-3 rounded-full font-medium hover:bg-[#ffa90d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6">
            <div className="text-center text-[#FFBC42] text-sm mb-4">Continue with</div>
            <button type="button" disabled={isLoading}
              className="w-full border border-gray-300 bg-white text-gray-700 rounded-full text-center py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Continue with Google
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center text-xs text-gray-500">Already have an account? <Link to="/login" className="text-[#218381] hover:underline font-medium">Login here</Link></div>
        </div>
      </div>
    </section>
  );
}
