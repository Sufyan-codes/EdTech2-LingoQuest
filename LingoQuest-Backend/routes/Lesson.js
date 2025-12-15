import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    level: { type: String, default: "Beginner" },
    targetLanguage: { type: String, required: true },
    textNotes: { type: String },
    videoUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
