import React, { useState, useContext } from "react";
import EndScreen from "./EndScreen";
import MainMenu from "./MainMenu";
import Quiz from "./Quiz";
import { QuizContext } from "./Contexts";
// import SideNav from "../SideNav/SideNav";

const App = () => {
  const [gameState, setGameState] = useState("menu"); // gameState represents which state we are in (menu, playing, end)
  const [score, setScore] = useState(0);

  return (
    <div className="quiz-app">
      {/* <h5>Put Your Financial Literacy To The Test</h5> */}
      <h5>Quiz App</h5>
      <QuizContext.Provider value={{ gameState, setGameState, score, setScore }}>
        {gameState === "menu" && <MainMenu />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "endScreen" && <EndScreen />}
      </QuizContext.Provider>
    </div>
  );
};

export default App;
