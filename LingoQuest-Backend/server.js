const dotenv = require("dotenv");
dotenv.config();

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

// ✅ CREATE APP FIRST
const app = express();

// ✅ HANDLE PREFLIGHT REQUESTS (THIS IS THE MISSING PIECE)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://edtech2-lingoquest-01.netlify.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// ✅ CORS — BEFORE ROUTES
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://edtech2-lingoquest-01.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/lessons", lessonRoutes);

// Health
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

