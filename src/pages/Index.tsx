import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { LevelSelectScreen } from "@/components/screens/LevelSelectScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { CelebrationScreen } from "@/components/screens/CelebrationScreen";

const Index = () => {
  const {
    screen,
    levels,
    currentLevelId,
    totalStars,
    getCurrentLevel,
    completeLevel,
    startLevel,
    goToLevels,
    goToHome,
    nextLevel,
    resetProgress,
    setScreen,
  } = useGameState();

  const [lastAttempts, setLastAttempts] = useState(1);

  const handleCompleteLevel = (attempts: number) => {
    setLastAttempts(attempts);
    completeLevel(attempts);
  };

  const handleReplay = () => {
    setScreen("game");
  };

  const currentLevel = getCurrentLevel();
  const isLastLevel = currentLevelId >= levels.length - 1;

  return (
    <>
      {screen === "home" && (
        <HomeScreen
          totalStars={totalStars}
          onPlay={goToLevels}
          onReset={resetProgress}
        />
      )}

      {screen === "levels" && (
        <LevelSelectScreen
          levels={levels}
          onSelectLevel={startLevel}
          onBack={goToHome}
        />
      )}

      {screen === "game" && (
        <GameScreen
          level={currentLevel}
          onComplete={handleCompleteLevel}
          onBack={goToLevels}
        />
      )}

      {screen === "celebration" && (
        <CelebrationScreen
          level={currentLevel}
          attempts={lastAttempts}
          onNextLevel={nextLevel}
          onReplay={handleReplay}
          onHome={goToLevels}
          isLastLevel={isLastLevel}
        />
      )}
    </>
  );
};

export default Index;
