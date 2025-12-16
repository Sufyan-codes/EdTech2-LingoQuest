// server.js
const dotenv = require("dotenv");
dotenv.config(); // ✅ LOAD ENV FIRST

const express = require("express");
const cors = require("cors");
const connectDB = require("./lingoquest-backend/config/db");


// Routes
const userRoutes = require("./lingoquest-backend/routes/userRoutes");
const contentRoutes = require("./lingoquest-backend/routes/contentRoutes");
const tutorRoutes = require("./lingoquest-backend/routes/tutorRoutes");
const lessonRoutes = require("./lingoquest-backend/routes/lessonRoutes");

// Connect DB
connectDB();

// ✅ CORS — ONCE, BEFORE ROUTES
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://edtech2-lingoquest-6w38.onrender.com",
    ],
    credentials: true,
  })
);


const app = express();


// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/lessons", lessonRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API running" });
});

// Root
app.get("/", (req, res) => {
  res.send("LingoQuest API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
