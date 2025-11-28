// src/Pages/Dashboard/Dashboard/Lessons/LessonPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getLessonById, submitQuiz } from "../../../../services/contentService";

// ✅ YouTube embed helpers
function isYouTube(url = "") {
  return /youtube\.com|youtu\.be/.test(url);
}

function getYouTubeEmbed(url = "") {
  const idMatch = url.match(/(v=|\/)([A-Za-z0-9_-]{11})/);
  const id = idMatch ? idMatch[2] : null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const fetchLesson = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching lesson:", lessonId);
      const data = await getLessonById(lessonId);
      console.log("Lesson data:", data);
      
      setLesson(data);
      setQuiz(data.quiz);
    } catch (err) {
      console.error("Lesson fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleQuizSubmit = async () => {
    if (!quiz || quizSubmitted) return;

    const answers = quiz.questions.map((_, index) => ({
      questionIndex: index,
      selectedOptionIndex: selectedAnswers[index] ?? 0
    }));

    try {
      const result = await submitQuiz(lessonId, answers);
      setQuizResult(result);
      setQuizSubmitted(true);

      if (result.success) {
        alert(`Congratulations! Score: ${result.correctAnswers}/${result.totalQuestions}`);
      }
    } catch (err) {
      console.error("Quiz submit error:", err);
      alert("Failed to submit quiz");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] p-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-96 bg-white rounded-2xl mb-6"></div>
          <div className="h-64 bg-white rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <h3 className="font-semibold mb-2">Error Loading Lesson</h3>
            <p>{error}</p>
            <button
              onClick={fetchLesson}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] p-6">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-gray-600">Lesson not found</p>
          <Link to="/lessons" className="text-[#2EA148] underline mt-4 inline-block">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  const videoUrl = lesson.videoUrl;
  const isYouTubeVideo = isYouTube(videoUrl);
  const embedUrl = isYouTubeVideo ? getYouTubeEmbed(videoUrl) : null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] p-6">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-[#0E4E49]">{lesson.title}</h1>
        <Link to="/lessons" className="bg-[#FF8F87] text-white px-4 py-2 rounded-lg">
          ← Back to Lessons
        </Link>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <main className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
            <div className="w-full h-64 lg:h-96 bg-gray-900">
              {videoUrl ? (
                isYouTubeVideo && embedUrl ? (
                  <iframe
                    title="lesson-video"
                    src={embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video 
                    controls 
                    className="w-full h-full object-contain"
                    src={videoUrl}
                  >
                    Your browser does not support video playback.
                  </video>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>No video available</p>
                </div>
              )}
            </div>

            {/* Lesson Notes */}
            <div className="p-6 border-t">
              <h3 className="font-semibold text-[#0E4E49] mb-2">Lesson Description</h3>
              <p className="text-sm text-gray-600">
                {lesson.textNotes || "No description available"}
              </p>
            </div>
          </div>

          {/* Quiz Section */}
          {quiz && quiz.questions && quiz.questions.length > 0 && (
            <section className="bg-white rounded-2xl border p-6 shadow-sm">
              <h4 className="font-semibold text-[#0E4E49] mb-4">Lesson Quiz</h4>

              <div className="space-y-6">
                {quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="border-b pb-4 last:border-0">
                    <p className="font-medium text-[#0E4E49] mb-3">
                      {qIndex + 1}. {q.questionText}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => {
                        const isSelected = selectedAnswers[qIndex] === oIndex;
                        
                        return (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswerSelect(qIndex, oIndex)}
                            disabled={quizSubmitted}
                            className={`w-full text-left p-3 rounded-lg border transition ${
                              isSelected 
                                ? "border-[#66C9B8] bg-[#F0FBF9]" 
                                : "border-[#D6E7E2] bg-white hover:bg-gray-50"
                            } ${quizSubmitted ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleQuizSubmit}
                  disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
                  className="flex-1 bg-[#FF8F87] text-white py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#FF7262] transition"
                >
                  {quizSubmitted ? "Quiz Submitted" : "Submit Quiz"}
                </button>
                
                {!quizSubmitted && (
                  <button
                    onClick={() => setSelectedAnswers({})}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                  >
                    Reset
                  </button>
                )}
              </div>

              {quizResult && (
                <div className={`mt-4 p-4 rounded-lg ${
                  quizResult.success ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
                }`}>
                  <p className="font-semibold">{quizResult.message}</p>
                  <p className="text-sm mt-1">
                    Score: {quizResult.correctAnswers}/{quizResult.totalQuestions} 
                    ({(quizResult.score * 100).toFixed(0)}%)
                  </p>
                  {quizResult.pointsAwarded > 0 && (
                    <p className="text-sm">+{quizResult.pointsAwarded} XP earned!</p>
                  )}
                </div>
              )}
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border p-4 shadow-sm">
            <h4 className="font-semibold mb-3">Lesson Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Level</span>
                <span className="font-medium">{lesson.level || "Beginner"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-medium">{lesson.targetLanguage}</span>
              </div>
              {quiz && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz Questions</span>
                  <span className="font-medium">{quiz.questions?.length || 0}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}