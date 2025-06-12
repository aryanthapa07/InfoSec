import { useState } from "react";

export default function DownloadPrankButton({ className = "", style = {}, children = "Download Answers" }) {
  const [open, setOpen] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    setOpen(true);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-2 text-red-700">Warning!</h2>
            <p className="mb-4 text-gray-700">
              Downloading unknown files can be dangerous and may contain malware.<br />
              <span className="font-semibold">Tip:</span> Only download files from trusted sources.
            </p>
            <button onClick={() => setOpen(false)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Close</button>
          </div>
        </div>
      )}
    </>
  );
} 