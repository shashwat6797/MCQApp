// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotevn = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const authRouter = require("./routes/authRoutes");
const testRouter = require("./routes/testRoutes");
const questionRouter = require("./routes/questionRoutes");
const { getRandomQuestions } = require("./controller/questionController");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: ["http://localhost:5173"] });

let timer = 60;

const newGame = {
  endGame: false,
  async startGame(socket) {
    let quesTimer;
    socket?.on("next-question", (data) => {
      clearInterval(quesTimer);
      if (data < 10 && !this.endGame) {
        newQues(data);
      }
    });
    questions = await getRandomQuestions(10);
    const newQues = (i) => {
      let time = 60;
      socket?.emit("start-question", {
        question: questions[i],
        timer: timer,
      });
      quesTimer = setInterval(() => {
        time--;
        socket?.emit("timer-update", time);

        if (time === 0 || this.endGame) {
          clearInterval(quesTimer);
          if (i < 10 && !this.endGame) {
            i++;
            newQues();
          }
        }
      }, 1000);
    };
    if (!this.endGame) newQues(0);
  },
};

io.on("connection", (socket) => {
  const game = newGame;
  socket.on("new-test", (username) => {
    game.endGame = false;
    game.startGame(socket);
  });
  socket.on("disconnect", () => {
    game.endGame = true;
  });
});
dotevn.config();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/test", testRouter);

app.use("/api/question/", questionRouter);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server Running!");
});

app.use("/api/auth", authRouter);

const mongo_url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/mcq";

mongoose
  .connect(`${mongo_url}`)
  .then(() => {
    console.log("Connected to DB!");
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error occured while connecting to DB ${error}`);
  });
