import { useState } from "react";
import { useNavigate } from "react-router-dom";

const scenarios = [
  {
    email: `Dear Valued Customer,

We have noticed unusual activity on your account. To ensure your account security, please verify your details by clicking the link below:

http://secure-verify-account.com

If you do not take action within 24 hours, your account will be suspended.

Best regards,
Your Bank Security Team`,
    options: [
      { id: "urgency", label: "Creates urgency (e.g., '24 hours', 'suspended')", correct: true, explanation: "Phishing emails often create a sense of urgency to trick you into acting quickly without thinking." },
      { id: "unknownLink", label: "Contains an unknown or suspicious link", correct: true, explanation: "Links to unfamiliar websites can lead to phishing sites that steal your information." },
      { id: "personalInfo", label: "Asks for personal or account information", correct: true, explanation: "Legitimate companies rarely ask for sensitive info via email." },
      { id: "genericGreeting", label: "Uses a generic greeting like 'Dear Valued Customer'", correct: true, explanation: "Phishing emails often use generic greetings instead of your real name." },
      { id: "unusualActivity", label: "Mentions 'unusual activity' without specific details", correct: true, explanation: "Vague warnings about 'unusual activity' are a common scare tactic." },
      { id: "professionalSignature", label: "Has a professional signature block", correct: false, explanation: "A professional signature is common in legitimate emails." },
      { id: "noSpellingErrors", label: "No spelling or grammar errors", correct: false, explanation: "Absence of errors is not a red flag." }
    ]
  },
  {
    email: `Hi Alex,

Just a quick note to let you know your package has shipped! You can track your order here:

https://www.legit-shipping.com/track/12345

Thank you for shopping with us!

Best,
Customer Service Team`,
    options: [
      { id: "personalGreeting", label: "Uses your real name ('Hi Alex')", correct: false, explanation: "Personalized greetings are a good sign." },
      { id: "trackingLink", label: "Provides a tracking link", correct: false, explanation: "Tracking links are normal in shipping notifications. Always check the URL, but this alone is not suspicious." },
      { id: "noUrgency", label: "No urgent language", correct: false, explanation: "Lack of urgency is typical for legitimate emails." },
      { id: "noRequestInfo", label: "Does not ask for personal information", correct: false, explanation: "Legitimate companies rarely ask for sensitive info via email." },
      { id: "genericSignature", label: "Uses a generic signature ('Customer Service Team')", correct: false, explanation: "Generic signatures are common in automated emails." },
      { id: "suspiciousLink", label: "Link goes to an unknown website", correct: true, explanation: "Always check the actual URL. If it's unfamiliar, it could be a phishing attempt." },
      { id: "unexpectedEmail", label: "You weren't expecting a package", correct: true, explanation: "Unexpected emails about orders or shipments can be phishing attempts." }
    ]
  },
  {
    email: `Dear Employee,

As part of our annual security training, please complete the attached survey by the end of the week. If you have any questions, contact HR at hr@company.com.

Thank you,
HR Department`,
    options: [
      { id: "attachment", label: "Contains an attachment", correct: true, explanation: "Attachments can contain malware. Only open if you trust the sender and expect the file." },
      { id: "legitContact", label: "Provides a legitimate company contact email", correct: false, explanation: "A real company contact is a good sign." },
      { id: "noThreats", label: "No threats or urgent language", correct: false, explanation: "Lack of threats is typical for legitimate emails." },
      { id: "fromHR", label: "Comes from HR Department", correct: false, explanation: "HR often sends legitimate emails." },
      { id: "surveyRequest", label: "Requests you to complete a survey", correct: false, explanation: "Survey requests are common in companies." },
      { id: "deadline", label: "Mentions a deadline ('end of the week')", correct: true, explanation: "Deadlines can be used to create urgency, but are not always suspicious. Consider context." }
    ]
  }
];

