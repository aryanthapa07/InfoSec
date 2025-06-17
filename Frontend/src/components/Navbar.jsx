import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Item({ to, label, onItemClick }) {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onItemClick}
        className={({ isActive }) =>
          `block py-2 px-3 rounded md:p-0 ${isActive ? "bg-indigo-600 text-white md:bg-transparent md:text-indigo-600" : "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600"}`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-indigo-700">
            InfoSec
          </span>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-500 ml-1">
            Awareness
          </span>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <Item to="/" label="Home" />
            <Item to="/quiz" label="Quiz" />
            <Item to="/simulation/phishing" label="Phishing Sim" />
            <Item to="/simulation/password" label="Password Game" />
            <Item to="/tips" label="Tips" />
          </ul>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="fixed top-0 left-0 right-0 h-full bg-white shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="self-center text-2xl font-bold whitespace-nowrap text-indigo-700">
                  InfoSec
                </span>
                <button
                  onClick={toggleMobileMenu}
                  type="button"
                  className="text-gray-400 hover:text-gray-900 text-2xl"
                >
                  &times;
                </button>
              </div>
              <ul className="flex flex-col space-y-4">
                <Item to="/" label="Home" onItemClick={closeMobileMenu} />
                <Item to="/quiz" label="Quiz" onItemClick={closeMobileMenu} />
                <Item to="/simulation/phishing" label="Phishing Sim" onItemClick={closeMobileMenu} />
                <Item to="/simulation/password" label="Password Game" onItemClick={closeMobileMenu} />
                <Item to="/tips" label="Tips" onItemClick={closeMobileMenu} />
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
