// src/services/authService.js
import api from "../utils/axiosInstance";

/**
 * LOGIN: POST /api/users/login
 */
export const loginApi = async (email, password) => {
  const res = await api.post("/users/login", { email, password });
  return res.data;
};

/**
 * SIGNUP: POST /api/users/register
 */
export async function signupApi({ name, email, password, targetLanguage, role }) {
  const res = await api.post("/users/register", {
    name,
    email,
    password,
    targetLanguage: targetLanguage || "English",
    role: role || "Learner",
  });

  return res.data;
}

/**
 * DASHBOARD DATA
 */
export async function getDashboardData() {
  const res = await api.get("/users/dashboard");
  return res.data;
}
