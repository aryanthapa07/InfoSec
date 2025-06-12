import { useState, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import zxcvbn from "zxcvbn";

const strengthLabels = {
  0: { label: "Very Weak", color: "red", message: "This password can be cracked instantly" },
  1: { label: "Weak", color: "orange", message: "This password can be cracked in minutes" },
  2: { label: "Fair", color: "yellow", message: "This password can be cracked in hours" },
  3: { label: "Strong", color: "green", message: "This password can be cracked in days" },
  4: { label: "Very Strong", color: "emerald", message: "This password can be cracked in years" }
};

const passwordTips = [
  "Use at least 12 characters",
  "Include uppercase and lowercase letters",
  "Add numbers and special characters",
  "Avoid common words and patterns",
  "Don't use personal information",
  "Use unique passwords for each account"
];

const challenges = [
  {
    id: 1,
    title: "Create a Strong Password",
    description: "Create a password that meets all security requirements",
    requirements: [
      "At least 12 characters long",
      "Contains uppercase and lowercase letters",
      "Includes numbers and special characters",
      "Not based on common words"
    ]
  },
  {
    id: 2,
    title: "Password Strength Test",
    description: "Test your password against common attack methods",
    requirements: [
      "Resistant to dictionary attacks (score 3+)",
      "Resistant to brute force attacks (score 3+)",
      "Resistant to pattern-based attacks (score 3+)"
    ]
  },
  {
    id: 3,
    title: "Password Recovery",
    description: "Create a secure password recovery process",
    requirements: [
      "Use a secure email for recovery (enter a strong password)",
      "Enable two-factor authentication (enter a strong password)",
      "Set up security questions (enter a strong password)"
    ]
  }
];

function generateStrongPassword() {
  // Simple strong password generator
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
  let pwd = "";
  for (let i = 0; i < 16; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export default function PasswordGame() {
  const { markComplete } = useContext(ProgressContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [suggestion, setSuggestion] = useState(generateStrongPassword());

  const result = zxcvbn(password);
  const { score, feedback } = result;
  const strength = strengthLabels[score];

  const checkRequirements = () => {
    const requirements = challenges[currentChallenge].requirements;
    if (currentChallenge === 0) {
      const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
        common: !/password|123456|qwerty/i.test(password)
      };
      return requirements.map(req => {
        if (req.includes("12 characters")) return checks.length;
        if (req.includes("uppercase and lowercase")) return checks.uppercase && checks.lowercase;
        if (req.includes("numbers and special")) return checks.numbers && checks.special;
        if (req.includes("common words")) return checks.common;
        return true;
      });
    } else if (currentChallenge === 1) {
      // Use zxcvbn score >= 3 for all requirements
      return requirements.map(() => password.length > 0 && score >= 3);
    } else if (currentChallenge === 2) {
      // Require a non-empty, strong password (score >= 3)
      return requirements.map(() => password.length > 0 && score >= 3);
    }
    return requirements.map(() => false);
  };

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setPassword("");
      setSuggestion(generateStrongPassword());
    } else {
      markComplete("password");
      setCompleted(true);
    }
  };

  const requirements = checkRequirements();
  const allRequirementsMet = requirements.every(Boolean);

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Congratulations! 🎉</h2>
          <p className="text-lg text-gray-700 mb-6">
            You have completed all password security challenges.
          </p>
          <button
            onClick={() => {
              setCurrentChallenge(0);
              setPassword("");
              setCompleted(false);
              setSuggestion(generateStrongPassword());
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Restart Challenges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Password Security Challenge</h2>
        <p className="text-gray-600">
          Learn how to create and manage strong passwords through interactive challenges.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Challenge {currentChallenge + 1}: {challenges[currentChallenge].title}
          </h3>
          <p className="text-gray-600">{challenges[currentChallenge].description}</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Password Strength:</span>
              <span className={`text-sm font-medium text-${strength.color}-600`}>
                {strength.label}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${strength.color}-500 transition-all duration-300`}
                style={{ width: `${(score + 1) * 20}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{strength.message}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Requirements:</h4>
            <ul className="space-y-2">
              {challenges[currentChallenge].requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className={requirements[index] ? "text-green-500" : "text-red-500"}>
                    {requirements[index] ? "✓" : "✗"}
                  </span>
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions Panel */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Password Suggestion:</h4>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-mono text-indigo-700 text-lg break-all">{suggestion}</span>
              <button
                onClick={() => setPassword(suggestion)}
                className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Use Suggestion
              </button>
              <button
                onClick={() => setSuggestion(generateStrongPassword())}
                className="px-4 py-1 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition-colors"
              >
                New Suggestion
              </button>
            </div>
          </div>

          {feedback.warning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-700">{feedback.warning}</p>
            </div>
          )}

          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Suggestions:</h4>
              <ul className="list-disc list-inside text-blue-700">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setShowTips(!showTips)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {showTips ? "Hide Tips" : "Show Tips"}
          </button>
          <button
            onClick={handleNextChallenge}
            disabled={!allRequirementsMet}
            className={`px-6 py-2 rounded-lg transition-colors ${
              allRequirementsMet
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentChallenge < challenges.length - 1 ? "Next Challenge" : "Complete"}
          </button>
        </div>
      </div>

      {showTips && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Password Security Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passwordTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <p className="text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
