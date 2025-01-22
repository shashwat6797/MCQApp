const express = require("express");
const QuestionsModel = require("../models/QuestionsModel");

const questionRouter = express.Router();

questionRouter.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const question = new QuestionsModel(req.body);
    await question.save();
    res.json({ status: 200, message: "question added" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = questionRouter;
