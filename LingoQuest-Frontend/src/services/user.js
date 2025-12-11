// src/services/user.js
import api from "./api";

/**
 * Update user profile (for onboarding language selection)
 * This will need a backend endpoint: PATCH /api/users/profile
 */
export async function updateUserProfile(data) {
  try {
    const res = await api.patch("/users/profile", data);
    return res.data;
  } catch (error) {
    console.warn("Profile update not implemented on backend yet:", error);
    // For now, store in localStorage as fallback
    if (data.profile?.language) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.targetLanguage = data.profile.language;
      localStorage.setItem("user", JSON.stringify(user));
    }
    return { success: true };
  }
}