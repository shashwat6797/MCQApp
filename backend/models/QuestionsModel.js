const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question text is required"],
  },
  options: {
    A: { type: String, required: [true, "Option A is required"] },
    B: { type: String, required: [true, "Option B is required"] },
    C: { type: String, required: [true, "Option C is required"] },
    D: { type: String, required: [true, "Option D is required"] },
  },
  answer: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: [true, "Correct option is required"],
  },
  marks: {
    type: Number,
    min: [0, "Marks cannot be negative"],
    max: [5, "Marks cannot exceed 5"],
    required: [true, "Marks are required"],
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
