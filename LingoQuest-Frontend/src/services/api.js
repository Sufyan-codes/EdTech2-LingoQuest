// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://edtech2-lingoquest-6w38.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach token automatically on every request
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Token read failed:", err);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Enhanced error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Log detailed error for debugging
    if (err.response) {
      console.error('API Error Response:', {
        status: err.response.status,
        data: err.response.data,
        url: err.config?.url
      });
    } else if (err.request) {
      console.error('API No Response:', err.request);
    } else {
      console.error('API Error:', err.message);
    }
    
    return Promise.reject(err);
  }
);

export default api;