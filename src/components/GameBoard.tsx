import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '../types/game';
import { PlayerPanel } from './PlayerPanel';
import { Rope } from './Rope';

interface GameBoardProps {
  gameState: GameState;
  onOptionSelect: (playerId: 'left' | 'right', option: number) => void;
  onStart: () => void;
}

export const GameBoard = ({
  gameState,
  onOptionSelect,
  onStart,
}: GameBoardProps) => {
  const isPlaying = gameState.gameStatus === 'playing';
  const isWaiting = gameState.gameStatus === 'waiting';
  const isFinished = gameState.gameStatus === 'finished';

  // Determine who scored this round
  const leftScored = gameState.roundLocked && gameState.players.left.isCorrect === true;
  const rightScored = gameState.roundLocked && gameState.players.right.isCorrect === true;
  const scorerName = leftScored 
    ? gameState.players.left.name 
    : rightScored 
      ? gameState.players.right.name 
      : null;

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 overflow-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-2 sm:mb-4 flex-shrink-0"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg">
          🎮 Math Tug of War
        </h1>
        <p className="text-white/80 text-xs sm:text-base">
          Round {gameState.roundNumber} • {gameState.difficulty.toUpperCase()} Mode
        </p>
      </motion.div>

      {/* Start Button - Show prominently when waiting */}
      {isWaiting && (
        <motion.div
          className="text-center mb-4 sm:mb-6 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <motion.button
            onClick={onStart}
            className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-lg sm:text-2xl font-bold rounded-2xl shadow-xl border-4 border-white/30"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ['0 0 20px rgba(52,211,153,0.5)', '0 0 40px rgba(52,211,153,0.8)', '0 0 20px rgba(52,211,153,0.5)']
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🎯 Start Game!
          </motion.button>
        </motion.div>
      )}

      {/* Game Area */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
        {/* Player Panels - Stack on mobile, side by side on tablet+ */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-2 sm:mb-4">
          <PlayerPanel
            player={gameState.players.left}
            onOptionSelect={(option) => onOptionSelect('left', option)}
            disabled={!isPlaying || gameState.roundLocked}
            isWinner={gameState.winner === 'left'}
          />
          <PlayerPanel
            player={gameState.players.right}
            onOptionSelect={(option) => onOptionSelect('right', option)}
            disabled={!isPlaying || gameState.roundLocked}
            isWinner={gameState.winner === 'right'}
          />
        </div>

        {/* Rope Visualization */}
        <Rope position={gameState.ropePosition} winThreshold={gameState.winThreshold} />

        {/* Point Scored Animation Overlay */}
        <AnimatePresence>
          {gameState.roundLocked && !isFinished && scorerName && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Burst effect */}
              <motion.div
                className={`absolute w-64 h-64 rounded-full ${leftScored ? 'bg-blue-400' : 'bg-red-400'}`}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              
              {/* Score banner */}
              <motion.div
                className={`relative px-8 py-4 rounded-2xl shadow-2xl ${leftScored ? 'bg-blue-500' : 'bg-red-500'}`}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.span 
                    className="text-4xl sm:text-6xl block"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                  >
                    ⚡
                  </motion.span>
                  <p className="text-white font-bold text-xl sm:text-2xl mt-2">
                    {scorerName} scores!
                  </p>
                  <p className="text-white/80 text-sm sm:text-base">
                    +1 Point • Rope pulled!
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Flying stars */}
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1,
                    scale: 1 
                  }}
                  animate={{ 
                    x: Math.cos(i * Math.PI / 4) * 150,
                    y: Math.sin(i * Math.PI / 4) * 150,
                    opacity: 0,
                    scale: 0.5,
                    rotate: 360
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  ⭐
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Round Status */}
        {isPlaying && gameState.roundLocked && !isFinished && (
          <motion.div
            className="text-center mt-2 sm:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.p 
              className="text-white text-base sm:text-xl font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              🎯 Get ready for Round {gameState.roundNumber + 1}...
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-2 sm:mt-4">
        <p className="text-white/60 text-xs sm:text-sm">
          First to pull the rope {gameState.winThreshold} positions wins!
        </p>
      </div>
    </div>
  );
};
