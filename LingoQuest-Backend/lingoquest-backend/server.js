// LOAD ENV FIRST
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./userRoutes");
const contentRoutes = require("./contentRoutes");
const tutorRoutes = require("./tutorRoutes");
const lessonRoutes = require("./lessonRoutes");

// Connect DB
connectDB();

const app = express();

// ✅ CORS FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://edtech2-lingoquest-6w38.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/lessons", lessonRoutes);

// Root
app.get("/", (req, res) => {
  res.send("LingoQuest API is running...");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
