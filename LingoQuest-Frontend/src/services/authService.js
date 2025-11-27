// src/services/authService.js
import api from "./api";
import axios from "../utils/axiosInstance";
/**
 * LOGIN: POST /api/users/login
 * Backend returns: { _id, name, email, targetLanguage, role, token }
 */



export const loginApi = async (email, password) => {
  const res = await axios.post("/users/login", { email, password });

  return res.data;
};

/**
 * SIGNUP: POST /api/users/register
 * Backend expects: { name, email, password, targetLanguage?, role? }
 * FIXED: Now accepts object parameter to match backend
 */
export async function signupApi({ name, email, password, targetLanguage, role }) {
  const res = await api.post("/users/register", {
    name,
    email,
    password,
    targetLanguage: targetLanguage || "English",
    role: role || "Learner"
  });
  return res.data;
}

/**
 * DASHBOARD DATA: GET /api/users/dashboard
 * Requires Authorization: Bearer token
 */
export async function getDashboardData() {
  const res = await api.get("/users/dashboard");
  return res.data;
}