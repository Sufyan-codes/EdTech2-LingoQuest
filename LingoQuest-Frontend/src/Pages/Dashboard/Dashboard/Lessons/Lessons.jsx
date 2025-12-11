// src/Pages/Dashboard/Dashboard/Lessons/Lessons.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLessons } from "../../../../services/contentService";
import { useAuth } from "../../../../context/AuthContext";



export default function Lessons() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function loadLessons() {
      setLoading(true);
      setError(null);

      try {
        const lessonsData = await getLessons();
        if (mounted) {
          // normalize items to expected shape
          const normalized = Array.isArray(lessonsData)
            ? lessonsData
            : (lessonsData.items || []);
          setLessons(normalized);
        }
      } catch (err) {
        console.error("Lessons load error:", err);
        if (mounted) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Failed to load lessons"
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadLessons();
    return () => (mounted = false);
  }, [user]);

  if (loading) return <div className="p-8">Loading lessons…</div>;
  if (error)
    return (
      <div className="p-8 text-red-600">
        Error loading lessons: {error}
        <div className="mt-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen  bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Language Lessons</h1>
            <p className="text-sm text-gray-600">
              Available lessons in {user?.targetLanguage || "your target language"}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#FF8F87] text-white px-4 py-2 rounded-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {lessons.length === 0 && (
            <div className="p-4 bg-white rounded shadow">No lessons available for this language.</div>
          )}

          {lessons.map((lesson) => (
            <article
              key={lesson._id || lesson.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                <div className="text-sm text-gray-500">
                  Level: {lesson.level || lesson.difficulty || "Beginner"} • Language: {lesson.targetLanguage || lesson.language}
                </div>
                {lesson.textNotes && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {lesson.textNotes.substring(0, 100)}...
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/lessons/${lesson._id || lesson.id}`} className="px-4 py-2 bg-[#4ECDC4] text-white rounded-lg">
                  Open
                </Link>
                <button
                  onClick={() => navigate(`/lessons/${lesson._id || lesson.id}`)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  ▶
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
