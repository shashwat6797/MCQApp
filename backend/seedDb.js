const mongoose = require("mongoose");
const QuestionsModel = require("./models/QuestionsModel");

// Sample JSON data for multiple questions
const questionsData = [
  {
    question: "What is the chemical symbol for water?",
    options: {
      A: "H2O",
      B: "O2",
      C: "CO2",
      D: "H2",
    },
    answer: "A",
    marks: 3,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: {
      A: "William Shakespeare",
      B: "Charles Dickens",
      C: "Mark Twain",
      D: "Jane Austen",
    },
    answer: "A",
    marks: 4,
  },
  {
    question: "Which planet is closest to the Sun?",
    options: {
      A: "Venus",
      B: "Mars",
      C: "Mercury",
      D: "Earth",
    },
    answer: "C",
    marks: 5,
  },
  {
    question: "What is the capital of Japan?",
    options: {
      A: "Beijing",
      B: "Seoul",
      C: "Bangkok",
      D: "Tokyo",
    },
    answer: "D",
    marks: 5,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: {
      A: "Pablo Picasso",
      B: "Vincent van Gogh",
      C: "Leonardo da Vinci",
      D: "Claude Monet",
    },
    answer: "C",
    marks: 4,
  },
  {
    question: "What is the largest organ in the human body?",
    options: {
      A: "Liver",
      B: "Heart",
      C: "Skin",
      D: "Lungs",
    },
    answer: "C",
    marks: 5,
  },
  {
    question: "Which element has the atomic number 1?",
    options: {
      A: "Helium",
      B: "Hydrogen",
      C: "Oxygen",
      D: "Nitrogen",
    },
    answer: "B",
    marks: 3,
  },
  {
    question: "What is the powerhouse of the cell?",
    options: {
      A: "Nucleus",
      B: "Ribosome",
      C: "Mitochondria",
      D: "Golgi apparatus",
    },
    answer: "C",
    marks: 4,
  },
  {
    question: "Which country is famous for the Great Wall?",
    options: {
      A: "Japan",
      B: "China",
      C: "India",
      D: "Mongolia",
    },
    answer: "B",
    marks: 5,
  },
  {
    question: "Who discovered gravity?",
    options: {
      A: "Albert Einstein",
      B: "Isaac Newton",
      C: "Galileo Galilei",
      D: "Nikola Tesla",
    },
    answer: "B",
    marks: 4,
  },
  {
    question: "What is the square root of 64?",
    options: {
      A: "6",
      B: "8",
      C: "10",
      D: "12",
    },
    answer: "B",
    marks: 3,
  },
  {
    question: "Which is the longest river in the world?",
    options: {
      A: "Amazon River",
      B: "Yangtze River",
      C: "Nile River",
      D: "Mississippi River",
    },
    answer: "C",
    marks: 5,
  },
  {
    question: "Who is known as the father of computers?",
    options: {
      A: "Alan Turing",
      B: "Charles Babbage",
      C: "Steve Jobs",
      D: "Bill Gates",
    },
    answer: "B",
    marks: 4,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: {
      A: "Gold",
      B: "Iron",
      C: "Diamond",
      D: "Platinum",
    },
    answer: "C",
    marks: 5,
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    options: {
      A: "Oxygen",
      B: "Nitrogen",
      C: "Carbon Dioxide",
      D: "Hydrogen",
    },
    answer: "C",
    marks: 4,
  },
  {
    question: "Who invented the telephone?",
    options: {
      A: "Thomas Edison",
      B: "Alexander Graham Bell",
      C: "Nikola Tesla",
      D: "Guglielmo Marconi",
    },
    answer: "B",
    marks: 4,
  },
  {
    question: "What is the currency of the United Kingdom?",
    options: {
      A: "Dollar",
      B: "Euro",
      C: "Pound Sterling",
      D: "Rupee",
    },
    answer: "C",
    marks: 5,
  },
  {
    question: "What does HCl stand for in chemistry?",
    options: {
      A: "Hydrogen Carbonate",
      B: "Hydrochloric Acid",
      C: "Helium Chloride",
      D: "Hydrogen Chloride",
    },
    answer: "D",
    marks: 4,
  },
  {
    question: "What is the capital of Australia?",
    options: {
      A: "Sydney",
      B: "Melbourne",
      C: "Canberra",
      D: "Brisbane",
    },
    answer: "C",
    marks: 5,
  },
  {
    question: "Who developed the theory of relativity?",
    options: {
      A: "Isaac Newton",
      B: "Albert Einstein",
      C: "Stephen Hawking",
      D: "Galileo Galilei",
    },
    answer: "B",
    marks: 5,
  },
];

// Function to insert questions into the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/mcq");

    console.log("Connected to MongoDB");

    // Insert new questions
    await QuestionsModel.insertMany(questionsData);
    console.log("Questions added successfully");

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the function
seedDatabase();
