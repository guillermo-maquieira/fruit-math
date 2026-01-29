import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Level, getLevelDifficulty } from "@/lib/gameData";
import { ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelSelectScreenProps {
  levels: Level[];
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const LevelSelectScreen = ({ levels, onSelectLevel, onBack }: LevelSelectScreenProps) => {
  // Group levels by first multiplier (0-10)
  const groupedLevels = levels.reduce((acc, level) => {
    const group = level.multiplier1;
    if (!acc[group]) acc[group] = [];
    acc[group].push(level);
    return acc;
  }, {} as Record<number, Level[]>);

  return (
    <div className="min-h-screen bg-gradient-playful p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">Choose a Level</h1>
      </div>

      {/* Level groups */}
      <div className="space-y-6 max-w-4xl mx-auto pb-20">
        {Object.entries(groupedLevels).map(([group, groupLevels]) => (
          <div key={group} className="animate-bounce-in" style={{ animationDelay: `${parseInt(group) * 50}ms` }}>
            <h2 className="text-lg font-bold text-muted-foreground mb-3 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {group}
              </span>
              Times Table
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2">
              {groupLevels.map((level) => {
                const difficulty = getLevelDifficulty(level.id);
                const difficultyColors = {
                  easy: "border-secondary/50 hover:border-secondary",
                  medium: "border-accent/50 hover:border-accent",
                  hard: "border-primary/50 hover:border-primary",
                };

                return (
                  <button
                    key={level.id}
                    onClick={() => level.unlocked && onSelectLevel(level.id)}
                    disabled={!level.unlocked}
                    className={cn(
                      "relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200",
                      level.unlocked
                        ? `bg-card shadow-card hover:-translate-y-1 hover:shadow-lg ${difficultyColors[difficulty]}`
                        : "bg-muted/50 border-muted cursor-not-allowed"
                    )}
                  >
                    {level.unlocked ? (
                      <>
                        <span className="text-sm font-bold text-foreground">
                          {level.multiplier1}×{level.multiplier2}
                        </span>
                        <StarRating stars={level.stars} size="sm" />
                      </>
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