export default function EmailSafetyChallenge() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const scenario = scenarios[current];

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    setResults((prev) => [
      ...prev,
      {
        selected,
        scenarioIdx: current
      }
    ]);
    setSelected([]);
    setShowResult(false);
    if (current < scenarios.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setShowResult(false);
  };

  const handleContinue = () => {
    navigate("/simulation/password");
  };

  if (showSummary) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Email Safety Challenge - Summary</h2>
          <p className="text-blue-700 mb-4">
            Here's how you did on each scenario. Review the explanations to reinforce your learning!
          </p>
        </div>
        {results.map((res, idx) => {
          const sc = scenarios[res.scenarioIdx];
          return (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Scenario {idx + 1}</h3>
              <div className="whitespace-pre-wrap font-mono text-gray-800 mb-4">{sc.email}</div>
              <div className="mb-2 font-semibold">Your Answers:</div>
              <div className="mb-4 space-y-2">
                {sc.options.map((opt) => {
                  const wasSelected = res.selected.includes(opt.id);
                  const isCorrect = opt.correct;
                  let bgColorClass = "bg-gray-100";
                  let textColorClass = "text-gray-700";
                  let icon = "•";

                  if (wasSelected && isCorrect) {
                    bgColorClass = "bg-green-100";
                    textColorClass = "text-green-700";
                    icon = "✓";
                  } else if (wasSelected && !isCorrect) {
                    bgColorClass = "bg-red-100";
                    textColorClass = "text-red-700";
                    icon = "✗";
                  } else if (!wasSelected && isCorrect) {
                    bgColorClass = "bg-yellow-100";
                    textColorClass = "text-yellow-700";
                    icon = "!";
                  }

                  return (
                    <div key={opt.id} className={`p-3 rounded-lg ${bgColorClass}`}>
                      <div className="flex items-start gap-2">
                        <span className={`font-bold ${textColorClass}`}>{icon}</span>
                        <span className={`font-semibold ${textColorClass}`}>{opt.label}</span>
                      </div>
                      <p className={`ml-6 text-sm ${textColorClass}`}>{opt.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button
          onClick={handleContinue}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Continue to Password Game
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Email Safety Challenge</h2>
        <p className="text-blue-700">
          <strong>Instructions:</strong> Read the email below and check the boxes for any suspicious elements you find. Then click "Analyze" to see if you're right!
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Scenario {current + 1} of {scenarios.length}</h3>
        <div className="whitespace-pre-wrap font-mono text-gray-800 mb-4">
          {scenario.email}
        </div>
        <div className="space-y-2">
          {scenario.options.map((element) => (
            <label key={element.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selected.includes(element.id)}
                onChange={() => handleToggle(element.id)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span>{element.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleAnalyze}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Analyze
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {showResult && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Result:</h3>
          <div className="mb-4 space-y-2">
            {scenario.options.map((opt) => {
              const wasSelected = selected.includes(opt.id);
              const isCorrect = opt.correct;
              let bgColorClass = "bg-gray-100";
              let textColorClass = "text-gray-700";
              let icon = "•";

              if (wasSelected && isCorrect) {
                bgColorClass = "bg-green-100";
                textColorClass = "text-green-700";
                icon = "✓";
              } else if (wasSelected && !isCorrect) {
                bgColorClass = "bg-red-100";
                textColorClass = "text-red-700";
                icon = "✗";
              } else if (!wasSelected && isCorrect) {
                bgColorClass = "bg-yellow-100";
                textColorClass = "text-yellow-700";
                icon = "!";
              }

              return (
                <div key={opt.id} className={`p-3 rounded-lg ${bgColorClass}`}>
                  <div className="flex items-start gap-2">
                    <span className={`font-bold ${textColorClass}`}>{icon}</span>
                    <span className={`font-semibold ${textColorClass}`}>{opt.label}</span>
                  </div>
                  <p className={`ml-6 text-sm ${textColorClass}`}>{opt.explanation}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleNext}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {current < scenarios.length - 1 ? "Next Question" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
}
