import React, { useContext } from "react";
import { QuizContext } from "./Contexts";
import "./QuizApp.css";

const MainMenu = () => {
  const { gameState, setGameState } = useContext(QuizContext);
  return (
    <div className="main-menu-quiz">
      <h3>Put Your Financial Literacy To The Test</h3>
      <button
        onClick={() => {
          setGameState("quiz");
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default MainMenu;
