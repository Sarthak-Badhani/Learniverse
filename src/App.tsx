import { GameSetup, GameBoard, WinnerScreen } from './components';
import { useGameState } from './hooks/useGameState';
import { GameConfig } from './types/game';

function App() {
  const {
    gameState,
    initializeGame,
    startGame,
    handleInputChange,
    submitAnswer,
    resetGame,
    restartGame,
  } = useGameState();

  // Handle game setup completion
  const handleSetupComplete = (config: GameConfig) => {
    initializeGame(config);
  };

  // Show setup screen if no game state
  if (!gameState) {
    return <GameSetup onStartGame={handleSetupComplete} />;
  }

  return (
    <>
      <GameBoard
        gameState={gameState}
        onInputChange={handleInputChange}
        onSubmit={submitAnswer}
        onStart={startGame}
      />
      
      {/* Winner Modal */}
      {gameState.gameStatus === 'finished' && gameState.winner && (
        <WinnerScreen
          gameState={gameState}
          onPlayAgain={restartGame}
          onNewGame={resetGame}
        />
      )}
    </>
  );
}

export default App;
