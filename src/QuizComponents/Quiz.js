// the quiz
import React, { useState, useContext } from "react";
import { Questions } from "./QuestionBank";
import { QuizContext } from "./Contexts";

const Quiz = () => {
  const [currQuestion, setCurrQuestion] = useState(0); // references element of questions arr
  const [optionChosen, setOptionChosen] = useState("");
  const { score, setScore, setGameState } = useContext(QuizContext);
  const nextQuestion = () => {
    if (Questions[currQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setCurrQuestion(currQuestion + 1);
  };
  const finishQuiz = () => {
    if (Questions[currQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setGameState("endScreen");
  };

  return (
    <div className="quiz">
      <h2 className="quiz-question">{Questions[currQuestion].prompt}</h2>
      <div className="quiz-options">
        <button onClick={() => setOptionChosen("A")} className="quiz">
          {Questions[currQuestion].optionA}
        </button>
        <button onClick={() => setOptionChosen("B")} className="quiz">
          {Questions[currQuestion].optionB}
        </button>
        <button onClick={() => setOptionChosen("C")} className="quiz">
          {Questions[currQuestion].optionC}
        </button>
        <button onClick={() => setOptionChosen("D")} className="quiz">
          {Questions[currQuestion].optionD}
        </button>
        <br />
        <br />
      </div>
      {currQuestion == Questions.length - 1 ? (
        <button onClick={finishQuiz} className="next-button">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} className="next-button">
          Next Question
        </button>
      )}
    </div>
  );
};

export default Quiz;
