import { motion } from 'framer-motion';
import { GameState } from '../types/game';
import { PlayerPanel } from './PlayerPanel';
import { Rope } from './Rope';

interface GameBoardProps {
  gameState: GameState;
  onInputChange: (playerId: 'left' | 'right', value: string) => void;
  onSubmit: (playerId: 'left' | 'right') => void;
  onStart: () => void;
}

export const GameBoard = ({
  gameState,
  onInputChange,
  onSubmit,
  onStart,
}: GameBoardProps) => {
  const isPlaying = gameState.gameStatus === 'playing';
  const isWaiting = gameState.gameStatus === 'waiting';
  const isFinished = gameState.gameStatus === 'finished';

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4">
      {/* Header */}
      <motion.div
        className="text-center mb-2 sm:mb-4"
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

      {/* Game Area */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
        {/* Player Panels - Stack on mobile, side by side on tablet+ */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-2 sm:mb-4">
          <PlayerPanel
            player={gameState.players.left}
            onInputChange={(value) => onInputChange('left', value)}
            onSubmit={() => onSubmit('left')}
            disabled={!isPlaying || gameState.roundLocked}
            isWinner={gameState.winner === 'left'}
          />
          <PlayerPanel
            player={gameState.players.right}
            onInputChange={(value) => onInputChange('right', value)}
            onSubmit={() => onSubmit('right')}
            disabled={!isPlaying || gameState.roundLocked}
            isWinner={gameState.winner === 'right'}
          />
        </div>

        {/* Rope Visualization */}
        <Rope position={gameState.ropePosition} winThreshold={gameState.winThreshold} />

        {/* Start Button (when waiting) */}
        {isWaiting && (
          <motion.div
            className="text-center mt-4 sm:mt-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.button
              onClick={onStart}
              className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-purple-600 text-lg sm:text-2xl font-bold rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 Start Round 1!
            </motion.button>
          </motion.div>
        )}

        {/* Round Status */}
        {isPlaying && gameState.roundLocked && !isFinished && (
          <motion.div
            className="text-center mt-2 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white text-base sm:text-xl">
              ✨ Next question loading...
            </p>
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
