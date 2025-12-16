// controllers/contentController.js
const Lesson = require("../models/LessonModel");
const Quiz = require("../models/QuizModel");
const User = require("../models/UserModel");
const axios = require("axios");

/* ----------------------------
   GET ALL LESSONS (NEW - FIXED)
----------------------------- */
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate('tutor', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ 
      items: lessons,
      total: lessons.length 
    });
  } catch (error) {
    console.error("getAllLessons error:", error);
    return res.status(500).json({
      message: "Server error fetching lessons",
      error: error.message,
    });
  }
};

/* ----------------------------
   CREATE LESSON (Tutor only)
----------------------------- */
const createLesson = async (req, res) => {
  const { title, targetLanguage, level, videoUrl, textNotes } = req.body;

  try {
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: "Lesson title is required" });
    }

    if (!videoUrl) {
      return res.status(400).json({ message: "Video URL is required" });
    }

    const lesson = await Lesson.create({
      title,
      targetLanguage: targetLanguage || "English",
      level: level || "Beginner",
      videoUrl,
      textNotes: textNotes || "",
      tutor: req.user._id,
    });

    return res.status(201).json({ 
      success: true,
      lesson: {
        id: lesson._id,
        _id: lesson._id,
        title: lesson.title,
        targetLanguage: lesson.targetLanguage,
        level: lesson.level,
        videoUrl: lesson.videoUrl,
        textNotes: lesson.textNotes,
        createdAt: lesson.createdAt,
        status: 'published'
      }
    });
  } catch (error) {
    console.error("createLesson error:", error);
    return res.status(400).json({
      message: "Error creating lesson",
      error: error.message,
    });
  }
};

/* ----------------------------
   GET LESSON BY ID
----------------------------- */
const getLessonById = async (req, res) => {
  const lessonId = req.params.lessonId;

  try {
    const lesson = await Lesson.findById(lessonId)
      .populate('tutor', 'name email')
      .lean();

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Fetch associated quiz if exists
    const quiz = await Quiz.findOne({ lesson: lessonId }).lean();
    
    // Return lesson with quiz data
    return res.json({ 
      ...lesson,
      quiz: quiz ? {
        _id: quiz._id,
        title: quiz.title,
        questions: quiz.questions.map((q) => ({
          questionText: q.questionText,
          options: q.options,
        })),
        pointsAwarded: quiz.pointsAwarded
      } : null,
      vocab: [], // Add vocabulary if you have it
      discussion: [] // Add discussion if you have it
    });
  } catch (error) {
    console.error("getLessonById error:", error);
    return res.status(500).json({
      message: "Server error fetching lesson",
      error: error.message,
    });
  }
};

/* ----------------------------
   GET LESSONS BY LANGUAGE
----------------------------- */
const getLessonsByLanguage = async (req, res) => {
  const language = req.params.language;

  try {
    const lessons = await Lesson.find({ targetLanguage: language })
      .populate('tutor', 'name email')
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ lessons });
  } catch (error) {
    console.error("getLessonsByLanguage error:", error);
    return res.status(500).json({
      message: "Server error fetching lessons",
      error: error.message,
    });
  }
};

/* ----------------------------
   CREATE QUIZ (Tutor only)
----------------------------- */
const createQuiz = async (req, res) => {
  const { title, lessonId, questions, pointsAwarded } = req.body;

  try {
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Ensure tutor owns lesson
    if (lesson.tutor && req.user && lesson.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not own this lesson" });
    }

    const existingQuiz = await Quiz.findOne({ lesson: lessonId });
    if (existingQuiz) {
      return res.status(400).json({ message: "This lesson already has a quiz" });
    }

    const quiz = await Quiz.create({
      title: title || `${lesson.title} - Quiz`,
      lesson: lessonId,
      questions,
      pointsAwarded: pointsAwarded || 10,
    });

    return res.status(201).json({ 
      success: true,
      quiz 
    });
  } catch (error) {
    console.error("createQuiz error:", error);
    return res.status(400).json({
      message: "Error creating quiz",
      error: error.message,
    });
  }
};

