import React, { useEffect, useState } from "react";
import { getQuizByLesson, submitQuiz } from "../../../../services/contentService";
import QuizResults from "../Quiz/QuizResults";
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
            answer: q.options[q.correctOptionIndex] // Store the correct answer text
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
              answer: "Bonjour"
            }
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
      const backendAnswers = Object.entries(answers).map(([questionIndex, selectedOption]) => {
        const question = quizData[parseInt(questionIndex)];
        const selectedIndex = question.options.findIndex(opt => opt === selectedOption);
        return {
          questionIndex: parseInt(questionIndex),
          selectedOptionIndex: selectedIndex
        };
      });

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
        pointsAwarded: correct * 10
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

  if (showResults) return <QuizResults quizData={quizData} answers={answers} score={score} />;

  return (
    <div className="p-8 bg-[#FFF9EB] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium text-gray-700">
          Question {step + 1} of {total}
        </h2>
        <button
          className="px-5 py-2 bg-[#FF7262] text-white rounded-lg"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>

      <div className="w-full h-3 bg-red-300 rounded-full mb-8">
        <div
          className="h-3 bg-teal-400 rounded-full"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-semibold text-center mb-8">
          {current.question}
        </h1>

        <div className="space-y-4">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              className={`w-full p-5 border rounded-xl text-left text-xl transition ${optionClass(
                opt
              )}`}
            >
              {opt}
            </button>
          ))}
        </div>

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
                onClick={submit}
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