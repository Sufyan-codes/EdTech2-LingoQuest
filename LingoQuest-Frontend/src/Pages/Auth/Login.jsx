import React, { useState } from "react";
import logo from "../../assets/Icons/auth logo.svg";
import img from "../../assets/signup/Rectangle 32.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const user = await login(email, password);

      if (user.role?.toLowerCase() === "tutor") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <section className="bg-[#EAEAEA] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-[25px] overflow-hidden flex flex-col md:flex-row">

        {/* LEFT GRAPHICS - HIDDEN ON MOBILE */}
        <div className="hidden md:flex w-1/2 bg-[#2EA148] p-10 text-white rounded-l-[25px] rounded-br-[140px] flex-col justify-between">
          <div className="flex justify-center">
            <img src={img} alt="illustration" className="w-72" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">Hello Friend,</h1>
            <p className="text-lg max-w-sm">
              Unlock a new world of words, Join us and start speaking with confidence.
            </p>
          </div>

          <Link
            to="/signup"
            className="mt-6 bg-white text-[#2EA148] font-semibold px-8 py-3 rounded-md shadow-md text-center"
          >
            GET STARTED
          </Link>
        </div>

        {/* LOGIN FORM — ALWAYS VISIBLE */}
        <div className="w-full md:w-1/2 bg-[#EFFAFB] p-10">
          <img src={logo} alt="logo" className="h-14 mb-6" />

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-full px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Password</label>
              <input
                type="password"
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-full px-4 py-3"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>

              <Link className="text-[#2EA148] text-sm" to="/forgotpassword">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2EA148] text-white py-3 rounded-full font-semibold"
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
