import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuizResults({ quizData = [], answers = {}, score }) {
  const navigate = useNavigate();
  const total = quizData.length;
  const correct = score ? score.correctAnswers : quizData.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="p-10 bg-[#FFF9EB] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl p-10 shadow-lg w-[600px] text-center">
        <h1 className="text-4xl font-bold mb-4">
          {score?.success ? "Quiz Completed 🎉" : "Quiz Completed"}
        </h1>
        
        {score && (
          <div className="mb-4">
            <p className="text-2xl mb-2">
              You scored <span className="font-bold">{correct}</span> out of <span className="font-bold">{total}</span>
            </p>
            <p className="text-lg text-gray-600">
              Score: {(score.score * 100).toFixed(1)}%
            </p>
            {score.pointsAwarded > 0 && (
              <p className="text-lg text-green-600 font-semibold">
                +{score.pointsAwarded} points earned!
              </p>
            )}
            {score.streakUpdated && (
              <p className="text-lg text-orange-600 font-semibold">
                Streak updated! 🔥
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col space-y-4 mt-6">
          <button 
            onClick={() => navigate('/lessons')} 
            className="w-full bg-teal-500 text-white py-3 rounded-xl text-lg"
          >
            Back to Lessons
          </button>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-[#FF7262] text-white py-3 rounded-xl text-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}