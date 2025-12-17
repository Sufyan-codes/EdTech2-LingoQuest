import React, { useEffect, useState } from "react";
import {
  getQuizByLesson,
  submitQuiz,
} from "../../../../services/contentService";
import QuizResults from "./QuizResults";
import { useNavigate, useParams } from "react-router-dom";

export default function Quiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadQuiz() {
      setLoading(true);

      try {
        const quiz = await getQuizByLesson(lessonId);

        if (mounted && quiz) {
          // Transform backend quiz format to frontend format
          const transformedQuiz = quiz.questions.map((q, index) => ({
            id: `q${index}`,
            question: q.questionText,
            options: q.options,
            answer: q.options[q.correctOptionIndex], // Store the correct answer text
          }));

          setQuizData(transformedQuiz);
        }
      } catch (e) {
        console.error("Quiz load failed:", e);
        if (mounted) {
          // Fallback dummy data
          setQuizData([
            {
              id: "q1",
              question: "How do you say 'Hello' in French?",
              options: ["Bonjour", "Au revoir", "Merci"],
              answer: "Bonjour",
            },
          ]);
        }
      }

      if (mounted) setLoading(false);
    }

    if (lessonId) {
      loadQuiz();
    }

    return () => (mounted = false);
  }, [lessonId]);

  if (loading) return <div className="p-8">Loading quiz...</div>;
  if (!quizData.length) return <div className="p-8">No quiz available</div>;

  const total = quizData.length;
  const current = quizData[step];

  const selectOption = (opt) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [step]: opt }));
  };

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else if (submitted) setShowResults(true);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const submit = async () => {
    setSubmitted(true);

    try {
      // Transform answers to backend format
      const backendAnswers = Object.entries(answers).map(
        ([questionIndex, selectedOption]) => {
          const question = quizData[parseInt(questionIndex)];
          const selectedIndex = question.options.findIndex(
            (opt) => opt === selectedOption
          );
          return {
            questionIndex: parseInt(questionIndex),
            selectedOptionIndex: selectedIndex,
          };
        }
      );

      const result = await submitQuiz(lessonId, backendAnswers);
      setScore(result);
    } catch (err) {
      console.warn("Submit failed:", err);
      // Calculate score locally as fallback
      const correct = quizData.filter((q, i) => answers[i] === q.answer).length;
      setScore({
        success: correct / total >= 0.7,
        score: correct / total,
        correctAnswers: correct,
        totalQuestions: total,
        pointsAwarded: correct * 10,
      });
    }
  };

  const optionClass = (opt) => {
    if (!submitted) {
      return answers[step] === opt
        ? "border-green-400 bg-green-50"
        : "border-gray-300 bg-white";
    }

    const correct = quizData[step].answer;
    if (opt === correct) return "border-green-500 bg-green-100";
    if (answers[step] === opt && answers[step] !== correct)
      return "border-red-500 bg-red-100";

    return "border-gray-300 bg-white";
  };

  if (showResults)
    return <QuizResults quizData={quizData} answers={answers} score={score} />;

  return (
    
  <div className="min-h-screen bg-[#FFF9EB] px-4 sm:px-6 md:px-10 py-6 md:py-10">
    {/* Top Bar */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="font-medium text-gray-700 text-sm sm:text-base">
        Question {step + 1} of {total}
      </h2>

      <button
        className="w-full sm:w-auto px-5 py-2 bg-[#FF7262] text-white rounded-lg text-sm sm:text-base"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>

    {/* Progress Bar */}
    <div className="w-full h-2 sm:h-3 bg-red-300 rounded-full mb-6 sm:mb-8">
      <div
        className="h-2 sm:h-3 bg-teal-400 rounded-full transition-all"
        style={{ width: `${((step + 1) / total) * 100}%` }}
      />
    </div>

    {/* Quiz Card */}
    <div className="bg-white max-w-3xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
      {/* Question */}
      <h1
        className="text-center font-semibold mb-6 sm:mb-8"
        style={{
          fontSize: "clamp(1.25rem, 3vw, 2rem)", // 🔥 fluid text
        }}
      >
        {current.question}
      </h1>

      {/* Options */}
      <div className="space-y-3 sm:space-y-4">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => selectOption(opt)}
            className={`w-full border rounded-xl text-left transition
              px-4 py-4 sm:px-5 sm:py-5
              text-base sm:text-lg
              ${optionClass(opt)}
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 sm:mt-10">
        {step > 0 && (
          <button
            onClick={prev}
            className="w-full sm:w-auto px-6 py-3 border rounded-xl bg-gray-100 text-sm sm:text-base"
          >
            Previous
          </button>
        )}

        {!submitted ? (
          step === total - 1 ? (
            <button
              onClick={submit}
              className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white rounded-xl text-sm sm:text-base"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={next}
              className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white rounded-xl text-sm sm:text-base"
            >
              Next
            </button>
          )
        ) : (
          <button
            onClick={next}
            className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white rounded-xl text-sm sm:text-base"
          >
            {step === total - 1 ? "Finish Review" : "Next"}
          </button>
        )}
      </div>
    </div>
  </div>

  );
}
