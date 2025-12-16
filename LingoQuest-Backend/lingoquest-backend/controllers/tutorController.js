// controllers/tutorController.js
const Lesson = require('../models/LessonModel');
const Quiz = require('../models/QuizModel');
const User = require('../models/UserModel');

// @desc    Get tutor dashboard stats
// @route   GET /api/tutor/stats
// @access  Private (Tutor only)
const getTutorStats = async (req, res) => {
  try {
    const tutorId = req.user._id;

    // Count lessons created by this tutor
    const totalLessons = await Lesson.countDocuments({ tutor: tutorId });

    // Count students who have completed at least one of tutor's lessons
    const tutorLessons = await Lesson.find({ tutor: tutorId }).select('_id');
    const lessonIds = tutorLessons.map(l => l._id);
    
    const studentsWithCompletions = await User.find({
      completedLessons: { $in: lessonIds },
      role: 'Learner'
    }).countDocuments();

    // Calculate average completion rate (simplified)
    const allStudents = await User.find({ role: 'Learner' });
    let totalCompletions = 0;
    allStudents.forEach(student => {
      const completedByStudent = student.completedLessons.filter(id => 
        lessonIds.some(lid => lid.toString() === id.toString())
      ).length;
      totalCompletions += completedByStudent;
    });

    const completionRate = totalLessons > 0 && allStudents.length > 0
      ? Math.round((totalCompletions / (totalLessons * allStudents.length)) * 100)
      : 0;

    res.json({
      activeStudents: studentsWithCompletions,
      totalLessons,
      completionRate: `${completionRate}%`,
    });
  } catch (error) {
    console.error('Tutor stats error:', error);
    res.status(500).json({ message: 'Error fetching tutor statistics' });
  }
};

// @desc    Create a new lesson
// @route   POST /api/tutor/lessons
// @access  Private (Tutor only)
const createLesson = async (req, res) => {
  try {
    const { title, description, category, difficulty, keywords, videoUrl, targetLanguage } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Lesson title is required' });
    }

    if (!videoUrl) {
      return res.status(400).json({ message: 'Video URL is required' });
    }

    // Map category to level if needed
    const level = category || difficulty || 'Beginner';

    const lesson = await Lesson.create({
      title,
      targetLanguage: targetLanguage || 'English',
      level,
      videoUrl,
      textNotes: description || '',
      tutor: req.user._id,
      // Store additional metadata
      metadata: {
        category,
        difficulty,
        keywords: keywords || [],
        description
      }
    });

    res.status(201).json({
      success: true,
      lesson: {
        id: lesson._id,
        title: lesson.title,
        targetLanguage: lesson.targetLanguage,
        level: lesson.level,
        videoUrl: lesson.videoUrl,
        createdAt: lesson.createdAt,
        status: 'published'
      }
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Error creating lesson', error: error.message });
  }
};

// @desc    Create quiz for a lesson
// @route   POST /api/tutor/lessons/:lessonId/quiz
// @access  Private (Tutor only)
const createQuizForLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { questions, pointsAwarded } = req.body;

    // Verify lesson exists and belongs to tutor
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (lesson.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add quiz to this lesson' });
    }

    // Check if quiz already exists for this lesson
    const existingQuiz = await Quiz.findOne({ lesson: lessonId });
    if (existingQuiz) {
      return res.status(400).json({ message: 'Quiz already exists for this lesson. Use update instead.' });
    }

    // Transform questions to match schema
    const formattedQuestions = questions.map(q => ({
      questionText: q.question,
      options: q.options,
      correctOptionIndex: q.answerIndex || 0
    }));

    const quiz = await Quiz.create({
      title: `${lesson.title} - Quiz`,
      lesson: lessonId,
      questions: formattedQuestions,
      pointsAwarded: pointsAwarded || 10
    });

    res.status(201).json({
      success: true,
      quiz: {
        id: quiz._id,
        title: quiz.title,
        questionCount: quiz.questions.length,
        pointsAwarded: quiz.pointsAwarded
      }
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

// @desc    Get tutor's recent lessons
// @route   GET /api/tutor/lessons/recent
// @access  Private (Tutor only)
const getRecentLessons = async (req, res) => {
  try {
    const tutorId = req.user._id;
    const limit = parseInt(req.query.limit) || 10;

    const lessons = await Lesson.find({ tutor: tutorId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title targetLanguage level videoUrl createdAt');

    const formattedLessons = lessons.map(lesson => ({
      id: lesson._id,
      title: lesson.title,
      targetLanguage: lesson.targetLanguage,
      level: lesson.level,
      videoUrl: lesson.videoUrl,
      createdAt: lesson.createdAt,
      status: 'published'
    }));

    res.json({
      success: true,
      lessons: formattedLessons
    });
  } catch (error) {
    console.error('Get recent lessons error:', error);
    res.status(500).json({ message: 'Error fetching recent lessons' });
  }
};

// @desc    Update a lesson
// @route   PUT /api/tutor/lessons/:lessonId
// @access  Private (Tutor only)
const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, description, category, difficulty, keywords, videoUrl, targetLanguage } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Verify ownership
    if (lesson.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this lesson' });
    }

    // Update fields
    if (title) lesson.title = title;
    if (targetLanguage) lesson.targetLanguage = targetLanguage;
    if (category || difficulty) lesson.level = category || difficulty;
    if (videoUrl) lesson.videoUrl = videoUrl;
    if (description) lesson.textNotes = description;

    await lesson.save();

    res.json({
      success: true,
      lesson: {
        id: lesson._id,
        title: lesson.title,
        targetLanguage: lesson.targetLanguage,
        level: lesson.level,
        videoUrl: lesson.videoUrl,
        createdAt: lesson.createdAt,
        updatedAt: lesson.updatedAt
      }
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ message: 'Error updating lesson' });
  }
};

// @desc    Delete a lesson
// @route   DELETE /api/tutor/lessons/:lessonId
// @access  Private (Tutor only)
const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Verify ownership
    if (lesson.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this lesson' });
    }

    await lesson.deleteOne();

    // Also delete associated quiz if exists
    await Quiz.deleteOne({ lesson: lessonId });

    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ message: 'Error deleting lesson' });
  }
};

module.exports = {
  getTutorStats,
  createLesson,
  createQuizForLesson,
  getRecentLessons,
  updateLesson,
  deleteLesson
};