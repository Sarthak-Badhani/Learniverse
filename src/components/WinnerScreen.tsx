import { motion } from 'framer-motion';
import { GameState } from '../types/game';

interface WinnerScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export const WinnerScreen = ({ gameState, onPlayAgain, onNewGame }: WinnerScreenProps) => {
  const winner = gameState.winner;
  const winnerPlayer = winner ? gameState.players[winner] : null;

  if (!winnerPlayer) return null;

  const isLeft = winner === 'left';

  // Generate confetti
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: isLeft ? '#3b82f6' : '#ef4444',
    size: 8 + Math.random() * 12,
  }));

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            borderRadius: '50%',
          }}
          initial={{ y: -100, opacity: 1 }}
          animate={{ y: '100vh', opacity: 0 }}
          transition={{ duration: 3, delay: c.delay, ease: 'easeIn' }}
        />
      ))}

      {/* Winner Card */}
      <motion.div
        className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 max-w-md w-full mx-2 sm:mx-4 text-center relative overflow-hidden`}
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 opacity-10 ${
            isLeft
              ? 'bg-gradient-to-br from-blue-500 to-blue-700'
              : 'bg-gradient-to-br from-red-500 to-red-700'
          }`}
        />

        <div className="relative z-10">
          {/* Trophy */}
          <motion.div
            className="text-6xl sm:text-8xl mb-2 sm:mb-4"
            animate={{ rotate: [0, -10, 10, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🏆
          </motion.div>

          {/* Winner text */}
          <motion.h2
            className={`text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 ${
              isLeft ? 'text-blue-600' : 'text-red-600'
            }`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {winnerPlayer.name} Wins!
          </motion.h2>

          <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
            Final Score: {winnerPlayer.score} points
          </p>

          {/* Stats */}
          <div className="bg-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Game Stats</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-gray-500">Total Rounds</p>
                <p className="font-bold text-base sm:text-lg">{gameState.roundNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Win Margin</p>
                <p className="font-bold text-base sm:text-lg">
                  {Math.abs(gameState.players.left.score - gameState.players.right.score)}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              onClick={onPlayAgain}
              className={`flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-white text-sm sm:text-base ${
                isLeft ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Again
            </motion.button>
            <motion.button
              onClick={onNewGame}
              className="flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚙️ New
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
