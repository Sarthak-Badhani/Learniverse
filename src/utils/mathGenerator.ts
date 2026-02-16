import { Question, Difficulty, DIFFICULTY_SETTINGS } from '../types/game';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Get random number in range (inclusive)
const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Pick random item from array
const randomPick = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Generate a math question based on difficulty
export const generateQuestion = (difficulty: Difficulty): Question => {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const operation = randomPick(settings.operations);

  let num1: number;
  let num2: number;
  let answer: number;

  switch (operation) {
    case '+': {
      const { min, max } = settings.addition;
      num1 = randomInRange(min, max);
      num2 = randomInRange(min, max);
      answer = num1 + num2;
      break;
    }
    case '-': {
      const { min, max } = settings.subtraction;
      // Ensure positive result (larger number first)
      const a = randomInRange(min, max);
      const b = randomInRange(min, max);
      num1 = Math.max(a, b);
      num2 = Math.min(a, b);
      answer = num1 - num2;
      break;
    }
    case '×': {
      const { min, max } = settings.multiplication;
      num1 = randomInRange(min, max);
      num2 = randomInRange(min, max);
      answer = num1 * num2;
      break;
    }
    case '÷': {
      const { min, max } = settings.division;
      // Generate division that results in whole number
      num2 = randomInRange(min, max);
      const quotient = randomInRange(min, max);
      num1 = num2 * quotient;
      answer = quotient;
      break;
    }
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }

  return {
    id: generateId(),
    num1,
    num2,
    operation,
    answer,
    displayText: `${num1} ${operation} ${num2} = ?`,
  };
};

// Generate two different but equal-difficulty questions for both players
export const generateQuestionPair = (difficulty: Difficulty): [Question, Question] => {
  return [generateQuestion(difficulty), generateQuestion(difficulty)];
};

// Validate answer
export const validateAnswer = (question: Question, userAnswer: string): boolean => {
  const parsed = parseInt(userAnswer, 10);
  if (isNaN(parsed)) return false;
  return parsed === question.answer;
};

// Get difficulty description
export const getDifficultyDescription = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'easy':
      return 'Addition & Subtraction (1-10)';
    case 'medium':
      return 'Add, Subtract & Multiply (up to 50)';
    case 'hard':
      return 'All Operations (larger numbers)';
  }
};

// Calculate adaptive difficulty based on performance
export const calculateAdaptiveDifficulty = (
  currentDifficulty: Difficulty,
  streak: number,
  totalCorrect: number,
  totalQuestions: number
): Difficulty => {
  const accuracy = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;

  // Increase difficulty if doing well
  if (streak >= 3 && accuracy >= 0.8) {
    if (currentDifficulty === 'easy') return 'medium';
    if (currentDifficulty === 'medium') return 'hard';
  }

  // Decrease difficulty if struggling
  if (streak === 0 && accuracy < 0.5 && totalQuestions >= 5) {
    if (currentDifficulty === 'hard') return 'medium';
    if (currentDifficulty === 'medium') return 'easy';
  }

  return currentDifficulty;
};
