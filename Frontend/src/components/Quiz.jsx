import { useEffect, useState, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import QuizDownloadPrank from "./pranks/QuizDownloadPrank";

const topics = [
  { key: "phishing", label: "Phishing", icon: "🔍" },
  { key: "passwordSecurity", label: "Password Security", icon: "🔑" },
  { key: "socialEngineering", label: "Social Engineering", icon: "👥" },
  { key: "malware", label: "Malware", icon: "🦠" },
  { key: "secureBrowsing", label: "Secure Browsing", icon: "🌐" },
];

export default function Quiz() {
  const { markComplete } = useContext(ProgressContext);
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quizHistory")) || [];
    } catch {
      return [];
    }
  });
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    if (topic) {
      setLoading(true);
      fetch(`https://infosec-h4db.onrender.com/api/quiz/${topic}`)
        .then((r) => r.json())
        .then((data) => {
          setQuestions(data);
          setLoading(false);
        });
    }
  }, [topic]);

  const submit = () => {
    setLoading(true);
    const payload = questions.map((q) => ({
      id: q.id,
      selectedIdx: answers[q.id],
    }));
    fetch(`https://infosec-h4db.onrender.com/api/quiz/${topic}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payload }),
    })
      .then((r) => r.json())
      .then((res) => {
        setResult(res);
        markComplete("quiz");
        setLoading(false);
        // Save result to history
        const newEntry = {
          topic,
          score: res.score,
          total: res.total,
          date: new Date().toISOString(),
        };
        const updatedHistory = [newEntry, ...history];
        setHistory(updatedHistory);
        localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
      });
  };

  const handleBackToTopics = () => {
    setTopic("");
    setResult(null);
    setAnswers({});
    setCurrentQuestion(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!topic)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl text-center font-bold text-indigo-700 mb-8">Choose a Topic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topics.map((t) => (
            <button
              key={t.key}
              onClick={() => setTopic(t.key)}
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 cursor-pointer"
            >
              <div className="text-4xl mb-4">{t.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {t.label}
              </h3>
            </button>
          ))}
        </div>
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quiz History</h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-2">Topic</th>
                  <th className="py-2 px-2">Score</th>
                  <th className="py-2 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-2 capitalize">{entry.topic.replace(/([A-Z])/g, " $1")}</td>
                    <td className="py-2 px-2">{entry.score}/{entry.total}</td>
                    <td className="py-2 px-2">{new Date(entry.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

  if (result)
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <ViewResultModal
          open={showResultModal}
          onClose={() => setShowResultModal(false)}
          questions={questions}
          answers={answers}
        />
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Quiz Results</h2>
          <div className="mb-8">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {result.score}/{result.total}
            </div>
            <div className="text-gray-600">
              {result.score === result.total
                ? "Perfect score! 🎉"
                : result.score >= result.total * 0.7
                ? "Great job! 🌟"
                : "Keep practicing! 💪"}
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-4 items-center">
            <QuizDownloadPrank />
            <button
              onClick={() => setShowResultModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer mt-2"
            >
              View Result
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleBackToTopics}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Topic Selection
            </button>
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setCurrentQuestion(0);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try This Topic Again
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-full md:max-w-3xl lg:w-[800px] mx-auto px-4 py-8 min-h-[350px] md:min-h-[400px] lg:min-h-[500px]">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 capitalize mb-2">
          {topic.replace(/([A-Z])/g, " $1")}
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <p className="text-xl font-medium mb-6">{questions[currentQuestion]?.question}</p>
        <div className="space-y-3">
          {questions[currentQuestion]?.options.map((opt, idx) => {
            const inputId = `q-${questions[currentQuestion].id}-opt-${idx}`;
            return (
              <label
                key={idx}
                htmlFor={inputId}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[questions[currentQuestion].id] === idx
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <input
                  type="radio"
                  id={inputId}
                  name={`q-${questions[currentQuestion].id}`}
                  value={idx}
                  onChange={() => setAnswers({ ...answers, [questions[currentQuestion].id]: idx })}
                  className="sr-only"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBackToTopics}
          className="px-6 py-2 text-gray-600 hover:text-indigo-600 cursor-pointer"
        >
          Back to Topic Selection
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              disabled={answers[questions[currentQuestion].id] === undefined}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={Object.keys(answers).length !== questions.length}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 cursor-pointer"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ViewResultModal({ open, onClose, questions, answers }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full relative text-left">
        <h3 className="text-2xl font-bold text-indigo-700 mb-4">Detailed Results</h3>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {questions.map((q, idx) => {
            const userIdx = answers[q.id];
            const isCorrect = userIdx === q.answer;
            return (
              <div key={q.id} className="mb-2">
                <div className="font-semibold mb-1">Q{idx + 1}: {q.question}</div>
                <div className="ml-4">
                  <div className={
                    isCorrect
                      ? "text-green-700"
                      : "text-red-700"
                  }>
                    Your answer: {q.options[userIdx] ?? <span className="italic text-gray-400">No answer</span>}
                  </div>
                  {!isCorrect && (
                    <div className="text-green-700">Correct answer: {q.options[q.answer]}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 absolute right-8 bottom-8"
        >
          Close
        </button>
      </div>
    </div>
  );
}
