import React, { useState } from "react";
import logo from "../../assets/Icons/auth logo.svg";
import img from "../../assets/signup/Rectangle 32.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();   // ✅ Correct login function from AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Use AuthContext login
      const user = await login(email, password);

      // Normalize role to lowercase
      const role = user.role?.toLowerCase();

      if (role === "tutor") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard"); // ← Change this to your user dashboard route
      }

    } catch (err) {
      console.log("Login failed:", err);
      setError(err?.response?.data?.message || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <section className="bg-[#EAEAEA] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-[25px] overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-[#2EA148] p-10 text-white rounded-l-[25px] rounded-br-[140px] flex flex-col justify-between">
          <div className="flex justify-center">
            <img src={img} alt="illustration" className="w-72" />
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2">Hello Friend,</h1>
            <p className="text-lg max-w-sm">
              Unlock a new world of words, Join us and start speaking with confidence.
            </p>
          </div>

          <Link 
            to="/signup"
            className="mt-6 bg-white text-[#2EA148] font-semibold px-8 py-3 rounded-md shadow-md hover:bg-gray-100 transition text-center"
          >
            GET STARTED
          </Link>
        </div>

        {/* RIGHT SIDE — LOGIN FORM */}
        <div className="w-1/2 bg-[#EFFAFB] p-10">
          <img src={logo} alt="logo" className="h-14 mb-6" />

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#0E4E49] mb-1">Email</label>
              <input
                type="email"
                placeholder="you@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0E4E49] mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 bg-white"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-[#0E4E49] text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Remember Me</span>
              </label>

              <Link to="/forgotpassword" className="text-sm text-[#2EA148] hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2EA148] text-white py-3 rounded-full font-semibold hover:bg-[#278E40] transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full bg-[#2EA148] text-white py-3 rounded-full font-medium hover:bg-[#278E40]"
            >
              Continue with Google
            </button>
          </form>

          <div className="text-center text-xs text-[#0E4E49] mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-[#2EA148] hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-[#2EA148] hover:underline">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </section>
  );
}
