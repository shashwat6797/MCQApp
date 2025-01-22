import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../context/AuthProvider";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home-container">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="flex flex-col justify-center items-center text-center p-8 max-w-lg bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20">
          <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-md animate-fade-in">
            Welcome to the MCQ Application
          </h1>
          <p className="mt-4 mb-6 text-lg text-gray-300 animate-slide-in">
            Test your knowledge with our multiple-choice quizzes.
          </p>
          {isAuthenticated && (
            <div className="mt-6 w px-8 py-4 bg-green-500 text-xl font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 animate-bounce">
              <Link to="/quiz">Start Quiz</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
