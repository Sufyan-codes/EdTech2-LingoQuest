import React, { useState } from "react";
import logo from "../../assets/Icons/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const res = await login({ email, password }, rememberMe);

    setIsLoading(false);

    if (res.success) navigate("/onboarding");
  };
  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#218381] p-6">
          <div className="text-center mb-4">
            <img src={logo} alt="LingoQuest Logo" className="mx-auto h-8 mb-4" />
            <h2 className="text-xl font-semibold text-[#8F2D56] mb-1">Welcome Back 👋</h2>
            <p className="text-[#8F2D56] text-sm">Sign in to continue your language journey</p>
          </div>

          <div className="flex mb-6 bg-[#CDE2E4] p-1 rounded-full">
            <div className="flex-1 text-center py-2 bg-[#EFFAFB] text-[#8F2D56] rounded-full font-medium">Login</div>
            <Link to="/signup" className="flex-1 text-center py-2 text-[#8F2D56] hover:text-[#6b1a3b] transition-colors">Sign Up</Link>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.com" required disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required disabled={isLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-[#8F2D56] focus:outline-none focus:ring-2 focus:ring-[#FFBC42]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} disabled={isLoading}
                  className="w-4 h-4 border border-gray-300 rounded mr-2 text-[#218381] focus:ring-[#FFBC42]" />
                <span className="text-sm text-white">Remember Me</span>
              </div>
              <Link to="/forgotpassword" className="text-sm text-[#FFBC42] hover:text-[#ffa90d] transition-colors">Forgot Password?</Link>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-[#FFBC42] text-[#8F2D56] text-center py-3 rounded-full font-medium hover:bg-[#ffa90d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6">
            <div className="text-center text-[#FFBC42] text-sm mb-4">Continue with</div>
            <button type="button" disabled={isLoading} className="w-full border border-gray-300 bg-white text-gray-700 rounded-full text-center py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Continue with Google
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center text-xs text-gray-500">By signing in, you agree to our <Link to="/terms" className="text-[#218381] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#218381] hover:underline">Privacy Policy</Link></div>
        </div>
      </div>
    </section>
  );
}
