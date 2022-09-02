import React, { useContext } from "react";
import { QuizContext } from "./Contexts";
import { Questions } from "./QuestionBank";
import "./QuizApp.css";

const EndScreen = () => {
  const { score, setScore, setGameState } = useContext(QuizContext);
  const restartQuiz = () => {
    setScore(0);
    setGameState("menu")
  }

  return (
    <div className="endScreen">
      <h1>Quiz Finished</h1>
      <h3>{score} / {Questions.length}</h3>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;
