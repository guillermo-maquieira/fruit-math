import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  stars: 0 | 1 | 2 | 3;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const StarRating = ({ stars, size = "md", animate = false }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            "transition-all duration-300",
            i <= stars
              ? "fill-accent text-accent drop-shadow-lg"
              : "text-muted-foreground/30",
            animate && i <= stars && "animate-pop",
          )}
          style={animate && i <= stars ? { animationDelay: `${i * 200}ms` } : undefined}
        />
      ))}
    </div>
  );
};
