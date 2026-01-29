import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Level, calculateStars } from "@/lib/gameData";
import { ArrowRight, Home, RotateCcw } from "lucide-react";

interface CelebrationScreenProps {
  level: Level;
  attempts: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onHome: () => void;
  isLastLevel: boolean;
}

export const CelebrationScreen = ({
  level,
  attempts,
  onNextLevel,
  onReplay,
  onHome,
  isLastLevel,
}: CelebrationScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const stars = calculateStars(attempts);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const messages = {
    3: ["Perfect! 🌟", "Amazing! 🎉", "Brilliant! 🚀", "Superstar! ⭐"],
    2: ["Great job! 👏", "Well done! 🎊", "Nice work! 💪"],
    1: ["Good effort! 👍", "Keep going! 🌈", "You did it! ✨"],
  };

  const randomMessage = messages[stars][Math.floor(Math.random() * messages[stars].length)];

  return (
    <div className="min-h-screen bg-gradient-playful flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50 + 50}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 0.5}s`,
              }}
            >
              {["🍎", "🍊", "🍇", "🍓", "🍌", "⭐", "🎉", "✨"][Math.floor(Math.random() * 8)]}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full">
        {/* Celebration emoji */}
        <div className="text-8xl animate-bounce-in">
          {stars === 3 ? "🏆" : stars === 2 ? "🎉" : "🌟"}
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-black text-foreground text-center animate-bounce-in" style={{ animationDelay: "0.1s" }}>
          {randomMessage}
        </h1>

        {/* Problem solved */}
        <div className="bg-card rounded-3xl shadow-card p-6 w-full animate-bounce-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-center text-lg text-muted-foreground mb-2">You solved</p>
          <div className="flex items-center justify-center gap-2 text-3xl font-black text-foreground">
            <span>{level.multiplier1}</span>
            <span>×</span>
            <span>{level.multiplier2}</span>
            <span>=</span>
            <span className="text-primary">{level.multiplier1 * level.multiplier2}</span>
          </div>
        </div>

        {/* Stars earned */}
        <div className="flex flex-col items-center gap-2 animate-bounce-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-muted-foreground font-semibold">Stars earned</p>
          <StarRating stars={stars} size="lg" animate />
          <p className="text-sm text-muted-foreground">
            {attempts === 1 ? "First try!" : `${attempts} attempts`}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 w-full animate-bounce-in" style={{ animationDelay: "0.4s" }}>
          {!isLastLevel && (
            <Button variant="default" size="lg" onClick={onNextLevel} className="w-full">
              Next Level
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
          
          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={onReplay} className="flex-1">
              <RotateCcw className="w-5 h-5 mr-2" />
              Replay
            </Button>
            <Button variant="secondary" size="lg" onClick={onHome} className="flex-1">
              <Home className="w-5 h-5 mr-2" />
              Levels
            </Button>
          </div>
        </div>

        {isLastLevel && (
          <div className="text-center animate-bounce-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-xl font-bold text-primary">🎊 Congratulations! 🎊</p>
            <p className="text-muted-foreground">You've completed all levels!</p>
          </div>
        )}
      </div>
    </div>
  );
};
