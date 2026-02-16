// Game Types for Learniverse Math Tug of War

export type Operation = '+' | '-' | '×' | '÷';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  displayText: string;
}

export interface Player {
  id: 'left' | 'right';
  name: string;
  score: number;
  currentQuestion: Question | null;
  inputValue: string;
  isCorrect: boolean | null;
  streak: number;
}

export interface GameState {
  players: {
    left: Player;
    right: Player;
  };
  ropePosition: number; // -5 (left wins) to 5 (right wins), 0 is center
  winThreshold: number;
  gameStatus: 'waiting' | 'playing' | 'finished';
  winner: 'left' | 'right' | null;
  difficulty: Difficulty;
  roundNumber: number;
  roundLocked: boolean;
}

export interface GameConfig {
  winThreshold: number;
  difficulty: Difficulty;
  playerLeftName: string;
  playerRightName: string;
}

// Difficulty settings
export interface DifficultyConfig {
  addition: { min: number; max: number };
  subtraction: { min: number; max: number };
  multiplication: { min: number; max: number };
  division: { min: number; max: number };
  operations: Operation[];
}

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    addition: { min: 1, max: 10 },
    subtraction: { min: 1, max: 10 },
    multiplication: { min: 1, max: 5 },
    division: { min: 1, max: 5 },
    operations: ['+', '-'],
  },
  medium: {
    addition: { min: 10, max: 50 },
    subtraction: { min: 10, max: 50 },
    multiplication: { min: 2, max: 12 },
    division: { min: 2, max: 12 },
    operations: ['+', '-', '×'],
  },
  hard: {
    addition: { min: 50, max: 200 },
    subtraction: { min: 50, max: 200 },
    multiplication: { min: 5, max: 15 },
    division: { min: 2, max: 15 },
    operations: ['+', '-', '×', '÷'],
  },
};
