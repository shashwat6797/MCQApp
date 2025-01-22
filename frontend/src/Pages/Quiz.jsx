import { useAtom } from "jotai";
import { useAxios } from "../context/AuthProvider";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { usernameAtom } from "../jotai";
import QuizQuestion from "../components/QuizQuestion";
import GameOver from "../components/GameOver";
import GameStart from "../components/GameStart";

const Quiz = () => {
  const socketRef = useRef(null);
  const api = useAxios();
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [username] = useAtom(usernameAtom);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

    socketRef.current.on("start-question", (data) => {
      if (data) {
        setQuestion(data.question);
        setTimer(data.timer);
        setIsStart(true);
      }
    });

    socketRef.current.on("timer-update", (data) => {
      setTimer(data);
    });

    socketRef.current.on("exam-finished", () => {
      setExamFinished(true);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (timer == 1) {
      if (currentIndex + 1 < 10) {
        setCurrentIndex(currentIndex + 1);
        socketRef.current.emit("next-question", currentIndex + 1);
      } else {
        setExamFinished(true);
      }
    }
  }, [timer]);

  useEffect(() => {
    if (examFinished) {
      api
        .post(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_TEST_URL}/result`,
          { answers: answers },
        )
        .then((res) => {
          setScore(res.data.score);
        })
        .catch((error) => {
          console.log("error while submitting result ", error);
        });
    }
  }, [examFinished]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, { questionId: question._id, answer }]);
    setCurrentIndex(currentIndex + 1);
    if (currentIndex + 1 < 10) {
      socketRef.current.emit("next-question", currentIndex + 1);
    } else {
      setExamFinished(true);
    }
  };

  const handleStart = () => {
    socketRef.current.emit("new-test", username);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-purple-900">
      {!examFinished ? (
        <div>
          {isStart ? (
            <QuizQuestion
              questionData={question}
              index={currentIndex}
              onSubmit={handleAnswer}
              time={timer}
            />
          ) : (
            <GameStart onStart={handleStart} />
          )}
        </div>
      ) : (
        <GameOver score={score} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Quiz;
