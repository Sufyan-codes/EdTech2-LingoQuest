// src/pages/Tutors/TutorDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { 
  saveLesson, 
  getRecentLessons, 
  getTutorStats 
} from "../../services/tutorApi";
import heroImg from "../../assets/Hero image.svg";

export default function TutorDashboard() {
  // Stats from backend
  const [stats, setStats] = useState({
    activeStudents: 0,
    totalLessons: 0,
    completionRate: "0%",
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Form state
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [videoUrl, setVideoUrl] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [keywords, setKeywords] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Quiz builder
  const [questions, setQuestions] = useState([]);
  
  // Recent lessons
  const [recent, setRecent] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);

  // Drag/drop
  const dropRef = useRef();

  // Load initial data
  useEffect(() => {
    loadStats();
    loadRecentLessons();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getTutorStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const loadRecentLessons = async () => {
    try {
      const lessons = await getRecentLessons(10);
      setRecent(lessons);
    } catch (error) {
      console.error("Failed to load recent lessons:", error);
    } finally {
      setLoadingLessons(false);
    }
  };

  // Drag & drop setup
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    
    const prevent = (e) => { 
      e.preventDefault(); 
      e.stopPropagation(); 
    };
    
    const onDrop = (e) => {
      prevent(e);
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) setFile(f);
    };
    
    el.addEventListener("dragenter", prevent);
    el.addEventListener("dragover", prevent);
    el.addEventListener("drop", onDrop);
    
    return () => {
      el.removeEventListener("dragenter", prevent);
      el.removeEventListener("dragover", prevent);
      el.removeEventListener("drop", onDrop);
    };
  }, []);

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setFile(f);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (!keywords.includes(t)) setKeywords((k) => [...k, t]);
    setTagInput("");
  };

  const removeTag = (t) => setKeywords((k) => k.filter((x) => x !== t));

  // Quiz helpers
  const addQuestion = () => {
    setQuestions((q) => [
      ...q, 
      { id: Date.now(), question: "", options: ["", ""], answerIndex: 0 }
    ]);
  };

  const updateQuestion = (id, patch) => {
    setQuestions((q) => q.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeQuestion = (id) => {
    setQuestions((q) => q.filter((item) => item.id !== id));
  };

  const addOption = (id) => {
    const q = questions.find((x) => x.id === id);
    if (!q) return;
    updateQuestion(id, { options: [...q.options, ""] });
  };

  const updateOption = (id, idx, val) => {
    const q = questions.find((x) => x.id === id);
    if (!q) return;
    const newOpts = [...q.options];
    newOpts[idx] = val;
    updateQuestion(id, { options: newOpts });
  };

  const onPublish = async (publish = true) => {
    if (!title) {
      setMessage({ type: "error", text: "Please provide a lesson title." });
      return;
    }

    if (!videoUrl) {
      setMessage({ type: "error", text: "Please provide a video URL (YouTube, Vimeo, etc.)" });
      return;
    }

    setSaving(true);
    setMessage(null);

    const lessonData = {
      title,
      description,
      category,
      difficulty,
      keywords,
      videoUrl,
      targetLanguage,
      quiz: questions.map((q) => ({
        question: q.question,
        options: q.options,
        answerIndex: q.answerIndex,
      })),
    };

    try {
      const res = await saveLesson(lessonData, publish);
      const savedLesson = res.lesson;

      // Update recent list
      setRecent((r) => [savedLesson, ...r].slice(0, 10));
      
      setMessage({ 
        type: "success", 
        text: publish ? "Lesson published successfully!" : "Lesson saved as draft." 
      });

      // Reset form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setKeywords([]);
      setTagInput("");
      setQuestions([]);
      setFile(null);
      setCategory("Beginner");
      setDifficulty("Beginner");

      // Refresh stats
      loadStats();
    } catch (err) {
      console.error("Save lesson error:", err);
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to save lesson. Please try again." 
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0]  p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-[#0E4E49]">Tutor Dashboard</h1>
          <p className="text-teal-600 mt-2">Manage your lessons, track student progress, and grow your teaching impact</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl p-4 border border-teal-100 bg-white">
            <div className="text-sm text-[#0E4E49]">Active Students</div>
            <div className="text-2xl font-bold">
              {loadingStats ? "..." : stats.activeStudents}
            </div>
            <div className="text-xs text-teal-400 mt-1">Enrolled learners</div>
          </div>
          <div className="rounded-2xl p-4 border border-teal-100 bg-white">
            <div className="text-sm text-[#0E4E49]">Total Lessons</div>
            <div className="text-2xl font-bold">
              {loadingStats ? "..." : stats.totalLessons}
            </div>
            <div className="text-xs text-teal-400 mt-1">Published content</div>
          </div>
          <div className="rounded-2xl p-4 border border-teal-100 bg-white">
            <div className="text-sm text-[#0E4E49]">Completion Rate</div>
            <div className="text-2xl font-bold">
              {loadingStats ? "..." : stats.completionRate}
            </div>
            <div className="text-xs text-teal-400 mt-1">Student progress</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main form */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white border border-teal-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Upload New Lesson</h2>

              <div
                ref={dropRef}
                className="border-2 border-dashed border-teal-200 rounded-md p-8 text-center mb-6"
                style={{ minHeight: 160 }}
              >
                <div className="mx-auto max-w-lg">
                  <div className="text-3xl text-teal-400 mb-2">⬆</div>
                  <div className="text-lg font-semibold text-[#0E4E49] mb-1">Upload Video Lesson</div>
                  <div className="text-sm text-gray-500 mb-3">
                    Drag and drop your video file here, or click to browse
                  </div>

                  <div>
                    <label className="inline-block bg-[#FF7262] text-white px-4 py-2 rounded-full cursor-pointer">
                      Choose File
                      <input type="file" accept="video/*" className="hidden" onChange={onFileChange} />
                    </label>
                  </div>

                  {file && (
                    <div className="mt-3 text-sm text-gray-700">
                      Selected: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-teal-100 rounded px-3 py-2"
                    placeholder="e.g., French Pronunciation Basics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
                  <select 
                    value={targetLanguage} 
                    onChange={(e) => setTargetLanguage(e.target.value)} 
                    className="w-full border border-teal-100 rounded px-3 py-2"
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Chinese</option>
                    <option>Yoruba</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL *</label>
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full border border-teal-100 rounded px-3 py-2"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo, or direct video link</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={4} 
                  className="w-full border border-teal-100 rounded px-3 py-2" 
                  placeholder="Describe what students will learn" 
                />
              </div>

              <div className="flex gap-4 items-start mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <div className="flex gap-2 items-center">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { 
                        if (e.key === "Enter") { 
                          e.preventDefault(); 
                          addTag(); 
                        } 
                      }}
                      className="flex-1 border border-teal-100 rounded px-3 py-2"
                      placeholder="e.g., greetings, intro, pronunciation"
                    />
                    <button onClick={addTag} type="button" className="px-3 py-2 border rounded text-sm">
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {keywords.map((k) => (
                      <span 
                        key={k} 
                        className="px-3 py-1 bg-[#F0FFFB] border border-teal-100 rounded-full text-sm flex items-center gap-2"
                      >
                        <span>{k}</span>
                        <button onClick={() => removeTag(k)} className="text-xs text-gray-400">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ minWidth: 180 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)} 
                    className="w-full border border-teal-100 rounded px-3 py-2"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              {/* Quiz builder */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Quiz (optional)</h3>
                  <button onClick={addQuestion} className="px-3 py-1 bg-teal-100 rounded">
                    + Add Question
                  </button>
                </div>

                <div className="space-y-3">
                  {questions.length === 0 && (
                    <div className="text-sm text-gray-500">
                      No questions yet. Add one to create a quiz for this lesson.
                    </div>
                  )}

                  {questions.map((q, qi) => (
                    <div key={q.id} className="border border-teal-50 rounded p-3 bg-[#FFFDFB]">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">Q{qi + 1}</div>
                        <button 
                          onClick={() => removeQuestion(q.id)} 
                          className="text-sm text-red-500"
                        >
                          Remove
                        </button>
                      </div>

                      <input 
                        value={q.question} 
                        onChange={(e) => updateQuestion(q.id, { question: e.target.value })} 
                        placeholder="Question text" 
                        className="w-full border border-teal-100 rounded px-2 py-1 mb-2" 
                      />

                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex gap-2 items-center">
                            <input 
                              type="radio" 
                              name={`answer-${q.id}`} 
                              checked={q.answerIndex === oi} 
                              onChange={() => updateQuestion(q.id, { answerIndex: oi })} 
                            />
                            <input 
                              value={opt} 
                              onChange={(e) => updateOption(q.id, oi, e.target.value)} 
                              className="flex-1 border border-teal-100 rounded px-2 py-1" 
                              placeholder={`Option ${oi + 1}`} 
                            />
                          </div>
                        ))}
                        <button 
                          onClick={() => addOption(q.id)} 
                          className="text-sm text-teal-600"
                        >
                          + Add option
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4">
                <button 
                  disabled={saving} 
                  onClick={() => onPublish(true)} 
                  className="flex-1 bg-[#FF7262] text-white py-3 rounded-full font-semibold disabled:bg-gray-400"
                >
                  {saving ? "Saving..." : "Publish Lesson"}
                </button>
                <button 
                  disabled={saving} 
                  onClick={() => onPublish(false)} 
                  className="px-4 py-3 border rounded-full disabled:border-gray-300"
                >
                  Save as Draft
                </button>
              </div>

              {message && (
                <div 
                  className={`mt-4 p-3 rounded ${
                    message.type === "error" 
                      ? "bg-red-50 text-red-700" 
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </section>

            {/* Recent lessons */}
            <section className="bg-white border border-teal-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Your Recent Lessons</h3>

              {loadingLessons && (
                <div className="text-sm text-gray-500">Loading lessons...</div>
              )}

              {!loadingLessons && recent.length === 0 && (
                <div className="text-sm text-gray-500">No lessons published yet.</div>
              )}

              <div className="space-y-3">
                {recent.map((r) => (
                  <div key={r.id} className="flex items-center justify-between border-t pt-3">
                    <div>
                      <div className="font-semibold text-[#0E4E49]">
                        {r.title || "Untitled Lesson"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""} • {r.status || "published"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-teal-600">View</button>
                      <button className="text-sm text-gray-400">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: hero image + widgets */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-teal-100 p-4 shadow-sm">
              <img src={heroImg} alt="hero" className="rounded-lg w-full object-cover" />
            </div>

            <div className="bg-white rounded-2xl border border-teal-100 p-4">
              <h4 className="font-semibold mb-3">Quick Stats</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-semibold">{stats.activeStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Published Lessons</span>
                  <span className="font-semibold">{stats.totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold">{stats.completionRate}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}