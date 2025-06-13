import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import catMemeVideo from "../../assets/catmeme.mp4"; // Assuming catmeme.mp4 is in src/assets

export default function QuizDownloadPrank({
  className = "",
  style = {},
  children = "Download Answers",
}) {
  const [open, setOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleDownload = (e) => {
    e.preventDefault();
    setOpen(true);
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setOpen(false);
    setShowVideo(false);
    navigate("/quiz"); // Navigate to the quiz page
  };

  return (
    <>
      <button
        className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer ${className}`}
        style={style}
        onClick={handleDownload}
      >
        {children}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative max-h-[calc(100vh-2rem)] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2 text-red-700">
              Gotcha! No real answers here!
            </h2>
            <div className="relative w-full pt-[56.25%] mb-4">
              {" "}
              {/* Responsive video container */}
              <video
                ref={videoRef}
                src={catMemeVideo}
                onEnded={handleVideoEnd}
                autoPlay
                controls
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
            <p className="mb-4 text-gray-700">
              This was a prank to highlight that downloading 'answers' from
              unverified sources can be risky. Always be cautious!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
