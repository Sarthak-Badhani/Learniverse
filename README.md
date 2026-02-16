# 🎮 Learniverse - Math Tug of War

A real-time multiplayer gamified math learning platform for children.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:5173 in your browser.

## 🎯 How to Play

1. **Setup**: Enter player names, choose difficulty, and set win threshold
2. **Gameplay**: 
   - Two players compete on the same screen
   - Each gets different but equally difficult math questions
   - First to answer correctly pulls the rope toward their side
3. **Win Condition**: Pull the rope past the boundary to win!

## 📁 Project Structure

```
learniverse/
├── src/
│   ├── components/       # React components
│   │   ├── GameSetup.tsx     # Initial setup screen
│   │   ├── GameBoard.tsx     # Main game board
│   │   ├── PlayerPanel.tsx   # Player question/input panel
│   │   ├── Rope.tsx          # Animated rope visualization
│   │   └── WinnerScreen.tsx  # Victory modal
│   ├── hooks/
│   │   └── useGameState.ts   # Game state management
│   ├── types/
│   │   └── game.ts           # TypeScript types
│   ├── utils/
│   │   └── mathGenerator.ts  # Question generation
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

## 🗺️ Roadmap

### Phase 1 - MVP (Current) ✅
- [x] Single device prototype
- [x] Two players on same screen
- [x] Random math generator
- [x] Rope position logic
- [x] Score tracking
- [x] Difficulty levels

### Phase 2 - Real Multiplayer (Planned)
- [ ] WebSocket integration (Socket.io)
- [ ] Node.js/Express backend
- [ ] Room creation/joining
- [ ] Real-time game state sync

### Phase 3 - Production Upgrade (Planned)
- [ ] Redis for shared state
- [ ] PostgreSQL for persistence
- [ ] Load balancing
- [ ] User authentication

### Phase 4 - Advanced Features (Planned)
- [ ] Adaptive difficulty system
- [ ] AI opponent
- [ ] Leaderboards
- [ ] Analytics dashboard

## 🔧 Tech Stack

**Current (Phase 1):**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

**Planned:**
- Node.js + Express
- Socket.io
- Redis
- PostgreSQL
- Prisma ORM

## 📝 License

MIT
