import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Play, RotateCcw } from "lucide-react";

interface HomeScreenProps {
  totalStars: number;
  onPlay: () => void;
  onReset: () => void;
}

export const HomeScreen = ({ totalStars, onPlay, onReset }: HomeScreenProps) => {
  const maxStars = 121 * 3; // 11x11 levels, 3 stars each

  return (
    <div className="min-h-screen bg-gradient-playful flex flex-col items-center justify-center p-6">
      {/* Floating fruits decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-10 left-10 text-6xl animate-float" style={{ animationDelay: "0s" }}>🍎</span>
        <span className="absolute top-20 right-16 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🍊</span>
        <span className="absolute bottom-32 left-20 text-5xl animate-float" style={{ animationDelay: "1s" }}>🍇</span>
        <span className="absolute bottom-20 right-10 text-6xl animate-float" style={{ animationDelay: "1.5s" }}>🍓</span>
        <span className="absolute top-1/3 left-5 text-4xl animate-float" style={{ animationDelay: "2s" }}>🍌</span>
        <span className="absolute top-1/2 right-8 text-4xl animate-float" style={{ animationDelay: "0.3s" }}>🍑</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full">
        {/* Title */}
        <div className="text-center animate-bounce-in">
          <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-2 drop-shadow-sm">
            Fruit Math
          </h1>
          <p className="text-xl text-muted-foreground font-semibold">
            🍎 Learn Multiplication! 🧮
          </p>
        </div>

        {/* Progress card */}
        <div className="bg-card rounded-3xl p-6 shadow-card w-full animate-bounce-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-foreground">Your Progress</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-accent">{totalStars}</span>
              <span className="text-muted-foreground">/ {maxStars}</span>
              <span className="text-2xl">⭐</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-accent h-full rounded-full transition-all duration-500"
              style={{ width: `${(totalStars / maxStars) * 100}%` }}
            />
          </div>
        </div>

        {/* Play button */}
        <Button
          variant="default"
          size="xl"
          onClick={onPlay}
          className="w-full animate-pulse-glow animate-bounce-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Play className="w-6 h-6 mr-2" />
          Let's Play!
        </Button>

        {/* Reset button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-destructive animate-bounce-in"
          style={{ animationDelay: "0.3s" }}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Progress
        </Button>
      </div>
    </div>
  );
};
