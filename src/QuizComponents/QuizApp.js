import React, { useState } from "react";
import EndScreen from "./EndScreen";
import MainMenu from "./MainMenu";
import Quiz from "./Quiz";
import { QuizContext } from "./Contexts";
import SideNav from "../components/NavBars/SideNav";

const App = () => {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);

  return (
    <div className="budget d-flex">
      <div>
        <SideNav />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <div className="quiz-app">
            <QuizContext.Provider
              value={{ gameState, setGameState, score, setScore }}
            >
              {gameState === "menu" && <MainMenu />}
              {gameState === "quiz" && <Quiz />}
              {gameState === "endScreen" && <EndScreen />}
            </QuizContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
