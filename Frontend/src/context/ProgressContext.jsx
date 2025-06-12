import { createContext, useState, useEffect } from "react";

export const ProgressContext = createContext();

const defaultState = {
  quiz: false,
  phishing: false,
  passwordGame: false,
  tips: false
};

export const ProgressProvider = ({ children }) => {
  // ① load from localStorage once
  const [progress, setProgress] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("progress"));
      return { ...defaultState, ...saved };
    } catch {
      return defaultState;
    }
  });

  // ② write back on every change
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const markComplete = key =>
    setProgress(prev => ({ ...prev, [key]: true }));

  return (
    <ProgressContext.Provider value={{ progress, markComplete }}>
      {children}
    </ProgressContext.Provider>
  );
};
