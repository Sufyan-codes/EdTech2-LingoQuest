import React from "react";

export default function QuizResults({ quizData, answers }) {
  const total = quizData.length;
  const correct = quizData.filter(
    (q, i) => answers[i] === q.answer
  ).length;

  return (
    <div className="p-10 bg-[#FFF9EB] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl p-10 shadow-lg w-[600px] text-center">
        <h1 className="text-4xl font-bold mb-4">Quiz Completed 🎉</h1>
        <p className="text-2xl mb-8">
          You scored <span className="font-bold">{correct}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>

        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-teal-500 text-white py-3 rounded-xl text-lg"
          >
            Retry Quiz
          </button>

          <button
            onClick={() => alert("Go to next topic")}
            className="w-full bg-[#FF7262] text-white py-3 rounded-xl text-lg"
          >
            Next Topic →
          </button>
        </div>
      </div>
    </div>
  );
}
