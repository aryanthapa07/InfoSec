import { useState } from "react";

export default function PhishingPrank({ enabled = false, onTrigger }) {
  const [open, setOpen] = useState(enabled);
  const [revealed, setRevealed] = useState(false);

  if (!enabled || !open) return null;

  const handleClick = () => {
    setRevealed(true);
    if (onTrigger) onTrigger("phishing");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
        {!revealed ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-indigo-700">Quick Security Check</h2>
            <p className="mb-4 text-gray-700">
              Did you check the URL before clicking this link?{' '}
              <span className="text-blue-600 underline cursor-pointer" onClick={handleClick}>
                Click here to continue
              </span>
              .
            </p>
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-green-700">Phishing Simulation!</h2>
            <p className="mb-4 text-gray-700">
              This was a fake phishing pop up. Never click suspicious links or provide credentials unless you are sure of the sender. <br />
              <span className="font-semibold">Tip:</span> Always check the sender's address and the URL before clicking.
            </p>
            <button onClick={() => setOpen(false)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Close</button>
          </>
        )}
      </div>
    </div>
  );
}