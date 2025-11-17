import React, { useState } from "react";
import logo from "../../assets/Icons/logo.svg";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with your actual authentication service
      const response = await mockLoginAPI({ email, password });

      if (response.success) {
        // Store authentication state (you might want to use context or redux)
        if (rememberMe) {
          localStorage.setItem("userToken", response.token);
          localStorage.setItem("userEmail", email);
        } else {
          sessionStorage.setItem("userToken", response.token);
        }

        navigate("/dashboard");
      } else {
        alert(
          response.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock login API function - replace with your actual API call
  const mockLoginAPI = async (credentials) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - replace with actual backend validation
    if (
      credentials.email === "user@example.com" &&
      credentials.password === "password"
    ) {
      return {
        success: true,
        token: "mock-jwt-token",
        user: { email: credentials.email },
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#218381] p-6">
          {/* Logo and Header */}
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="LingoQuest Logo"
              className="mx-auto h-8 mb-4"
            />
            <h2 className="text-xl font-semibold text-[#8F2D56] mb-1">
              Welcome Back 👋
            </h2>
            <p className="text-[#8F2D56] text-sm">
              Sign in to continue your language journey
            </p>
          </div>

          {/* Login/Sign Up Tabs */}
          <div className="flex mb-6 bg-[#CDE2E4] p-1 rounded-full">
            <div className="flex-1 text-center py-2 bg-[#EFFAFB] text-[#8F2D56] rounded-full font-medium">
              Login
            </div>
            <Link
              to="/signup"
              className="flex-1 text-center py-2 text-[#8F2D56] hover:text-[#6b1a3b] transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@mail.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded mr-2 text-[#218381] focus:ring-[#FFBC42]"
                  disabled={isLoading}
                />
                <span className="text-sm text-white">Remember Me</span>
              </div>
              <Link
                to="/forgotpassword"
                className="text-sm text-[#FFBC42] hover:text-[#ffa90d] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFBC42] text-[#8F2D56] text-center py-3 rounded-full font-medium hover:bg-[#ffa90d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="text-center text-[#FFBC42] text-sm mb-4">
              Continue with
            </div>
            <button
              type="button"
              disabled={isLoading}
              className="w-full border border-gray-300 bg-white text-gray-700 rounded-full text-center py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue with Google
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6">
          <div className="text-center text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-[#218381] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#218381] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
