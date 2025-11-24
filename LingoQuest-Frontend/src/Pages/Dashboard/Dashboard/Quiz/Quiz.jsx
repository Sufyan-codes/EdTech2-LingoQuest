import React, { useState } from "react";
import QuizResults from "./QuizResults";

const quizData = [
  {
    question: "How do you say ‘Hello’ in French?",
    options: ["Bonjour", "Au revoir", "Merci", "S’il vous plaît"],
    answer: "Bonjour",
  },
  {
    question: "How do you say ‘Good evening’ in French?",
    options: ["Bonjour", "Bonsoir", "Salut", "Ça va"],
    answer: "Bonsoir",
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const total = quizData.length;
  const current = quizData[step];

  const selectOption = (opt) => {
    if (submitted) return; 
    setAnswers({ ...answers, [step]: opt });
  };

  const next = () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else if (submitted && step === total - 1) {
      // FINISHED REVIEW MODE → SHOW RESULTS PAGE
      setShowResults(true);
    }
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setStep(0); // Begin review mode at question 1
  };

  if (showResults) {
    // 🎉 Redirect to results page after review
    return (
      <QuizResults
        quizData={quizData}
        answers={answers}
      />
    );
  }

  const progressPercent = ((step + 1) / total) * 100;
  const userAnswer = answers[step];
  const correctAnswer = current.answer;

  const optionStyle = (opt) => {
    if (!submitted) {
      return userAnswer === opt
        ? "border-green-400 bg-green-50"
        : "border-gray-300 bg-white";
    }

    // Review mode styling
    if (opt === correctAnswer) return "border-green-500 bg-green-100";
    if (opt === userAnswer && userAnswer !== correctAnswer)
      return "border-red-500 bg-red-100";

    return "border-gray-300 bg-white";
  };

  return (
    <div className="p-8 bg-[#FFF9EB]  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium text-gray-700">
          Question {step + 1} of {total}
        </h2>
        <button className="px-5 py-2 bg-[#FF7262] text-white rounded-lg">
          Go to Dashboard
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-red-300 rounded-full mb-8">
        <div
          className="h-3 bg-teal-400 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-semibold text-center mb-8">
          {current.question}
        </h1>

        <div className="space-y-4">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              className={`w-full p-5 border rounded-xl text-left text-xl transition ${optionStyle(
                opt
              )}`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-10">
          {step > 0 && (
            <button
              onClick={prev}
              className="px-6 py-3 border rounded-xl bg-gray-100"
            >
              Previous
            </button>
          )}

          {!submitted ? (
            step === total - 1 ? (
              <button
                onClick={submitQuiz}
                className="px-8 py-3 bg-teal-500 text-white rounded-xl"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={next}
                className="px-8 py-3 bg-teal-500 text-white rounded-xl"
              >
                Next
              </button>
            )
          ) : (
            <button
              onClick={next}
              className="px-8 py-3 bg-teal-500 text-white rounded-xl"
            >
              {step === total - 1 ? "Finish Review" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
