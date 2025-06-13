import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import catVideo from "../../assets/cat.mp4"; // Assuming you have a cat_video.mp4 in src/assets

export default function PhishingPrank({ enabled = false, onTrigger }) {
  const [open, setOpen] = useState(enabled);
  const [revealed, setRevealed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  if (!enabled || !open) return null;

  const handleClick = () => {
    setShowVideo(true);
    setRevealed(true); // To show the educational message
    if (onTrigger) onTrigger("phishing");
  };

  const handleVideoEnd = () => {
    setOpen(false); // Close the modal
    setShowVideo(false);
    navigate("/"); // Navigate to the landing page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
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
            <video
              ref={videoRef}
              src={catVideo}
              onEnded={handleVideoEnd}
              autoPlay
              controls
              className="w-full rounded-lg mb-4"
            />
            <p className="mb-4 text-gray-700">
              This was a prank to teach you about clicking unknown links. Always verify the source and URL before clicking!
            </p>
            {/* No close button here, as it navigates automatically */}
          </>
        )}
      </div>
    </div>
  );
}