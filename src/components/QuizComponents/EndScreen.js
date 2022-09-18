import React, { useContext } from "react";
import { QuizContext } from "./Contexts";
import { Questions } from "./QuestionBank";
import "./QuizApp.css";

const EndScreen = () => {
  const { score, setScore, setGameState } = useContext(QuizContext);
  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  };

  return (
    <div className="endScreen">
      <h1>Quiz Finished</h1>
      <h3>
        {score} / {Questions.length}
      </h3>
      <button onClick={restartQuiz}>Restart Quiz</button>
      <p>
        Sourced from Quizlet cards created by{" "}
        {
          <a href="https://quizlet.com/516960337/financial-literacy-quiz-questions-flash-cards/">
            TUI_QZ_SHAREDACCT
          </a>
        }
        ,{" "}
        {
          <a href="https://quizlet.com/76279408/financial-literacy-flash-cards/">
            Wizcode
          </a>
        }
        , and{" "}
        {<a href="https://quizlet.com/62515839/everfi-flash-cards/">caklein</a>}
      </p>
    </div>
  );
};

export default EndScreen;
