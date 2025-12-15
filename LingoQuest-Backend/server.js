// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./lingoquest-backend/config/db');

const userRoutes = require("./lingoquest-backend/routes/userRoutes");
const contentRoutes = require("./lingoquest-backend/routes/contentRoutes");
const tutorRoutes = require("./lingoquest-backend/routes/tutorRoutes");
const lessonRoutes = require("./lingoquest-backend/routes/lessonRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Mount all routes with correct prefixes
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/tutor', tutorRoutes);        // ✅ ADD THIS LINE
app.use('/api/lessons', lessonRoutes);

// Welcome Route
app.get('/', (req, res) => {
  res.send('LingoQuest API is running...');
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});