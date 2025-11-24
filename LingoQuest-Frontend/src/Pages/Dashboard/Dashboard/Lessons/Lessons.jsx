import React, { useState } from "react";
import logo from "../../../../assets/logo.svg"
import { Link } from "react-router-dom";

/**
 * LessonPage.jsx
 * - Uses uploaded screenshot as hero/background: /mnt/data/Lesson screen.png
 * - Left: lesson video placeholder, description, vocabulary list, quick quiz
 * - Right: progress card + peer discussion
 *
 * Paste into: src/pages/LessonPage.jsx
 */

export default function Lessons() {
  const [progress, setProgress] = useState(40); // 40% complete as design
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const vocab = [
    { word: "Bonjour", meaning: "Hello / Good morning", phonetic: "bon-ZHOOR" },
    { word: "Bonsoir", meaning: "Good evening", phonetic: "bon-SWAR" },
    { word: "Salut", meaning: "Hi (informal)", phonetic: "sa-LOO" },
    { word: "Comment allez-vous?", meaning: "How are you? (formal)", phonetic: "ko-MON ta-lay-VOO" },
    { word: "Ca va?", meaning: "How are you? (informal)", phonetic: "sa va" },
  ];

  const quickQuestion = {
    question: 'How do you say "Good evening" in French?',
    choices: ["Bonjour", "Bonsoir", "Salut", "Ca va"],
    correctIndex: 1,
  };

  function submitQuiz() {
    setQuizSubmitted(true);
    if (quizAnswer === quickQuestion.choices[quickQuestion.correctIndex]) {
      setProgress((p) => Math.min(100, p + 10));
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6EA] p-6">
       <header className="flex items-center justify-between border-b pb-2 border-b mb-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" />
        </div>
        <Link to='/dashboard' className="bg-[#FF8F87] text-white px-4 py-2 rounded-lg">Go to Dashboard</Link>
      </header>
      <div className="max-w-7xl mx-auto">
     

      {/* Title + progress bar */}
      <div className="mb-4">
          <div className="flex justify-between"><h2 className="text-2xl font-bold text-[#0E4E49]">Lesson 5: Basic French Greetings</h2>
          <p>Beginner</p></div>
          <div className="flex">
          <div className="mt-3 w-full bg-[#4ECDC4] h-3 rounded-full overflow-hidden">
          <div className="h-3 bg-[#FF6B6B]" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-sm text-[#4EA79A] mt-2">{progress}% Complete</div>
       </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <main className="lg:col-span-2 space-y-6">
          {/* Video area */}
          <div className="bg-white rounded-2xl border border-[#D6E7E2] overflow-hidden shadow-sm">
            {/* Use uploaded lesson screen image as hero placeholder */}
            <div className="w-full h-64 lg:h-80 bg-gray-100 flex items-center justify-center" style={{ backgroundImage: `url('/mnt/data/Lesson screen.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>
              {/* Play button that sits on top */}
              <button className="bg-[#45BFB1] text-white px-4 py-2 rounded-lg shadow-lg">▶ Play Lesson Video</button>
            </div>

            {/* Lesson description */}
            <div className="p-5 border-t border-[#E9F2EE]">
              <h3 className="font-semibold text-[#0E4E49]">Introduction to French Greetings</h3>
              <p className="text-sm text-[#6A7F7A] mt-2">
                Learn how to greet people in French! In this lesson, we’ll cover the most common greetings used in everyday conversations, including formal and informal expressions.
              </p>

              <div className="mt-3 flex items-center gap-4 text-sm text-[#6A7F7A]">
                <span>▶ 12:34</span>
                <span>•</span>
                <span>5 Key phrases</span>
              </div>
            </div>
          </div>

          {/* Key Vocabulary */}
          <section className="bg-white rounded-2xl border border-teal-200 p-4 shadow-sm">
            <h4 className="font-semibold text-[#0E4E49] mb-3">Key Vocabulary</h4>

            <div className="space-y-3">
              {vocab.map((v, i) => (
                <div key={i} className="flex items-center justify-between bg-[#FFF6F3] rounded-lg p-3 border border-transparent">
                  <div>
                    <div className="text-[#FF8F87] font-semibold">{v.word}</div>
                    <div className="text-xs text-[#7B8D88]">{v.meaning}</div>
                  </div>
                  <div className="text-sm text-[#6DAEA4]">{v.phonetic}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Quiz */}
          <section className="bg-white rounded-2xl border border-teal-200 p-4 shadow-sm">
            <h4 className="font-semibold text-[#0E4E49] mb-3">Quick Quiz</h4>
            <p className="text-sm text-[#6A7F7A] mb-3">How do you say "Good evening" in French?</p>

            <div className="space-y-3">
              {quickQuestion.choices.map((c, i) => {
                const selected = quizAnswer === c;
                const isCorrect = i === quickQuestion.correctIndex;
                const showCorrect = quizSubmitted && isCorrect;
                const showWrong = quizSubmitted && selected && !isCorrect;

                return (
                  <button
                    key={c}
                    onClick={() => !quizSubmitted && setQuizAnswer(c)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selected ? "border-[#66C9B8] bg-[#F0FBF9]" : "border-[#D6E7E2] bg-white"
                    } ${showCorrect ? "ring-2 ring-[#66C9B8]" : ""} ${showWrong ? "opacity-60 line-through" : ""}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={submitQuiz}
                className="flex-1 bg-[#FF8F87] text-white py-2 rounded-lg disabled:opacity-60"
                disabled={!quizAnswer || quizSubmitted}
              >
                Submit Answer
              </button>
              <button
                onClick={() => { setQuizAnswer(null); setQuizSubmitted(false); }}
                className="px-4 py-2 border rounded-lg"
              >
                Reset
              </button>
            </div>

            {quizSubmitted && (
              <div className="mt-3 text-sm">
                {quizAnswer === quickQuestion.choices[quickQuestion.correctIndex] ? (
                  <div className="text-green-600">Correct! Progress updated.</div>
                ) : (
                  <div className="text-red-600">Wrong — the correct answer is: <strong>{quickQuestion.choices[quickQuestion.correctIndex]}</strong>.</div>
                )}
              </div>
            )}
          </section>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            <button className="px-4 py-2 border rounded-lg bg-white">Back</button>
            <button className="px-4 py-2 bg-[#FF8F87] text-white rounded-lg">Next Lesson ➜</button>
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="space-y-6">
          {/* Progress box */}
          <div className="bg-white rounded-2xl border border-teal-200 p-4 shadow-sm w-full">
            <h4 className="font-semibold">Your Progress</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#6A7F7A]">
              <li className="flex justify-between items-center">Video Watched <span className="text-green-500">✓</span></li>
              <li className="flex justify-between items-center">Notes Reviewed <span className="text-green-500">✓</span></li>
              <li className="flex justify-between items-center">Quiz Completed <span className="text-gray-400">In progress</span></li>
            </ul>
            <button className="mt-4 w-full bg-[#66C9B8] text-white py-2 rounded-lg">Save Lesson</button>
          </div>

          {/* Peer Discussion */}
          <div className="bg-white rounded-2xl border border-teal-200 p-4 shadow-sm w-full">
            <h4 className="font-semibold">Peer Discussion</h4>
            <div className="mt-3 space-y-3">
              <div className="bg-[#FFF9F6] p-3 rounded-lg text-sm">
                <div className="text-xs text-[#6A7F7A]">Abubakar: This lesson was really helpful</div>
                <div className="text-xs text-[#9AAFA9] mt-1">10 mins ago</div>
              </div>
              <div className="bg-[#FFF9F6] p-3 rounded-lg text-sm">
                <div className="text-xs text-[#6A7F7A]">Hajara: Yes! i really learnt a lot.</div>
                <div className="text-xs text-[#9AAFA9] mt-1">7 mins ago</div>
              </div>
              <div className="bg-[#FFF9F6] p-3 rounded-lg text-sm">
                <div className="text-xs text-[#6A7F7A]">Sufyan: Can Someone explain the Pronunciations?</div>
                <div className="text-xs text-[#9AAFA9] mt-1">5 mins ago</div>
              </div>
            </div>

            <button className="mt-4 w-full py-2 rounded-lg border border-teal-200">Join Discussion</button>
          </div>
        </aside>
      </div>
     </div>
    </div>
  );
}
