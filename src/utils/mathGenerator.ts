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

// Shuffle array (Fisher-Yates)
const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate wrong options that are plausible but not the correct answer
const generateWrongOptions = (correctAnswer: number, count: number): number[] => {
  const wrongOptions: Set<number> = new Set();
  
  // Generate plausible wrong answers near the correct one
  while (wrongOptions.size < count) {
    // Random offset between -10 and +10, but not 0
    let offset = randomInRange(1, 10) * (Math.random() > 0.5 ? 1 : -1);
    
    // Sometimes use multiplicative offsets for variety
    if (Math.random() > 0.7) {
      offset = Math.floor(correctAnswer * (Math.random() > 0.5 ? 0.1 : -0.1) * randomInRange(1, 5));
      if (offset === 0) offset = randomInRange(1, 5);
    }
    
    const wrongAnswer = correctAnswer + offset;
    
    // Ensure wrong answer is valid (not equal to correct, not negative for easy questions)
    if (wrongAnswer !== correctAnswer && wrongAnswer >= 0 && !wrongOptions.has(wrongAnswer)) {
      wrongOptions.add(wrongAnswer);
    }
  }
  
  return Array.from(wrongOptions);
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

  // Generate 2 wrong options and shuffle with correct answer
  const wrongOptions = generateWrongOptions(answer, 2);
  const options = shuffleArray([answer, ...wrongOptions]);

  return {
    id: generateId(),
    num1,
    num2,
    operation,
    answer,
    displayText: `${num1} ${operation} ${num2} = ?`,
    options,
  };
};

// Generate two different but equal-difficulty questions for both players
export const generateQuestionPair = (difficulty: Difficulty): [Question, Question] => {
  return [generateQuestion(difficulty), generateQuestion(difficulty)];
};

// Validate MCQ answer
export const validateAnswer = (question: Question, selectedOption: number): boolean => {
  return selectedOption === question.answer;
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
