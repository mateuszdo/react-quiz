import React, { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionState } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";
//styles

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setGameOver(false);
    setShowResults(false);

    try {
      const newQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY,
      );
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load questions right now. Please try again.";

      setQuestions([]);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setGameOver(true);
      setShowResults(false);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver || isLoading || userAnswers[number]) {
      return;
    }

    const answer = e.currentTarget.innerText;
    const currentQuestion = questions[number];

    if (!currentQuestion) {
      return;
    }

    const correct = currentQuestion.correct_answer === answer;

    if (correct) {
      setScore((prev) => prev + 1);
    }

    const answerObject = {
      question: currentQuestion.question,
      answer,
      correct,
      correctAnswer: currentQuestion.correct_answer,
    };

    setUserAnswers((prev) => [...prev, answerObject]);

    if (number === TOTAL_QUESTIONS - 1) {
      setGameOver(true);
      setShowResults(true);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ >= TOTAL_QUESTIONS) {
      setGameOver(true);
      setShowResults(true);
      return;
    }

    setNumber(nextQ);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {error && <p className="error">{error}</p>}
        {gameOver && !showResults && !isLoading && (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        )}
        {!gameOver && !isLoading && <p className="score">Score: {score}</p>}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !gameOver && questions[number] && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !isLoading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        {showResults && !isLoading && (
          <div className="results">
            <h2>Quiz Completed</h2>
            <p className="score">
              You scored {score} out of {TOTAL_QUESTIONS}
            </p>
            <button className="start" onClick={startTrivia}>
              Play Again
            </button>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default App;
