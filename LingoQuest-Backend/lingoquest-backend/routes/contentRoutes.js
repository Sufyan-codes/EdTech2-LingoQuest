const express = require("express");
const {
  createLesson,
  createQuiz,
  getLessonsByLanguage,
  getLessonById,
  getQuizByLessonId,
  submitQuiz,
  handleAIChat,
  getAllLessons,              // ✅ add this
} = require("../controllers/contentController");
const { protect, tutor } = require("../middleware/authMiddleware");

const router = express.Router();

// ADD THIS ROUTE — frontend needs it!
router.get("/lessons", protect, getAllLessons);   // ✅ FIX

// AI Chat
router.post("/chat", protect, handleAIChat);

// Tutor-only routes
router.post("/lessons", protect, tutor, createLesson);
router.post("/quizzes", protect, tutor, createQuiz);

// Learner routes
router.get("/lessons/language/:language", protect, getLessonsByLanguage);
router.get("/lessons/:lessonId", protect, getLessonById);
router.get("/lessons/:lessonId/vocab", protect, (req, res) => {
  res.json({ vocab: [] });
});
router.get("/lessons/:lessonId/discussion", protect, (req, res) => {
  res.json({ discussion: [] });
});
router.post("/lessons/:lessonId/progress", protect, (req, res) => {
  res.json({ success: true, progress: req.body.progress });
});

router.get("/quizzes/:lessonId", protect, getQuizByLessonId);
router.post("/quizzes/:lessonId/submit", protect, submitQuiz);

// Courses routes
router.get("/courses/:courseId", protect, (req, res) => {
  res.json({ course: { title: "Language Course", totalLessons: 10 } });
});
router.get("/courses/:courseId/lessons", protect, (req, res) => {
  res.json({ lessons: [] });
});

module.exports = router;
