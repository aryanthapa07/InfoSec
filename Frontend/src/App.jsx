import { Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import PhishingSimulation from "./components/PhishingSimulation";
import PasswordGame from "./components/PasswordGame";
import Tips from "./components/Tips";
import ProgressTracker from "./components/ProgressTracker";
import PrankProvider from "./components/pranks/PrankProvider";

export default function App() {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-slate-50 text-gray-800">
        <Navbar />
        <PrankProvider />
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/simulation/phishing" element={<PhishingSimulation />} />
            <Route path="/simulation/password" element={<PasswordGame />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
          <ProgressTracker />
        </div>
      </div>
    </ProgressProvider>
  );
}