/* ----------------------------
   GET QUIZ BY LESSON ID
----------------------------- */
const getQuizByLessonId = async (req, res) => {
  const lessonId = req.params.lessonId;

  try {
    const quiz = await Quiz.findOne({ lesson: lessonId }).lean();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const quizResponse = {
      _id: quiz._id,
      title: quiz.title,
      lesson: quiz.lesson,
      pointsAwarded: quiz.pointsAwarded,
      questions: quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
      })),
    };

    return res.json(quizResponse);
  } catch (error) {
    console.error("getQuizByLessonId error:", error);
    return res.status(500).json({
      message: "Server error fetching quiz",
      error: error.message,
    });
  }
};

/* ----------------------------
   QUIZ SUBMISSION / GRADING
----------------------------- */
const submitQuiz = async (req, res) => {
  const lessonId = req.params.lessonId;
  const { answers } = req.body;
  const userId = req.user ? req.user._id : null;

  const MIN_PASS_SCORE = 0.7;

  try {
    const quiz = await Quiz.findOne({ lesson: lessonId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.completedLessons && user.completedLessons.includes(lessonId)) {
      return res.json({
        message: "Quiz already completed",
        success: true,
        score: 1.0,
        correctAnswers: quiz.questions.length,
        totalQuestions: quiz.questions.length,
        pointsAwarded: 0,
      });
    }

    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    (answers || []).forEach((submission) => {
      const q = quiz.questions[submission.questionIndex];
      if (q && typeof q.correctOptionIndex !== "undefined" && q.correctOptionIndex === submission.selectedOptionIndex) {
        correctAnswers++;
      }
    });

    const score = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
    let pointsAwarded = 0;
    let streakUpdated = false;

    if (score >= MIN_PASS_SCORE) {
      pointsAwarded = quiz.pointsAwarded || 0;
      user.points = (user.points || 0) + pointsAwarded;

      user.completedLessons = user.completedLessons || [];
      user.completedLessons.push(lessonId);

      user.streak = (user.streak || 0) + 1;
      streakUpdated = true;

      await user.save();
    }

    return res.json({
      success: score >= MIN_PASS_SCORE,
      score: Number(score.toFixed(2)),
      correctAnswers,
      totalQuestions,
      pointsAwarded,
      streakUpdated,
      message: score >= MIN_PASS_SCORE ? "Congratulations! Lesson complete." : "Keep practicing!",
    });
  } catch (error) {
    console.error("submitQuiz error:", error);
    return res.status(500).json({
      message: "Error processing quiz submission",
      error: error.message,
    });
  }
};

/* ----------------------------
   AI CHATBOT (optional)
----------------------------- */
const handleAIChat = async (req, res) => {
  const { message, contextLanguage } = req.body;

  if (!message || !contextLanguage) {
    return res.status(400).json({
      message: "Message and contextLanguage are required",
    });
  }

  const systemPrompt = `
    You are LingoQuest, a friendly expert language tutor.
    Help the user practice ${contextLanguage} with clear explanations,
    contextual meaning, and optional examples.
    Keep responses short and highly educational.
  `;

  const aiPayload = {
    model: "gemini-flash",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.5,
  };

  try {
    const response = await axios.post(process.env.AI_SERVICE_URL, aiPayload, {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const aiResponseText = response.data?.choices?.[0]?.message?.content || response.data;
    return res.json({ response: aiResponseText });
  } catch (error) {
    console.error("AI Chat Error:", error && error.message ? error.message : error);
    return res.status(500).json({
      message: "Failed to reach AI service",
      error: error.message,
    });
  }
};

/* ----------------------------
   EXPORTED CONTROLLERS
----------------------------- */
module.exports = {
  createLesson,
  getLessonById,
  getLessonsByLanguage,
  createQuiz,
  getQuizByLessonId,
  submitQuiz,
  handleAIChat,
  getAllLessons, // ✅ EXPORTED
};