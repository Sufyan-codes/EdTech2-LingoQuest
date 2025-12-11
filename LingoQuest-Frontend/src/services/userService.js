// src/services/userService.js
import api from "./api";

export async function getDashboardData() {
  const res = await api.get("/users/dashboard");
  return res.data;
}
