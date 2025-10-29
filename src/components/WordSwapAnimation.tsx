import { useEffect, useState } from "react";

interface WordSwapAnimationProps {
  onComplete: () => void;
}

const randomWords = [ "CHAOS", "PULSE", "EAT","SLEEP", "CODE", "REPEAT"];

const WordSwapAnimation = ({ onComplete }: WordSwapAnimationProps) => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const targetWord = "";

  useEffect(() => {
    // Show random words popping up
    const wordTimers = randomWords.map((word, index) =>
      setTimeout(() => {
        setDisplayWords((prev) => [...prev, word]);
      }, index * 200)
    );

    // Start swapping to RESHAD
    const swapTimer = setTimeout(() => {
      setIsSwapping(true);
    }, randomWords.length * 200 + 500);

    // Complete animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, randomWords.length * 200 + 1500);

    return () => {
      wordTimers.forEach(clearTimeout);
      clearTimeout(swapTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {!isSwapping ? (
          <div className="grid grid-cols-3 gap-8">
            {displayWords.map((word, index) => (
              <div
                key={index}
                className="text-4xl md:text-6xl font-bold animate-word-pop"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {word}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-6xl md:text-8xl font-extrabold tracking-tighter animate-word-swap">
            {targetWord.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordSwapAnimation;
