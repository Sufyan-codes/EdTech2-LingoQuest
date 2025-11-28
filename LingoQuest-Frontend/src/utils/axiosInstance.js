// src/utils/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const rawUserInfo = localStorage.getItem("userInfo");
  const rawUser = localStorage.getItem("user");
  const tokenDirect = localStorage.getItem("token");

  let parsedUserInfo = null;
  let parsedUser = null;

  try {
    parsedUserInfo = rawUserInfo ? JSON.parse(rawUserInfo) : null;
  } catch {}

  try {
    parsedUser = rawUser ? JSON.parse(rawUser) : null;
  } catch {}

  // Extract token from every possible storage shape
  const token =
    tokenDirect ||
    parsedUserInfo?.token ||
    parsedUser?.token ||
    parsedUserInfo?.data?.token ||
    parsedUser?.data?.token ||
    null;

  // Attach ONLY what backend needs:
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Debug for development
  if (import.meta.env.MODE === "development") {
    console.log("Axios → Sending token:", token ? "YES" : "NO");
  }

  return config;
});

export default api;
