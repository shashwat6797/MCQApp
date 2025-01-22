import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Quiz from "./Pages/Quiz";
import AuthForm from "./Pages/SignIn.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import QuestionForm from "./Pages/QuestionForm.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/signin" element={<AuthForm />} />
          <Route path="/question-form" element={<QuestionForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
