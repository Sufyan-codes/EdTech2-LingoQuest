import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuizResults({ quizData = [], answers = {}, score }) {
  const navigate = useNavigate();
  const total = quizData.length;
  const correct = score
    ? score.correctAnswers
    : quizData.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="min-h-screen bg-[#FFF9EB] flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 sm:p-8 md:p-10 text-center">
        {/* Title */}
        <h1
          className="font-bold mb-4"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)", // fluid title
          }}
        >
          {score?.success ? "Quiz Completed 🎉" : "Quiz Completed"}
        </h1>

        {score && (
          <div className="mb-4 space-y-2">
            <p
              className="font-medium"
              style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
            >
              You scored{" "}
              <span className="font-bold">{correct}</span> out of{" "}
              <span className="font-bold">{total}</span>
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
              Score: {(score.score * 100).toFixed(1)}%
            </p>

            {score.pointsAwarded > 0 && (
              <p className="text-green-600 font-semibold text-sm sm:text-base">
                +{score.pointsAwarded} points earned!
              </p>
            )}

            {score.streakUpdated && (
              <p className="text-orange-600 font-semibold text-sm sm:text-base">
                Streak updated! 🔥
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => navigate("/lessons")}
            className="w-full bg-teal-500 text-white py-3 rounded-xl text-base sm:text-lg"
          >
            Back to Lessons
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[#FF7262] text-white py-3 rounded-xl text-base sm:text-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
