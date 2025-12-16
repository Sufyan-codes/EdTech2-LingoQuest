// controllers/userController.js
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');
const Lesson = require('../models/LessonModel');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, targetLanguage, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      targetLanguage: targetLanguage || 'English',
      role: role || 'Learner',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        targetLanguage: user.targetLanguage,
        role: user.role,
        // ✅ FIXED: Send full user for token signing
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        targetLanguage: user.targetLanguage,
        role: user.role,
        // ✅ FIXED: Send full user for token signing
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields from request body
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    // Handle nested profile object (for onboarding)
    if (req.body.profile?.language) {
      user.targetLanguage = req.body.profile.language;
    } else if (req.body.targetLanguage) {
      user.targetLanguage = req.body.targetLanguage;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      targetLanguage: updatedUser.targetLanguage,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

// @desc    Get dashboard data for authenticated user
// @route   GET /api/users/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const targetLanguage = user.targetLanguage;
    const totalLessons = await Lesson.countDocuments({ targetLanguage });
    const completedCount = user.completedLessons.length;

    const progressPercentage =
      totalLessons > 0
        ? parseFloat(((completedCount / totalLessons) * 100).toFixed(1))
        : 0;

    const allLessons = await Lesson.find({ targetLanguage }).sort({ createdAt: 1 });
    const nextLesson = allLessons.find(
      (lesson) => !user.completedLessons.includes(lesson._id)
    );

    res.json({
      name: user.name,
      targetLanguage: user.targetLanguage,
      points: user.points,
      streak: user.streak,
      progress: {
        targetLanguage: targetLanguage,
        completed: completedCount,
        total: totalLessons,
        percentage: progressPercentage,
      },
      nextLesson: nextLesson
        ? {
            id: nextLesson._id,
            title: nextLesson.title,
            videoUrl: nextLesson.videoUrl,
          }
        : null,
    });
  } catch (error) {
    console.error('Dashboard Fetch Error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};

module.exports = {
  registerUser,
  authUser,
  updateUserProfile,
  getDashboardData,
};
