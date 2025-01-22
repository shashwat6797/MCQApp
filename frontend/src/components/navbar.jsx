import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { usernameAtom } from "../jotai";

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const [username] = useAtom(usernameAtom);
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    handleLogout();
  };

  return (
    <nav className="fixed px-24 w-screen top-0 left-0 z-10 bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo/Home Button */}
      <Link to="/" className="text-2xl font-bold">
        MCQApp
      </Link>

      <div className="flex items-center space-x-4">
        {/* SignIn Button or User Button based on login state */}
        {!isAuthenticated ? (
          <Link
            to="/signin"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </Link>
        ) : (
          <div className="flex gap-10 items-center">
            <span className="text-lg font-medium">Welcome, {username}</span>
            <div className="flex items-center gap-4">
              <Link
                to="/question-form"
                className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 font-bold"
              >
                Add Question
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 font-bold"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
