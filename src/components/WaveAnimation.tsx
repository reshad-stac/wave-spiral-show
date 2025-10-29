import { useEffect, useState } from "react";

interface WaveAnimationProps {
  onComplete: () => void;
}

const WaveAnimation = ({ onComplete }: WaveAnimationProps) => {
  const [waves, setWaves] = useState<number[]>([]);

  useEffect(() => {
    // Create waves sequentially
    const waveTimers = [0, 400, 800].map((delay, index) =>
      setTimeout(() => {
        setWaves((prev) => [...prev, index]);
      }, delay)
    );

    // Complete animation after all waves
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      waveTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative w-96 h-96">
        {waves.map((wave) => (
          <div
            key={wave}
            className="absolute inset-0 flex items-center justify-center"
            style={{ animationDelay: `${wave * 0.4}s` }}
          >
            <div className="w-32 h-32 rounded-full border-8 border-foreground animate-wave-expand" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaveAnimation;
