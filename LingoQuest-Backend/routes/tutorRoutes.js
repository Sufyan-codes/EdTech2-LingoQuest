// routes/tutorRoutes.js
const express = require('express');
const {
  getTutorStats,
  createLesson,
  createQuizForLesson,
  getRecentLessons,
  updateLesson,
  deleteLesson
} = require('../controllers/tutorController');
const { protect, tutor } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication and tutor role
router.use(protect, tutor);

// Dashboard stats
router.get('/stats', getTutorStats);

// Lesson management
router.post('/lessons', createLesson);
router.get('/lessons/recent', getRecentLessons);
router.put('/lessons/:lessonId', updateLesson);
router.delete('/lessons/:lessonId', deleteLesson);

// Quiz management
router.post('/lessons/:lessonId/quiz', createQuizForLesson);

router.get("/tutor/recent", protect, tutor, async (req, res) => {
  try {
    const lessons = await Lesson.find({ tutor: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ lessons });
  } catch (err) {
    console.error("Recent lessons error:", err);
    res.status(500).json({ message: "Failed to load tutor lessons" });
  }
});


module.exports = router;