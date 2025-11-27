// src/Pages/Dashboard/Dashboard/Lessons/LessonPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getLessonById, getQuizByLesson } from "../../../../services/contentService";

const FALLBACK_THUMBNAIL = "/mnt/data/Lesson screen.png";

function isYouTube(url = "") {
  return /youtube\.com|youtu\.be/.test(url);
}

function getYouTubeEmbed(url = "") {
  const idMatch = url.match(/(v=|\/)([A-Za-z0-9_-]{6,})/);
  const id = idMatch ? idMatch[2] : null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lesson, setLesson] = useState(null);
  const [vocab, setVocab] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [discussion, setDiscussion] = useState([]);
  const [course, setCourse] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // fetch lesson detail (should include videoUrl, textNotes, vocab, quiz etc if backend provided)
      const lessonData = await getLessonById(lessonId);
      setLesson(lessonData);
      setVocab(lessonData.vocab || []);
      setQuiz(lessonData.quiz || (await getQuizByLesson(lessonId)));
      setDiscussion(lessonData.discussion || []);

      // fetch user dashboard/progress
      const base = import.meta.env.VITE_API_BASE || "/api";
      const upRes = await fetch(`${base}/users/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (upRes.ok) {
        const upJson = await upRes.json();
        setUserProgress(upJson);
      }
      setLoading(false);
    } catch (err) {
      console.error("Lesson fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to load data");
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const submitQuiz = async () => {
    if (!quiz || selectedChoice == null) return;
    setQuizSubmitted(true);

    try {
      const baseURL = import.meta.env.VITE_API_BASE || "/api";
      const res = await fetch(`${baseURL}/content/quizzes/${lessonId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          answers: quiz.questions.map((q, idx) => ({
            questionIndex: idx,
            selectedOptionIndex: q.options.findIndex((opt) => opt === selectedChoice),
          })),
        }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        alert(`Correct! ${json.message || ""}`);
        fetchAll();
      } else {
        alert(json.message || "Quiz submit failed");
      }
    } catch (err) {
      console.error("Quiz submit error:", err);
      alert("Failed to submit quiz");
    } finally {
      setSavingProgress(false);
    }
  };

  const goToNextLesson = async () => {
    if (!lesson?.courseId) return;
    try {
      const baseURL = import.meta.env.VITE_API_BASE || "/api";
      const res = await fetch(`${baseURL}/content/courses/${lesson.courseId}/lessons`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) return;
      const json = await res.json();
      const list = json.lessons || [];
      const idx = list.findIndex((l) => (l.id || l._id) === lessonId);
      const next = list[idx + 1];
      if (next) navigate(`/lessons/${next.id || next._id}`);
      else alert("You've completed all lessons in this course!");
    } catch (err) {
      console.error("Next lesson error:", err);
    }
  };

  if (loading) return <div className="p-8">Loading lesson…</div>;
  if (error)
    return (
      <div className="p-8 text-red-600">
        Error: {error}
        <div className="mt-3">
          <button onClick={fetchAll} className="px-4 py-2 bg-red-500 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );

  const progressPercent = userProgress?.progress?.percentage || 0;
  const videoUrl = lesson?.videoUrl;

  return (
    <div className="min-h-screen  bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] p-6">
      <header className="flex items-center justify-between border-b pb-2 mb-6">
        <img src="/logo.svg" className="h-8" alt="logo" />
        <Link to="/dashboard" className="bg-[#FF8F87] text-white px-4 py-2 rounded-lg">
          Go to Dashboard
        </Link>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-[#0E4E49]">{lesson.title}</h2>
            <p className="text-sm text-gray-600">{course?.title}</p>
          </div>

          <div className="mt-3">
            <div className="w-full bg-[#4ECDC4] h-3 rounded-full overflow-hidden">
              <div className="h-3 bg-[#FF6B6B]" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="text-sm text-[#4EA79A] mt-2">{progressPercent}% Complete</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
              <div
                className="w-full h-64 lg:h-80 bg-gray-100 flex items-center justify-center"
                style={{
                  backgroundImage: `url("${lesson.thumbnailUrl || FALLBACK_THUMBNAIL}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {videoUrl ? (
                  isYouTube(videoUrl) ? (
                    <iframe
                      title="lesson-video"
                      src={getYouTubeEmbed(videoUrl)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls className="w-full h-full object-cover" src={videoUrl} />
                  )
                ) : (
                  <button onClick={() => alert("No lesson video provided")} className="bg-[#45BFB1] text-white px-4 py-2 rounded-lg shadow-lg">
                    ▶ Play Lesson
                  </button>
                )}
              </div>

              <div className="p-5 border-t border-[#E9F2EE]">
                <h3 className="font-semibold text-[#0E4E49]">Introduction</h3>
                <p className="text-sm text-[#6A7F7A] mt-2">{lesson.textNotes || "No description available"}</p>
              </div>
            </div>

            {/* Vocabulary */}
            <section className="bg-white rounded-2xl border p-4 shadow-sm">
              <h4 className="font-semibold text-[#0E4E49] mb-3">Key Vocabulary</h4>
              <div className="space-y-3">
                {vocab.length === 0 && <div className="text-sm text-gray-600">No vocabulary for this lesson.</div>}
                {vocab.map((v, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#FFF6F3] rounded-lg p-3">
                    <div>
                      <div className="text-[#FF8F87] font-semibold">{v.word}</div>
                      <div className="text-xs text-[#7B8D88]">{v.meaning}</div>
                    </div>
                    <div className="text-sm text-[#6DAEA4]">{v.phonetic}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quiz */}
            <section className="bg-white rounded-2xl border p-4 shadow-sm">
              <h4 className="font-semibold text-[#0E4E49] mb-3">Quick Quiz</h4>
              {quiz && quiz.questions && quiz.questions.length > 0 ? (
                <>
                  <p className="text-sm text-[#6A7F7A] mb-3">{quiz.questions[0].questionText || quiz.questions[0].question}</p>
                  <div className="space-y-3">
                    {quiz.questions[0].options.map((c, idx) => {
                      const selected = selectedChoice === c;
                      return (
                        <button
                          key={idx}
                          onClick={() => !quizSubmitted && setSelectedChoice(c)}
                          className={`w-full text-left p-3 rounded-lg border ${selected ? "border-[#66C9B8] bg-[#F0FBF9]" : "border-[#D6E7E2] bg-white"}`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button onClick={submitQuiz} className="flex-1 bg-[#FF8F87] text-white py-2 rounded-lg disabled:opacity-60" disabled={quizSubmitted || !selectedChoice || savingProgress}>
                      {savingProgress ? "Submitting..." : "Submit Answer"}
                    </button>
                    <button onClick={() => { setQuizSubmitted(false); setSelectedChoice(null); }} className="px-4 py-2 border rounded-lg">
                      Reset
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[#6A7F7A]">No quiz available for this lesson.</p>
              )}
            </section>

            <div className="flex items-center justify-between mt-6">
              <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg bg-white">
                Back
              </button>
              <button onClick={goToNextLesson} className="px-4 py-2 bg-[#FF8F87] text-white rounded-lg">
                Next Lesson ➜
              </button>
            </div>
          </main>

          {/* Right column */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border p-4 shadow-sm w-full">
              <h4 className="font-semibold">Your Progress</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#6A7F7A]">
                <li className="flex justify-between items-center">Video Watched <span className="text-green-500">✓</span></li>
                <li className="flex justify-between items-center">Notes Reviewed <span className="text-green-500">✓</span></li>
                <li className="flex justify-between items-center">Quiz Completed <span className="text-gray-400">{quizSubmitted ? "Done" : "In progress"}</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border p-4 shadow-sm w-full">
              <h4 className="font-semibold">Peer Discussion</h4>
              <div className="mt-3 space-y-3">
                {discussion.length === 0 && <div className="text-sm text-gray-600">No discussion yet — be the first!</div>}
                {discussion.map((c, i) => (
                  <div key={i} className="bg-[#FFF9F6] p-3 rounded-lg text-sm">
                    <div className="text-xs text-[#6A7F7A]">{c.author || c.user}: {c.text || c.message}</div>
                    <div className="text-xs text-[#9AAFA9] mt-1">{c.timeAgo || c.time || "recent"}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
