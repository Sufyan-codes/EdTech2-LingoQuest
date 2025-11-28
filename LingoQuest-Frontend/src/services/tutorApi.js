// src/services/tutorApi.js
import api from "../utils/axiosInstance";

/**
 * Get tutor dashboard stats
 */
export async function getTutorStats() {
  try {
    const res = await api.get("/tutor/stats");
    return res.data || {};
  } catch (error) {
    console.error("getTutorStats error:", error);
    return {
      activeStudents: 0,
      totalLessons: 0,
      completionRate: "0%"
    };
  }
}

/**
 * Save lesson (tutor)
 * ✅ FIXED: Properly handle quiz questions
 */
export async function saveLesson(lessonData, publish = true) {
  try {
    const payload = {
      title: lessonData.title,
      description: lessonData.description || "",
      category: lessonData.category || "Beginner",
      difficulty: lessonData.difficulty || "Beginner",
      videoUrl: lessonData.videoUrl,
      targetLanguage: lessonData.targetLanguage || "English",
      keywords: lessonData.keywords || [],
      quiz: lessonData.quiz || [], // ✅ Pass quiz questions
    };

    console.log("Saving lesson:", payload);

    const res = await api.post("/tutor/lessons", payload);
    
    // Normalize response
    if (res.data.lesson) {
      return {
        success: true,
        lesson: res.data.lesson,
        quiz: res.data.quiz
      };
    }
    
    return { success: true, lesson: res.data };
  } catch (error) {
    console.error("saveLesson error:", error.response?.data || error);
    throw error;
  }
}

/**
 * Create quiz for a lesson (tutor)
 */
export async function createQuizForLesson(lessonId, questions) {
  try {
    const res = await api.post(`/tutor/lessons/${lessonId}/quiz`, { 
      questions,
      pointsAwarded: 10 
    });
    return res.data;
  } catch (error) {
    console.error("createQuizForLesson error:", error);
    throw error;
  }
}

/**
 * Get recent lessons for tutor
 */
export async function getRecentLessons(limit = 10) {
  try {
    const res = await api.get(`/tutor/lessons/recent?limit=${limit}`);
    return res.data.lessons || res.data || [];
  } catch (err) {
    console.error("getRecentLessons error:", err);
    return [];
  }
}

/**
 * Update lesson
 */
export async function updateLesson(lessonId, lessonData) {
  try {
    const res = await api.put(`/tutor/lessons/${lessonId}`, lessonData);
    return res.data;
  } catch (error) {
    console.error("updateLesson error:", error);
    throw error;
  }
}

/**
 * Delete lesson
 */
export async function deleteLesson(lessonId) {
  try {
    const res = await api.delete(`/tutor/lessons/${lessonId}`);
    return res.data;
  } catch (error) {
    console.error("deleteLesson error:", error);
    throw error;
  }
}