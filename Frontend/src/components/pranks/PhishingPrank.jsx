import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import catVideo from "../../assets/cat.mp4"; // Assuming you have a cat_video.mp4 in src/assets

export default function PhishingPrank({ enabled = false, onTrigger }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (enabled) {
      const hasBeenShown = localStorage.getItem("phishingPrankShown");
      if (!hasBeenShown) {
        setOpen(true);
        localStorage.setItem("phishingPrankShown", "true");
      }
    }
  }, [enabled]);

  if (!enabled || !open) return null;

  const handleClick = () => {
    setShowVideo(true);
    setRevealed(true);
    if (onTrigger) onTrigger("phishing");
  };

  const handleVideoEnd = () => {
    setOpen(false);
    setShowVideo(false);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-lg w-full relative max-h-[calc(100vh-2rem)] overflow-y-auto">
        {!showVideo ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-indigo-700">Quick Security Check</h2>
            <p className="mb-4 text-gray-700">
              Did you check the URL before clicking this link?
            </p>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold cursor-pointer"
            >
              Click here to continue
            </button>
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-red-700">Haha! You clicked an unverified link!</h2>
            <div className="relative w-full pt-[56.25%] mb-4"> {/* Responsive video container */}
              <video
                ref={videoRef}
                src={catVideo}
                onEnded={handleVideoEnd}
                autoPlay
                controls
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
            <p className="mb-4 text-gray-700">
              This was a prank to teach you about clicking unknown links. Always verify the source and URL before clicking!
            </p>
          </>
        )}
      </div>
    </div>
  );
}