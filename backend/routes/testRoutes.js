const express = require("express");
const QuestionsModel = require("../models/QuestionsModel");
const testRouter = express.Router();

testRouter.post("/result", async (req, res) => {
  const { answers } = req.body;
  score = 0;
  const scorePromises = answers.map(async (ans) => {
    const ques = await QuestionsModel.findOne({ _id: ans.questionId });
    if (ans.answer == ques.answer) {
      score = score + ques.marks;
    }
  });
  await Promise.all(scorePromises);
  res.json({ status: 200, message: "Submitted", score });
});

module.exports = testRouter;
