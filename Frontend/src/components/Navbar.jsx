import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Item = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? "bg-indigo-600 text-white" 
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-indigo-600">InfoSec</span>
            <span className="text-gray-600">Awareness</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Item to="/" label="Home" />
            <Item to="/quiz" label="Quiz" />
            <Item to="/simulation/phishing" label="Phishing Sim" />
            <Item to="/simulation/password" label="Password Game" />
            <Item to="/tips" label="Tips" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            <Item to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
            <Item to="/quiz" label="Quiz" onClick={() => setIsMenuOpen(false)} />
            <Item to="/simulation/phishing" label="Phishing Sim" onClick={() => setIsMenuOpen(false)} />
            <Item to="/simulation/password" label="Password Game" onClick={() => setIsMenuOpen(false)} />
            <Item to="/tips" label="Tips" onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
}
