export const FRUITS = [
  { emoji: "🍎", name: "apple", color: "red" },
  { emoji: "🍊", name: "orange", color: "orange" },
  { emoji: "🍋", name: "lemon", color: "yellow" },
  { emoji: "🍇", name: "grape", color: "purple" },
  { emoji: "🍓", name: "strawberry", color: "red" },
  { emoji: "🍌", name: "banana", color: "yellow" },
  { emoji: "🍑", name: "peach", color: "orange" },
  { emoji: "🍒", name: "cherry", color: "red" },
  { emoji: "🥝", name: "kiwi", color: "green" },
  { emoji: "🍉", name: "watermelon", color: "green" },
  { emoji: "🫐", name: "blueberry", color: "blue" },
  { emoji: "🥭", name: "mango", color: "orange" },
];

export type Level = {
  id: number;
  multiplier1: number;
  multiplier2: number;
  stars: 0 | 1 | 2 | 3;
  unlocked: boolean;
};

// Generate all levels from 0x0 to 10x10
export const generateLevels = (): Level[] => {
  const levels: Level[] = [];
  let id = 0;
  
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
      levels.push({
        id,
        multiplier1: i,
        multiplier2: j,
        stars: 0,
        unlocked: id === 0, // Only first level unlocked initially
      });
      id++;
    }
  }
  
  return levels;
};

export const getRandomFruit = () => {
  return FRUITS[Math.floor(Math.random() * FRUITS.length)];
};

export const generateWrongAnswers = (correctAnswer: number): number[] => {
  const wrongAnswers = new Set<number>();
  
  while (wrongAnswers.size < 3) {
    // Generate plausible wrong answers close to the correct one
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongAnswer = Math.max(0, correctAnswer + offset);
    
    if (wrongAnswer !== correctAnswer) {
      wrongAnswers.add(wrongAnswer);
    }
  }
  
  return Array.from(wrongAnswers);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const calculateStars = (attempts: number): 1 | 2 | 3 => {
  if (attempts === 1) return 3;
  if (attempts === 2) return 2;
  return 1;
};

export const getLevelDifficulty = (levelId: number): "easy" | "medium" | "hard" => {
  if (levelId <= 20) return "easy";
  if (levelId <= 60) return "medium";
  return "hard";
};
