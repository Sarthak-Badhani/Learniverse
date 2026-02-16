import { motion } from 'framer-motion';

interface RopeProps {
  position: number; // -5 to 5
  winThreshold: number;
}

// Animated stick figure pulling rope - LEFT side (facing RIGHT, pulling left)
const LeftPullingFigure = ({ color, isWinning }: { color: string; isWinning: boolean }) => {
  const skinColor = '#FFD5B5';
  const pullIntensity = isWinning ? 1 : 0.5;
  
  return (
    <motion.svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      animate={isWinning ? { x: [0, -8, 0] } : { x: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: isWinning ? 0.25 : 0.5, ease: 'easeInOut' }}
    >
      {/* Head */}
      <motion.circle cx="25" cy="12" r="10" fill={skinColor} stroke={color} strokeWidth="2"
        animate={{ cx: [25, 22, 25] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Eyes - looking right */}
      <motion.circle cx="28" cy="10" r="2" fill="#333" animate={{ cx: [28, 25, 28] }} transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }} />
      <motion.circle cx="32" cy="10" r="2" fill="#333" animate={{ cx: [32, 29, 32] }} transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }} />
      {/* Mouth */}
      <motion.path d="M 26 16 Q 29 18 32 16" stroke="#333" strokeWidth="1.5" fill="none" />

      {/* Body - leaning left (backward) */}
      <motion.line x1="25" y1="22" x2="18" y2="45" stroke={color} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [25, 22, 25], x2: [18, 12, 18] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Arms reaching RIGHT toward rope */}
      <motion.line x1="22" y1="28" x2="55" y2="40" stroke={skinColor} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [22, 19, 22], x2: [55, 50, 55] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Hand gripping */}
      <motion.circle cx="55" cy="40" r="4" fill={skinColor} stroke={color} strokeWidth="1"
        animate={{ cx: [55, 50, 55] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Left leg - back */}
      <motion.line x1="18" y1="45" x2="5" y2="72" stroke={color} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [18, 12, 18], x2: [5, 0, 5] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Right leg - front */}
      <motion.line x1="18" y1="45" x2="28" y2="72" stroke={color} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [18, 12, 18] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Feet */}
      <motion.ellipse cx="5" cy="74" rx="6" ry="3" fill={color}
        animate={{ cx: [5, 0, 5] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      <ellipse cx="28" cy="74" rx="6" ry="3" fill={color} />

      {/* Sweat when winning */}
      {isWinning && (
        <>
          <motion.circle cx="15" cy="5" r="2" fill="#87CEEB"
            animate={{ cy: [5, 20], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        </>
      )}
    </motion.svg>
  );
};

// Animated stick figure pulling rope - RIGHT side (facing LEFT, pulling right)
const RightPullingFigure = ({ color, isWinning }: { color: string; isWinning: boolean }) => {
  const skinColor = '#FFD5B5';
  const pullIntensity = isWinning ? 1 : 0.5;
  
  return (
    <motion.svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      animate={isWinning ? { x: [0, 8, 0] } : { x: [0, 3, 0] }}
      transition={{ repeat: Infinity, duration: isWinning ? 0.25 : 0.5, ease: 'easeInOut' }}
    >
      {/* Head */}
      <motion.circle cx="35" cy="12" r="10" fill={skinColor} stroke={color} strokeWidth="2"
        animate={{ cx: [35, 38, 35] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Eyes - looking left */}
      <motion.circle cx="28" cy="10" r="2" fill="#333" animate={{ cx: [28, 31, 28] }} transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }} />
      <motion.circle cx="32" cy="10" r="2" fill="#333" animate={{ cx: [32, 35, 32] }} transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }} />
      {/* Mouth */}
      <motion.path d="M 28 16 Q 31 18 34 16" stroke="#333" strokeWidth="1.5" fill="none" />

      {/* Body - leaning right (backward) */}
      <motion.line x1="35" y1="22" x2="42" y2="45" stroke={color} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [35, 38, 35], x2: [42, 48, 42] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Arms reaching LEFT toward rope */}
      <motion.line x1="38" y1="28" x2="5" y2="40" stroke={skinColor} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [38, 41, 38], x2: [5, 10, 5] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Hand gripping */}
      <motion.circle cx="5" cy="40" r="4" fill={skinColor} stroke={color} strokeWidth="1"
        animate={{ cx: [5, 10, 5] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Right leg - back */}
      <motion.line x1="42" y1="45" x2="55" y2="72" stroke={color} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [42, 48, 42], x2: [55, 60, 55] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Left leg - front */}
      <motion.line x1="42" y1="45" x2="32" y2="72" stroke={color} strokeWidth="4" strokeLinecap="round"
        animate={{ x1: [42, 48, 42] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Feet */}
      <motion.ellipse cx="55" cy="74" rx="6" ry="3" fill={color}
        animate={{ cx: [55, 60, 55] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      <ellipse cx="32" cy="74" rx="6" ry="3" fill={color} />

      {/* Sweat when winning */}
      {isWinning && (
        <>
          <motion.circle cx="45" cy="5" r="2" fill="#87CEEB"
            animate={{ cy: [5, 20], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        </>
      )}
    </motion.svg>
  );
};

export const Rope = ({ position, winThreshold }: RopeProps) => {
  // Calculate percentage offset (-100% to 100%)
  const percentage = (position / winThreshold) * 50;
  const leftIsWinning = position < 0;
  const rightIsWinning = position > 0;

  return (
    <div className="relative w-full h-28 sm:h-48 my-2 sm:my-8 overflow-hidden">
      {/* Background - Tug of War Field */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-red-100 rounded-xl sm:rounded-2xl shadow-inner">
        {/* Grass/Ground texture */}
        <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-8 bg-gradient-to-t from-green-300 to-green-200 rounded-b-xl sm:rounded-b-2xl" />
        
        {/* Win zones */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-blue-500/20 rounded-l-xl sm:rounded-l-2xl flex items-center justify-center">
          <span className="text-lg sm:text-3xl">🏆</span>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-red-500/20 rounded-r-xl sm:rounded-r-2xl flex items-center justify-center">
          <span className="text-lg sm:text-3xl">🏆</span>
        </div>

        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-gray-400 transform -translate-x-1/2 opacity-50" />

        {/* Position markers */}
        {Array.from({ length: winThreshold * 2 + 1 }, (_, i) => {
          const markerPos = i - winThreshold;
          const markerOffset = (markerPos / winThreshold) * 50 + 50;
          return (
            <div
              key={i}
              className="absolute top-1/2 w-0.5 h-2 sm:h-4 bg-gray-300 transform -translate-y-1/2"
              style={{ left: `${markerOffset}%` }}
            />
          );
        })}
      </div>

      {/* The Rope with Characters */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2"
        animate={{ x: `${percentage}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Rope body - thicker and more visible */}
        <motion.div 
          className="absolute left-[22%] right-[22%] top-1/2 transform -translate-y-1/2 h-2 sm:h-3 rounded-full"
          style={{
            background: 'repeating-linear-gradient(90deg, #d4a574 0px, #d4a574 8px, #c49a6c 8px, #c49a6c 16px)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
          animate={{
            scaleX: [1, 1.01, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.3,
          }}
        />

        {/* Center marker/flag */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[70%] flex flex-col items-center z-10"
          animate={{ y: [-5, 0, -5] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {/* Flag pole */}
          <div className="w-1 sm:w-1.5 h-6 sm:h-10 bg-gray-700 rounded relative">
            {/* Flag */}
            <motion.div
              className="absolute -top-1 left-1 sm:left-1.5 w-5 sm:w-8 h-4 sm:h-6 bg-yellow-400 rounded-sm shadow-md flex items-center justify-center"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            >
              <span className="text-xs sm:text-sm">⚡</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Left player (Blue team) */}
        <div className="absolute left-[8%] top-1/2 transform -translate-y-[65%] scale-[0.6] sm:scale-100 origin-center">
          <LeftPullingFigure 
            color="#3b82f6" 
            isWinning={leftIsWinning}
          />
        </div>

        {/* Right player (Red team) - facing left */}
        <div className="absolute right-[8%] top-1/2 transform -translate-y-[65%] scale-[0.6] sm:scale-100 origin-center">
          <RightPullingFigure 
            color="#ef4444" 
            isWinning={rightIsWinning}
          />
        </div>
      </motion.div>

      {/* Position indicator */}
      <div className="absolute bottom-1 sm:bottom-3 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-700 font-semibold bg-white/90 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md whitespace-nowrap">
        {position === 0 ? '⚖️ TIE' : position < 0 ? `🔵 Blue +${Math.abs(position)}` : `🔴 Red +${position}`}
      </div>
    </div>
  );
};
