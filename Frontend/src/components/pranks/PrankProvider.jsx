import PhishingPrank from "./PhishingPrank";
// DownloadPrankButton is now only used in quiz results, not globally

const enabled = import.meta.env.VITE_SECURITY_PRANKS_ENABLED === "true";

export default function PrankProvider() {
  // Optionally, send logs to backend here
  const handlePrankTrigger = (type) => {
    // TODO: send to backend
    // fetch("/api/prank-log", { method: "POST", body: JSON.stringify({ type, time: Date.now() }) })
  };

  if (!enabled) return null;
  return (
    <>
      <PhishingPrank enabled={enabled} onTrigger={handlePrankTrigger} />
    </>
  );
} 