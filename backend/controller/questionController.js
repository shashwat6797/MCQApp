const Question = require("../models/QuestionsModel"); // Import the Question model

// Controller to get all questions
const getAllQuestions = async () => {
  try {
    // Retrieve all questions from the database
    const questions = await Question.find();

    // If no questions found, return a message
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Return the questions with a success status
    return { questions };
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res
      .status(500)
      .json({ message: "Server error while retrieving questions" });
  }
};

const getRandomQuestions = async (numberOfQuestions) => {
  const { questions } = await getAllQuestions();
  if (numberOfQuestions >= questions.length) {
    return questions;
  }

  const shuffledQuestions = [...questions];

  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [
      shuffledQuestions[j],
      shuffledQuestions[i],
    ];
  }

  const quests = shuffledQuestions.slice(0, numberOfQuestions);

  return shuffledQuestions.slice(0, numberOfQuestions);
};

module.exports = {
  getAllQuestions,
  getRandomQuestions,
};
