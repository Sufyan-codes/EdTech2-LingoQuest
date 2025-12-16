// routes/lessonRoutes.js
const express = require("express");
const Lesson = require("../models/LessonModel");

const router = express.Router();

// GET all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json({ items: lessons });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lessons" });
  }
});

// GET single lesson
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Error getting lesson" });
  }
});

module.exports = router;
