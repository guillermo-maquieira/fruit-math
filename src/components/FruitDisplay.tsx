import { useMemo } from "react";

interface FruitDisplayProps {
  emoji: string;
  count: number;
  groups: number;
  animate?: boolean;
}

export const FruitDisplay = ({ emoji, count, groups, animate = true }: FruitDisplayProps) => {
  const fruitGroups = useMemo(() => {
    const groupsArray = [];
    for (let g = 0; g < groups; g++) {
      const fruits = [];
      for (let f = 0; f < count; f++) {
        fruits.push(
          <span
            key={`${g}-${f}`}
            className={`text-3xl sm:text-4xl ${animate ? "animate-bounce-in" : ""}`}
            style={{ animationDelay: `${(g * count + f) * 50}ms` }}
          >
            {emoji}
          </span>
        );
      }
      groupsArray.push(
        <div
          key={g}
          className="flex flex-wrap gap-1 justify-center items-center p-2 bg-card/50 rounded-xl border border-border/50"
        >
          {fruits.length > 0 ? fruits : <span className="text-muted-foreground text-sm">empty</span>}
        </div>
      );
    }
    return groupsArray;
  }, [emoji, count, groups, animate]);

  // Special case for 0
  if (groups === 0 || count === 0) {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="text-6xl animate-float">🤔</div>
        <p className="text-muted-foreground text-center font-semibold">
          {groups === 0 
            ? `Zero groups of ${emoji}` 
            : `${groups} groups with zero ${emoji} each`}
        </p>
        <p className="text-2xl font-bold text-foreground">That's zero fruits!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-center text-lg font-semibold text-muted-foreground">
        {groups} group{groups !== 1 ? "s" : ""} of {count} {emoji}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-2">
        {fruitGroups}
      </div>
    </div>
  );
};
