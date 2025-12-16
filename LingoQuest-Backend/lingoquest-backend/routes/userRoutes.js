// routes/userRoutes.js
const express = require('express');
const { 
  registerUser, 
  authUser, 
  updateUserProfile, 
  getDashboardData 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Private routes (requires token)
router.patch('/profile', protect, updateUserProfile);
router.get('/dashboard', protect, getDashboardData);

module.exports = router;