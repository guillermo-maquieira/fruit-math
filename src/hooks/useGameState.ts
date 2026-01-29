import { useState, useCallback, useEffect } from "react";
import { Level, generateLevels, calculateStars } from "@/lib/gameData";

const STORAGE_KEY = "fruit-math-progress";

export type GameScreen = "home" | "levels" | "game" | "celebration";

export const useGameState = () => {
  const [screen, setScreen] = useState<GameScreen>("home");
  const [levels, setLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return generateLevels();
      }
    }
    return generateLevels();
  });
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [totalStars, setTotalStars] = useState<number>(0);

  // Calculate total stars
  useEffect(() => {
    const stars = levels.reduce((sum, level) => sum + level.stars, 0);
    setTotalStars(stars);
  }, [levels]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
  }, [levels]);

  const getCurrentLevel = useCallback(() => {
    return levels.find((l) => l.id === currentLevelId) || levels[0];
  }, [levels, currentLevelId]);

  const completeLevel = useCallback((attempts: number) => {
    const stars = calculateStars(attempts);
    
    setLevels((prev) => {
      const updated = prev.map((level) => {
        if (level.id === currentLevelId) {
          return {
            ...level,
            stars: Math.max(level.stars, stars) as 0 | 1 | 2 | 3,
          };
        }
        // Unlock next level
        if (level.id === currentLevelId + 1) {
          return { ...level, unlocked: true };
        }
        return level;
      });
      return updated;
    });

    setScreen("celebration");
  }, [currentLevelId]);

  const startLevel = useCallback((levelId: number) => {
    setCurrentLevelId(levelId);
    setScreen("game");
  }, []);

  const goToLevels = useCallback(() => {
    setScreen("levels");
  }, []);

  const goToHome = useCallback(() => {
    setScreen("home");
  }, []);

  const nextLevel = useCallback(() => {
    const nextLevelId = currentLevelId + 1;
    if (nextLevelId < levels.length) {
      setCurrentLevelId(nextLevelId);
      setScreen("game");
    } else {
      setScreen("levels");
    }
  }, [currentLevelId, levels.length]);

  const resetProgress = useCallback(() => {
    const fresh = generateLevels();
    setLevels(fresh);
    setCurrentLevelId(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
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
  };
};
