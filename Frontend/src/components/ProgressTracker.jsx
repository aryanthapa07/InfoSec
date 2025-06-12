import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

export default function ProgressTracker() {
  const { progress } = useContext(ProgressContext);
  const completed = Object.values(progress).filter(Boolean).length;
  const total = Object.keys(progress).length;

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 border shadow px-4 py-2 rounded text-sm">
      Progress: {completed}/{total} sections complete
    </div>
  );
}
