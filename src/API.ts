import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty,
): Promise<QuestionState[]> => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load questions right now. Please try again.");
  }

  const data = await response.json();

  if (
    !data ||
    data.response_code !== 0 ||
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new Error("Unable to load questions right now. Please try again.");
  }

  const validQuestions = data.results.every(
    (question: any) =>
      question &&
      typeof question.question === "string" &&
      typeof question.correct_answer === "string" &&
      Array.isArray(question.incorrect_answers) &&
      question.incorrect_answers.every(
        (answer: unknown) => typeof answer === "string",
      ),
  );

  if (!validQuestions) {
    throw new Error("Unable to load questions right now. Please try again.");
  }

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
