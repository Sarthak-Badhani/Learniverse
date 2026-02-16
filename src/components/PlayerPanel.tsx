import { useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../types/game';

interface PlayerPanelProps {
  player: Player;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  isWinner: boolean;
}

export const PlayerPanel = ({
  player,
  onInputChange,
  onSubmit,
  disabled,
  isWinner,
}: PlayerPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isLeft = player.id === 'left';

  // Focus handling
  useEffect(() => {
    if (!disabled && player.currentQuestion && inputRef.current) {
      // Don't auto-focus to allow both players to type
    }
  }, [disabled, player.currentQuestion]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && player.inputValue) {
      onSubmit();
    }
  };

  const bgColorClass = isLeft
    ? 'from-blue-500 to-blue-600'
    : 'from-red-500 to-red-600';

  const borderColorClass = isLeft
    ? 'border-blue-300'
    : 'border-red-300';

  const inputClass = isLeft
    ? 'player-input-left'
    : 'player-input-right';

  return (
    <motion.div
      className={`relative flex-1 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${bgColorClass} shadow-xl`}
      animate={isWinner ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: isWinner ? Infinity : 0, duration: 0.5 }}
    >
      {/* Winner overlay */}
      <AnimatePresence>
        {isWinner && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl sm:rounded-2xl z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-4xl sm:text-6xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player name and score */}
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h2 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg truncate max-w-[120px] sm:max-w-none">
          {player.name}
        </h2>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-white/80 text-xs sm:text-sm hidden sm:inline">Score:</span>
          <motion.span
            key={player.score}
            className="text-xl sm:text-3xl font-bold text-white"
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
          >
            {player.score}
          </motion.span>
        </div>
      </div>

      {/* Streak indicator */}
      {player.streak > 1 && (
        <motion.div
          className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-400 text-yellow-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          🔥 {player.streak} streak!
        </motion.div>
      )}

      {/* Question display */}
      {player.currentQuestion && (
        <motion.div
          key={player.currentQuestion.id}
          className={`bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 border-2 ${borderColorClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-2 sm:mb-4">
            <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
              {player.currentQuestion.displayText}
            </span>
          </div>

          {/* Answer input */}
          <div className="flex gap-1 sm:gap-2">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="-?[0-9]*"
              value={player.inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="?"
              className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-center rounded-lg 
                bg-white text-gray-800 placeholder-gray-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all ${inputClass}`}
            />
            <motion.button
              onClick={onSubmit}
              disabled={disabled || !player.inputValue}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base
                ${isLeft ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'}
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GO!
            </motion.button>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {player.isCorrect === false && (
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-white bg-red-600/80 px-3 py-1 rounded-full text-sm">
                  ❌ Try again!
                </span>
              </motion.div>
            )}
            {player.isCorrect === true && (
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-white bg-green-600/80 px-3 py-1 rounded-full text-sm">
                  ✅ Correct!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Waiting state */}
      {!player.currentQuestion && (
        <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-8 text-center">
          <span className="text-white/80 text-sm sm:text-lg">Waiting to start...</span>
        </div>
      )}
    </motion.div>
  );
};
