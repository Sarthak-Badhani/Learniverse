import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../types/game';

interface PlayerPanelProps {
  player: Player;
  onOptionSelect: (option: number) => void;
  disabled: boolean;
  isWinner: boolean;
}

export const PlayerPanel = ({
  player,
  onOptionSelect,
  disabled,
  isWinner,
}: PlayerPanelProps) => {
  const isLeft = player.id === 'left';

  const bgColorClass = isLeft
    ? 'from-blue-500 to-blue-600'
    : 'from-red-500 to-red-600';

  const borderColorClass = isLeft
    ? 'border-blue-300'
    : 'border-red-300';

  const buttonColorClass = isLeft
    ? 'bg-blue-700 hover:bg-blue-800'
    : 'bg-red-700 hover:bg-red-800';

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
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="text-center mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.span 
              className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg inline-block"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.15 }}
            >
              {player.currentQuestion.displayText}
            </motion.span>
          </motion.div>

          {/* MCQ Options */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {player.currentQuestion.options.map((option, index) => {
              const isSelected = player.selectedOption === option;
              const isCorrectAnswer = option === player.currentQuestion!.answer;
              const showCorrect = player.isCorrect === true && isCorrectAnswer;
              const showWrong = isSelected && player.isCorrect === false;

              return (
                <motion.button
                  key={`${player.currentQuestion!.id}-${index}`}
                  onClick={() => onOptionSelect(option)}
                  disabled={disabled || player.isCorrect === true}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    ...(showWrong && { x: [0, -5, 5, -5, 5, 0] })
                  }}
                  transition={{ 
                    delay: 0.2 + index * 0.1,
                    type: 'spring',
                    stiffness: 400,
                    damping: 15
                  }}
                  className={`
                    px-2 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-lg sm:text-2xl
                    transition-colors
                    ${showCorrect 
                      ? 'bg-green-500 text-white ring-4 ring-green-300' 
                      : showWrong 
                        ? 'bg-red-400 text-white' 
                        : `bg-white text-gray-800 ${buttonColorClass.replace('bg-', 'hover:bg-').replace('hover:bg-', 'hover:text-white hover:bg-')}`
                    }
                    disabled:cursor-not-allowed
                    ${disabled && !showCorrect ? 'opacity-60' : ''}
                  `}
                  whileHover={!disabled && !player.isCorrect ? { scale: 1.08, y: -2 } : {}}
                  whileTap={!disabled && !player.isCorrect ? { scale: 0.92 } : {}}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {player.isCorrect === true && (
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-white bg-green-600/80 px-3 py-1 rounded-full text-sm">
                  ✅ Correct! +1 Point
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
