// src/services/api.js
import axios from "axios";

// ✅ Use environment variable with fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     process.env.REACT_APP_API_URL || 
                     "https://edtech2-lingoquest-6w38.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 
    "Content-Type": "application/json" 
  },
  timeout: 30000, // Increased timeout for Render cold starts
  withCredentials: false
});

// Attach token automatically on every request
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log the request URL for debugging
      console.log('API Request:', config.method.toUpperCase(), config.url);
    } catch (err) {
      console.warn("Token read failed:", err);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Enhanced error handling
api.interceptors.response.use(
  (res) => {
    console.log('API Response:', res.config.url, res.status);
    return res;
  },
  (err) => {
    // Log detailed error for debugging
    if (err.response) {
      console.error('API Error Response:', {
        status: err.response.status,
        data: err.response.data,
        url: err.config?.url,
        baseURL: err.config?.baseURL
      });
    } else if (err.request) {
      console.error('API No Response:', {
        url: err.config?.url,
        baseURL: err.config?.baseURL,
        message: 'Server did not respond. Check if API is running.'
      });
    } else {
      console.error('API Error:', err.message);
    }
    
    return Promise.reject(err);
  }
);

export default api;