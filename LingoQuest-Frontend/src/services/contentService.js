// src/services/contentService.js
import api from "./api";

/** ---------------------------------------------
 * GET ALL LESSONS
 * GET /api/content/lessons
 ------------------------------------------------ */
export const getLessons = async () => {
  const res = await api.get("/content/lessons");
  return res.data.items || [];
};

/** ---------------------------------------------
 * GET LESSON BY ID
 * GET /api/content/lessons/:id
 ------------------------------------------------ */
export const getLessonById = async (id) => {
  const res = await api.get(`/content/lessons/${id}`); // ✅ Fixed
  return res.data;
};

/** ---------------------------------------------
 * GET LESSONS BY LANGUAGE
 * GET /api/content/lessons/language/:language
 ------------------------------------------------ */
export const getLessonsByLanguage = async (language) => {
  const res = await api.get(`/content/lessons/language/${language}`); // ✅ Fixed
  return res.data;
};

/** ---------------------------------------------
 * GET QUIZ FOR A LESSON
 * GET /api/content/quizzes/:lessonId
 ------------------------------------------------ */
export const getQuizByLesson = async (lessonId) => {
  try {
    const res = await api.get(`/content/quizzes/${lessonId}`); // ✅ Fixed
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

/** ---------------------------------------------
 * SUBMIT QUIZ
 * POST /api/content/quizzes/:lessonId/submit
 ------------------------------------------------ */
export const submitQuiz = async (lessonId, answers) => {
  const res = await api.post(`/content/quizzes/${lessonId}/submit`, { answers }); // ✅ Fixed
  return res.data;
};

/** ---------------------------------------------
 * LINGO AI CHAT
 * POST /api/content/chat
 ------------------------------------------------ */
export const sendChatMessage = async (message, contextLanguage) => {
  const res = await api.post("/content/chat", {
    message,
    contextLanguage,
  });
  return res.data;
};