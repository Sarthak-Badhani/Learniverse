import { useState, useCallback, useEffect } from 'react';
import { GameState, GameConfig, Player } from '../types/game';
import { generateQuestionPair, validateAnswer } from '../utils/mathGenerator';

const createInitialPlayer = (id: 'left' | 'right', name: string): Player => ({
  id,
  name,
  score: 0,
  currentQuestion: null,
  selectedOption: null,
  isCorrect: null,
  streak: 0,
});

const createInitialState = (config: GameConfig): GameState => ({
  players: {
    left: createInitialPlayer('left', config.playerLeftName),
    right: createInitialPlayer('right', config.playerRightName),
  },
  ropePosition: 0,
  winThreshold: config.winThreshold,
  gameStatus: 'waiting',
  winner: null,
  difficulty: config.difficulty,
  roundNumber: 0,
  roundLocked: false,
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [config, setConfig] = useState<GameConfig>({
    winThreshold: 5,
    difficulty: 'easy',
    playerLeftName: 'Player 1',
    playerRightName: 'Player 2',
  });

  // Initialize game
  const initializeGame = useCallback((newConfig: GameConfig) => {
    setConfig(newConfig);
    const state = createInitialState(newConfig);
    setGameState(state);
  }, []);

  // Start the game
  const startGame = useCallback(() => {
    if (!gameState) return;

    const [leftQuestion, rightQuestion] = generateQuestionPair(gameState.difficulty);

    setGameState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        gameStatus: 'playing',
        roundNumber: 1,
        roundLocked: false,
        players: {
          left: {
            ...prev.players.left,
            currentQuestion: leftQuestion,
            selectedOption: null,
            isCorrect: null,
          },
          right: {
            ...prev.players.right,
            currentQuestion: rightQuestion,
            selectedOption: null,
            isCorrect: null,
          },
        },
      };
    });
  }, [gameState]);

  // Handle option selection (MCQ)
  const handleOptionSelect = useCallback(
    (playerId: 'left' | 'right', selectedOption: number) => {
      setGameState((prev) => {
        if (!prev || prev.gameStatus !== 'playing' || prev.roundLocked) return prev;

        const player = prev.players[playerId];
        if (!player.currentQuestion) return prev;

        const isCorrect = validateAnswer(player.currentQuestion, selectedOption);

        if (!isCorrect) {
          // Wrong answer - mark incorrect, player can still try other options
          return {
            ...prev,
            players: {
              ...prev.players,
              [playerId]: {
                ...player,
                selectedOption,
                isCorrect: false,
                streak: 0,
              },
            },
          };
        }

        // Correct! Lock round and move rope
        const ropeChange = playerId === 'left' ? -1 : 1;
        const newRopePosition = prev.ropePosition + ropeChange;

        // Check for winner
        const isLeftWin = newRopePosition <= -prev.winThreshold;
        const isRightWin = newRopePosition >= prev.winThreshold;
        const hasWinner = isLeftWin || isRightWin;

        return {
          ...prev,
          roundLocked: true,
          ropePosition: newRopePosition,
          gameStatus: hasWinner ? 'finished' : 'playing',
          winner: isLeftWin ? 'left' : isRightWin ? 'right' : null,
          players: {
            ...prev.players,
            [playerId]: {
              ...player,
              selectedOption,
              isCorrect: true,
              score: player.score + 1,
              streak: player.streak + 1,
            },
          },
        };
      });
    },
    []
  );

  // Next round (after correct answer)
  const nextRound = useCallback(() => {
    setGameState((prev) => {
      if (!prev || prev.gameStatus === 'finished') return prev;

      const [leftQuestion, rightQuestion] = generateQuestionPair(prev.difficulty);

      return {
        ...prev,
        roundNumber: prev.roundNumber + 1,
        roundLocked: false,
        players: {
          left: {
            ...prev.players.left,
            currentQuestion: leftQuestion,
            selectedOption: null,
            isCorrect: null,
          },
          right: {
            ...prev.players.right,
            currentQuestion: rightQuestion,
            selectedOption: null,
            isCorrect: null,
          },
        },
      };
    });
  }, []);

  // Auto advance to next round after correct answer
  useEffect(() => {
    if (gameState?.roundLocked && gameState.gameStatus === 'playing') {
      const timer = setTimeout(nextRound, 1500); // 1.5s delay for animation
      return () => clearTimeout(timer);
    }
  }, [gameState?.roundLocked, gameState?.gameStatus, nextRound]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState(null);
  }, []);

  // Restart with same config
  const restartGame = useCallback(() => {
    initializeGame(config);
  }, [config, initializeGame]);

  return {
    gameState,
    config,
    initializeGame,
    startGame,
    handleOptionSelect,
    nextRound,
    resetGame,
    restartGame,
  };
};
