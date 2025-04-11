import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log("Logged out successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="shadow-md py-4 px-4 md:px-8 bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-gray-800">TO</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent ml-1">
            DO
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-sky-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/todolist"
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-700 hover:to-sky-500 transition duration-300"
              >
                ToDo Lists
              </Link>
              <Link
                to="/add"
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-700 hover:to-sky-500 transition duration-300"
              >
                Add Task
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 px-5 py-2 rounded-lg border-sky-500 text-sky-700 hover:text-white hover:bg-gradient-to-r from-sky-500 to-sky-700 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="border-2 px-5 py-2 rounded-lg border-sky-500 text-sky-700 hover:text-white hover:bg-gradient-to-r from-sky-500 to-sky-700 transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-white px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-700 hover:to-sky-500 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start gap-2 px-4 mt-3">
          {token ? (
            <>
              <Link to="/todolist" className="text-sky-700" onClick={toggleMenu}>ToDo Lists</Link>
              <Link to="/add" className="text-sky-700" onClick={toggleMenu}>Add Task</Link>
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-sky-700" onClick={toggleMenu}>Sign Up</Link>
              <Link to="/login" className="text-sky-700" onClick={toggleMenu}>Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
