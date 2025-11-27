// src/services/tutorApi.js
import api from "../utils/axiosInstance";

/**
 * Get tutor dashboard stats
 */
export async function getTutorStats() {
  const res = await api.get("/tutor/stats");
  return res.data || {};
}

/**
 * Save lesson (tutor)
 * Expects backend POST /tutor/lessons
 * Returns { lesson: {...} }
 */
export async function saveLesson(lessonData, publish = true) {
  try {
    const payload = {
      title: lessonData.title,
      textNotes: lessonData.description || lessonData.textNotes || "",
      level: lessonData.difficulty || lessonData.category || "Beginner",
      videoUrl: lessonData.videoUrl,
      targetLanguage: lessonData.targetLanguage || "English",
      keywords: lessonData.keywords || [],
      status: publish ? "published" : "draft",
      quiz: lessonData.quiz || [],
    };

    const res = await api.post("/tutor/lessons", payload);
    // normalize returned shape
    if (res.data.lesson) return res.data;
    if (res.data) return { lesson: res.data };
    return { lesson: payload }; // fallback
  } catch (error) {
    // propagate error so UI can fallback to local storage if desired
    throw error;
  }
}

/**
 * Create quiz for a lesson (tutor)
 */
export async function createQuizForLesson(lessonId, questions) {
  const res = await api.post(`/tutor/lessons/${lessonId}/quiz`, { questions });
  return res.data;
}

/**
 * Get recent lessons for tutor (for their dashboard)
 */
export async function getRecentLessons(limit = 10) {
  try {
    const res = await api.get(`/tutor/lessons/recent?limit=${limit}`);
    return res.data.lessons || res.data || [];
  } catch (err) {
    // fallback: try generic tutor lessons endpoint
    try {
      const res = await api.get(`/tutor/lessons?limit=${limit}`);
      return res.data.lessons || res.data || [];
    } catch (err2) {
      // If backend absent, return []
      console.error("getRecentLessons error:", err, err2);
      return [];
    }
  }
}
