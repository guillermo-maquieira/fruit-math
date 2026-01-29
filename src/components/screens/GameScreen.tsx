import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FruitDisplay } from "@/components/FruitDisplay";
import { Level, getRandomFruit, generateWrongAnswers, shuffleArray } from "@/lib/gameData";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameScreenProps {
  level: Level;
  onComplete: (attempts: number) => void;
  onBack: () => void;
}

type AnswerState = "idle" | "correct" | "wrong";

export const GameScreen = ({ level, onComplete, onBack }: GameScreenProps) => {
  const [attempts, setAttempts] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [showHint, setShowHint] = useState(false);

  const fruit = useMemo(() => getRandomFruit(), [level.id]);
  const correctAnswer = level.multiplier1 * level.multiplier2;
  
  const answers = useMemo(() => {
    const wrong = generateWrongAnswers(correctAnswer);
    return shuffleArray([correctAnswer, ...wrong]);
  }, [correctAnswer]);

  useEffect(() => {
    // Reset state when level changes
    setAttempts(0);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setShowHint(false);
  }, [level.id]);

  const handleAnswer = (answer: number) => {
    if (answerState !== "idle") return;

    setSelectedAnswer(answer);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (answer === correctAnswer) {
      setAnswerState("correct");
      // Delay to show celebration
      setTimeout(() => {
        onComplete(newAttempts);
      }, 1000);
    } else {
      setAnswerState("wrong");
      // Reset after shake animation
      setTimeout(() => {
        setSelectedAnswer(null);
        setAnswerState("idle");
      }, 600);
    }
  };

  const getButtonVariant = (answer: number) => {
    if (answerState === "idle") return "answer";
    if (selectedAnswer === answer) {
      return answerState === "correct" ? "answerCorrect" : "answerWrong";
    }
    return "answer";
  };

  return (
    <div className="min-h-screen bg-gradient-playful flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            Level {level.id + 1}
          </h1>
          <p className="text-sm text-muted-foreground">
            Attempts: {attempts}
          </p>
        </div>
        <Button 
          variant={showHint ? "playful" : "outline"}
          size="icon" 
          onClick={() => setShowHint(!showHint)}
          className={cn(
            "relative transition-all duration-300",
            showHint ? "animate-wiggle" : "hover:animate-pop",
            !showHint && attempts > 2 && "animate-pulse-glow"
          )}
        >
          <HelpCircle className={cn("w-6 h-6 transition-transform", showHint && "rotate-12")} />
          {!showHint && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-bounce-in">
              💡
            </span>
          )}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        {/* Question */}
        <div className="bg-card rounded-3xl shadow-card p-6 sm:p-8 w-full max-w-lg animate-bounce-in">
          <div className="text-center mb-6">
            <p className="text-lg text-muted-foreground mb-2">What is</p>
            <div className="flex items-center justify-center gap-3 text-4xl sm:text-5xl font-black text-foreground">
              <span className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-2xl">
                {level.multiplier1}
              </span>
              <span>×</span>
              <span className="bg-gradient-secondary text-secondary-foreground px-4 py-2 rounded-2xl">
                {level.multiplier2}
              </span>
              <span>=</span>
              <span className="text-5xl sm:text-6xl">?</span>
            </div>
          </div>

          {/* Hint: Visual fruit representation */}
          {showHint && (
            <div className="border-t border-border pt-4 animate-bounce-in">
              <FruitDisplay
                emoji={fruit.emoji}
                count={level.multiplier2}
                groups={level.multiplier1}
              />
            </div>
          )}
        </div>

        {/* Answer buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm animate-bounce-in" style={{ animationDelay: "0.1s" }}>
          {answers.map((answer, index) => (
            <Button
              key={`${answer}-${index}`}
              variant={getButtonVariant(answer)}
              size="xl"
              onClick={() => handleAnswer(answer)}
              disabled={answerState === "correct"}
              className="text-2xl sm:text-3xl font-black h-20"
            >
              {answer}
            </Button>
          ))}
        </div>

        {/* Encouragement text */}
        {attempts > 2 && answerState === "idle" && (
          <p className="text-muted-foreground text-center animate-bounce-in">
            💡 Tap the hint button for help!
          </p>
        )}
      </div>
    </div>
  );
};
