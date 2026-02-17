import { motion } from 'framer-motion';

interface RopeProps {
  position: number; // -5 to 5
  winThreshold: number;
}

// Animated stick figure pulling rope - LEFT side (facing RIGHT, pulling left)
// Hand is at the RIGHT edge of SVG to connect with rope
const LeftPullingFigure = ({ color, isWinning }: { color: string; isWinning: boolean }) => {
  const skinColor = '#FFD5B5';
  const pullIntensity = isWinning ? 1 : 0.5;
  
  return (
    <motion.svg
      width="80"
      height="90"
      viewBox="0 0 80 90"
      animate={isWinning ? { x: [0, -5, 0] } : { x: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: isWinning ? 0.25 : 0.5, ease: 'easeInOut' }}
    >
      {/* Head */}
      <motion.circle cx="20" cy="15" r="12" fill={skinColor} stroke={color} strokeWidth="2.5"
        animate={{ cx: [20, 17, 20] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Eyes - looking right toward rope */}
      <circle cx="23" cy="13" r="2" fill="#333" />
      <circle cx="28" cy="13" r="2" fill="#333" />
      {/* Determined expression */}
      <path d="M 20 20 Q 24 22 28 20" stroke="#333" strokeWidth="2" fill="none" />

      {/* Body - leaning back for pulling */}
      <motion.line x1="20" y1="27" x2="12" y2="52" stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [20, 17, 20], x2: [12, 8, 12] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Upper arm - shoulder to elbow */}
      <motion.line x1="18" y1="32" x2="40" y2="38" stroke={skinColor} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [18, 15, 18], x2: [40, 38, 40] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      
      {/* Lower arm - elbow to hand (reaching toward rope at right edge) */}
      <motion.line x1="40" y1="38" x2="75" y2="45" stroke={skinColor} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [40, 38, 40], x2: [75, 72, 75] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      
      {/* Hand gripping at rope connection point (right edge) */}
      <motion.ellipse cx="77" cy="45" rx="5" ry="6" fill={skinColor} stroke={color} strokeWidth="1.5"
        animate={{ cx: [77, 74, 77] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Fingers wrapped around rope */}
      <motion.path d="M 74 42 Q 80 45 74 48" stroke={skinColor} strokeWidth="3" fill="none"
        animate={{ d: ["M 74 42 Q 80 45 74 48", "M 71 42 Q 77 45 71 48", "M 74 42 Q 80 45 74 48"] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Left leg - back, bracing */}
      <motion.line x1="12" y1="52" x2="0" y2="80" stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [12, 8, 12], x2: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Right leg - front */}
      <motion.line x1="12" y1="52" x2="25" y2="80" stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [12, 8, 12] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Feet */}
      <motion.ellipse cx="0" cy="82" rx="7" ry="4" fill={color}
        animate={{ cx: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      <ellipse cx="25" cy="82" rx="7" ry="4" fill={color} />

      {/* Sweat drops when winning */}
      {isWinning && (
        <>
          <motion.circle cx="10" cy="8" r="2" fill="#87CEEB"
            animate={{ cy: [8, 25], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
          <motion.circle cx="30" cy="5" r="1.5" fill="#87CEEB"
            animate={{ cy: [5, 22], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          />
        </>
      )}
    </motion.svg>
  );
};

// Animated stick figure pulling rope - RIGHT side (facing LEFT, pulling right)
// Hand is at the LEFT edge of SVG to connect with rope
const RightPullingFigure = ({ color, isWinning }: { color: string; isWinning: boolean }) => {
  const skinColor = '#FFD5B5';
  const pullIntensity = isWinning ? 1 : 0.5;
  
  return (
    <motion.svg
      width="80"
      height="90"
      viewBox="0 0 80 90"
      animate={isWinning ? { x: [0, 5, 0] } : { x: [0, 2, 0] }}
      transition={{ repeat: Infinity, duration: isWinning ? 0.25 : 0.5, ease: 'easeInOut' }}
    >
      {/* Head */}
      <motion.circle cx="60" cy="15" r="12" fill={skinColor} stroke={color} strokeWidth="2.5"
        animate={{ cx: [60, 63, 60] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Eyes - looking left toward rope */}
      <circle cx="52" cy="13" r="2" fill="#333" />
      <circle cx="57" cy="13" r="2" fill="#333" />
      {/* Determined expression */}
      <path d="M 52 20 Q 56 22 60 20" stroke="#333" strokeWidth="2" fill="none" />

      {/* Body - leaning back for pulling */}
      <motion.line x1="60" y1="27" x2="68" y2="52" stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [60, 63, 60], x2: [68, 72, 68] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Upper arm - shoulder to elbow */}
      <motion.line x1="62" y1="32" x2="40" y2="38" stroke={skinColor} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [62, 65, 62], x2: [40, 42, 40] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      
      {/* Lower arm - elbow to hand (reaching toward rope at left edge) */}
      <motion.line x1="40" y1="38" x2="5" y2="45" stroke={skinColor} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [40, 42, 40], x2: [5, 8, 5] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      
      {/* Hand gripping at rope connection point (left edge) */}
      <motion.ellipse cx="3" cy="45" rx="5" ry="6" fill={skinColor} stroke={color} strokeWidth="1.5"
        animate={{ cx: [3, 6, 3] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Fingers wrapped around rope */}
      <motion.path d="M 6 42 Q 0 45 6 48" stroke={skinColor} strokeWidth="3" fill="none"
        animate={{ d: ["M 6 42 Q 0 45 6 48", "M 9 42 Q 3 45 9 48", "M 6 42 Q 0 45 6 48"] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />

      {/* Right leg - back, bracing */}
      <motion.line x1="68" y1="52" x2="80" y2="80" stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [68, 72, 68], x2: [80, 83, 80] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Left leg - front */}
      <motion.line x1="68" y1="52" x2="55" y2="80" stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ x1: [68, 72, 68] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      {/* Feet */}
      <motion.ellipse cx="80" cy="82" rx="7" ry="4" fill={color}
        animate={{ cx: [80, 83, 80] }}
        transition={{ repeat: Infinity, duration: 0.3 / pullIntensity }}
      />
      <ellipse cx="55" cy="82" rx="7" ry="4" fill={color} />

      {/* Sweat drops when winning */}
      {isWinning && (
        <>
          <motion.circle cx="70" cy="8" r="2" fill="#87CEEB"
            animate={{ cy: [8, 25], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
          <motion.circle cx="50" cy="5" r="1.5" fill="#87CEEB"
            animate={{ cy: [5, 22], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
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
    <div className="relative w-full h-32 sm:h-52 my-2 sm:my-8 overflow-hidden">
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

      {/* The Rope with Characters - everything moves together */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2"
        animate={{ x: `${percentage}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Left player (Blue team) - positioned so hand aligns with rope start */}
        <div 
          className="absolute top-1/2 scale-[0.5] sm:scale-[0.85] origin-right"
          style={{ 
            left: '12%', 
            transform: 'translateY(-50%)',
          }}
        >
          <LeftPullingFigure 
            color="#3b82f6" 
            isWinning={leftIsWinning}
          />
        </div>

        {/* Rope body - connects directly between the hands */}
        <motion.div 
          className="absolute top-1/2 h-3 sm:h-4 rounded-full"
          style={{
            left: '16%',
            right: '16%',
            transform: 'translateY(-50%)',
            background: 'repeating-linear-gradient(90deg, #d4a574 0px, #d4a574 8px, #c49a6c 8px, #c49a6c 16px)',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.35)',
          }}
          animate={{
            scaleX: [1, 1.005, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.3,
          }}
        />

        {/* Center marker/flag */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
          style={{ transform: 'translate(-50%, -120%)' }}
          animate={{ y: [-3, 0, -3] }}
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

        {/* Right player (Red team) - positioned so hand aligns with rope end */}
        <div 
          className="absolute top-1/2 scale-[0.5] sm:scale-[0.85] origin-left"
          style={{ 
            right: '12%', 
            transform: 'translateY(-50%)',
          }}
        >
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
