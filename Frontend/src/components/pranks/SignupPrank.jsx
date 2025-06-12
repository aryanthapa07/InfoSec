import { useState } from "react";

const EyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);
const EyeOffIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5c1.956 0 3.693-.5 5.18-1.257M6.32 6.321A9.956 9.956 0 0112 4.5c6 0 9.75 7.5 9.75 7.5a10.478 10.478 0 01-4.293 4.774M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

export default function SignupPrank() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [showLeak, setShowLeak] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLeak(true);
    setShowMsg(true);
    setShowNote(true);
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Sign Up</h2>
      {showNote && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded p-3 text-blue-800 text-center font-medium">
          This was just for educational purposes. You can continue giving the quiz without signing up.
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="block w-full mb-3 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="block w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? EyeOffIcon : EyeIcon}
          </button>
        </div>
        <div className="relative mb-3">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            className="block w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? EyeOffIcon : EyeIcon}
          </button>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer">Sign Up</button>
      </form>
      {showLeak && (
        <div className="mt-6 bg-black text-green-400 font-mono p-4 rounded-lg shadow-inner">
          <div className="mb-2">[hacker_console] Data intercepted:</div>
          <div>Email: {form.email}</div>
          <div>Password: {form.password.replace(/./g, '*')}</div>
          <div>Confirm Password: {form.confirm.replace(/./g, '*')}</div>
          <div className="mt-4 text-yellow-400">⚠️ <b>Note:</b> This is just a prank for security awareness. Your data is NOT leaked anywhere.</div>
        </div>
      )}
      {showMsg && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          <strong>Educational Message:</strong> <br />
          This was a simulated data leak. Always ensure forms are secure (look for HTTPS and trusted sites) before entering sensitive information.
          <button onClick={() => setShowMsg(false)} className="block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mx-auto">Close</button>
        </div>
      )}
    </div>
  );
} 