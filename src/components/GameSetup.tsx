import { useState } from 'react';
import { motion } from 'framer-motion';
import { Difficulty, GameConfig } from '../types/game';
import { getDifficultyDescription } from '../utils/mathGenerator';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
}

export const GameSetup = ({ onStartGame }: GameSetupProps) => {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [winThreshold, setWinThreshold] = useState(5);

  const handleStart = () => {
    onStartGame({
      playerLeftName: player1Name || 'Player 1',
      playerRightName: player2Name || 'Player 2',
      difficulty,
      winThreshold,
    });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 max-w-lg w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <motion.h1
            className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🎮 Math Tug of War
          </motion.h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Answer math questions faster to win!
          </p>
        </div>

        {/* Player Names */}
        <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-blue-600 mb-1">
                🔵 Player 1
              </label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                placeholder="Enter name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-red-600 mb-1">
                🔴 Player 2
              </label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none text-sm sm:text-base"
                placeholder="Enter name"
              />
            </div>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            📊 Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
              <motion.button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold capitalize transition-all text-xs sm:text-base
                  ${
                    difficulty === level
                      ? level === 'easy'
                        ? 'bg-green-500 text-white'
                        : level === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">{level === 'easy' && '🌱 '}{level === 'medium' && '🌿 '}{level === 'hard' && '🌲 '}</span>
                {level}
              </motion.button>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
            {getDifficultyDescription(difficulty)}
          </p>
        </div>

        {/* Win Threshold */}
        <div className="mb-4 sm:mb-8">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            🏆 Points to Win: <span className="font-bold text-purple-600">{winThreshold}</span>
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={winThreshold}
            onChange={(e) => setWinThreshold(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mt-1">
            <span>Quick (3)</span>
            <span>Standard (5)</span>
            <span>Long (10)</span>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg sm:text-xl font-bold rounded-xl shadow-lg"
          whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.98 }}
        >
          🚀 Start Game!
        </motion.button>

        {/* Instructions */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>💡 Both players play on the same device!</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
