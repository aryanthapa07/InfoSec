import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to Information Security Awareness</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Information Security (InfoSec) protects data from unauthorized access, disclosure, or destruction.
          In today's digital world, understanding InfoSec is crucial to safeguard personal and
          organizational assets.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">Interactive Quizzes</h3>
          <p className="text-gray-600">Test your knowledge with engaging quizzes covering various security topics.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">Phishing Simulations</h3>
          <p className="text-gray-600">Learn to identify and avoid phishing attempts through realistic scenarios.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">Password Security</h3>
          <p className="text-gray-600">Master the art of creating and managing strong, secure passwords.</p>
        </div>
      </div>

      <section className="bg-indigo-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-600 mb-6">
          Choose a topic from the navigation bar above to begin your security awareness journey.
          Track your progress and earn achievements as you learn!
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            onClick={() => navigate("/quiz")}
          >
            Start Quiz
          </button>
          <button
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
            onClick={() => navigate("/tips")}
          >
            View Tips
          </button>
        </div>
      </section>
    </div>
  );
}
