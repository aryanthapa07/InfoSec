import { useEffect, useState, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

const redFlagCategories = {
  urgency: { icon: "⏰", label: "Urgency", color: "red" },
  authority: { icon: "👔", label: "Authority", color: "blue" },
  reward: { icon: "🎁", label: "Reward", color: "green" },
  threat: { icon: "⚠️", label: "Threat", color: "orange" },
  request: { icon: "📝", label: "Request", color: "purple" },
  trust: { icon: "🤝", label: "Trust", color: "indigo" },
  grammar: { icon: "📚", label: "Grammar", color: "yellow" },
};

const colorClasses = {
  red: "bg-red-600 hover:bg-red-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  orange: "bg-orange-600 hover:bg-orange-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  yellow: "bg-yellow-600 hover:bg-yellow-700",
};

export default function PhishingSimulation() {
  const { markComplete } = useContext(ProgressContext);
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://infosec-h4db.onrender.com/api/sim/phishing")
      .then(r => r.json())
      .then(data => {
        setScenarios(data.scenarios);
        setCurrentScenario(data.scenarios[0]);
        setLoading(false);
      });
  }, []);

  const toggle = word => {
    if (done) return;
    setSelected(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const check = () => {
    setDone(true);
    const correctFlags = selected.filter(w => currentScenario.flags.includes(w));
    const newScore = Math.round((correctFlags.length / currentScenario.flags.length) * 100);
    setScore(newScore);
    
    if (newScore >= 80) {
      setShowSuccess(true);
    markComplete("phishing");
    }
  };

  const nextScenario = () => {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    const nextIndex = (currentIndex + 1) % scenarios.length;
    setCurrentScenario(scenarios[nextIndex]);
    setSelected([]);
    setDone(false);
    setShowExplanation(false);
    setShowHint(false);
    setShowSuccess(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentScenario) return null;

  const words = currentScenario.body.split(/\s+/);
  const correctFlags = selected.filter(w => currentScenario.flags.includes(w));
  const incorrectFlags = selected.filter(w => !currentScenario.flags.includes(w));
  const missedFlags = currentScenario.flags.filter(w => !selected.includes(w));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Phishing Detection Challenge</h2>
        <p className="text-gray-600">
          Read the {currentScenario.type} below and identify potential phishing red flags. Click on suspicious words or phrases.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        {currentScenario.type === "email" ? (
          <>
            <div className="border-b pb-4 mb-4">
              <p className="text-gray-600"><span className="font-semibold">From:</span> {currentScenario.from}</p>
              <p className="text-gray-600"><span className="font-semibold">Subject:</span> {currentScenario.subject}</p>
            </div>
          </>
        ) : (
          <div className="border-b pb-4 mb-4">
            <p className="text-gray-600"><span className="font-semibold">Platform:</span> {currentScenario.platform}</p>
            <p className="text-gray-600"><span className="font-semibold">From:</span> {currentScenario.sender}</p>
          </div>
        )}
        
        <div className="prose max-w-none">
        {words.map((w, i) => (
          <span
            key={i}
              className={`cursor-pointer transition-colors ${
                selected.includes(w)
                  ? currentScenario.flags.includes(w)
                    ? "bg-yellow-200"
                    : "bg-red-200"
                  : ""
            }`}
            onClick={() => toggle(w)}
          >
            {w}{" "}
          </span>
        ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {Object.entries(redFlagCategories).map(([key, { icon, label, color }]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
      <button
            className={`px-6 py-2 rounded-lg transition-colors ${
              done
                ? "bg-green-600 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        onClick={check}
            disabled={done}
      >
            {done ? "Analysis Complete ✓" : "Analyze Message"}
          </button>
        </div>
      </div>

      {showHint && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">💡 Hint</h3>
          <p className="text-yellow-700">
            Look for signs of urgency, threats, or requests for personal information.
            Check the sender's email address and any links carefully.
          </p>
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-green-800 mb-2">🎉 Great job!</h3>
          <p className="text-green-700">
            You've successfully identified the phishing attempts! Would you like to try another scenario?
          </p>
          <button
            onClick={nextScenario}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Another Scenario
          </button>
        </div>
      )}

      {done && !showSuccess && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Correctly Identified ({correctFlags.length}/{currentScenario.flags.length})
              </h4>
              <div className="space-y-2">
                {correctFlags.map((flag, index) => (
                  <div key={index} className="flex items-center gap-2 text-green-600">
                    <span>✓</span>
                    <span>{flag}</span>
                    <span className="text-xs text-gray-500">
                      ({redFlagCategories[currentScenario.flagCategories[flag]]?.label})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Missed Red Flags</h4>
              <div className="space-y-2">
                {missedFlags.map((flag, index) => (
                  <div key={index} className="flex items-center gap-2 text-red-600">
                    <span>✗</span>
                    <span>{flag}</span>
                    <span className="text-xs text-gray-500">
                      ({redFlagCategories[currentScenario.flagCategories[flag]]?.label})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {incorrectFlags.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-2">Incorrectly Identified</h4>
              <div className="space-y-2">
                {incorrectFlags.map((flag, index) => (
                  <div key={index} className="flex items-center gap-2 text-orange-600">
                    <span>!</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {showExplanation ? "Hide" : "Show"} Detailed Explanation
      </button>

            {showExplanation && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Why These Are Red Flags:</h4>
                <div className="space-y-4">
                  {currentScenario.flags.map((flag, index) => (
                    <div key={index} className="text-gray-600">
                      <p className="font-medium text-gray-700">{flag}</p>
                      <p className="text-sm">{currentScenario.explanations[flag]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-medium">
              Score: <span className="text-indigo-600">{score}%</span>
            </div>
            <button
              onClick={nextScenario}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Another Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
