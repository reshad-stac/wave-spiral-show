import { useEffect } from "react";

interface LoadingTextProps {
  onComplete: () => void;
}

const LoadingText = ({ onComplete }: LoadingTextProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-foreground animate-circle-pulse" />
        </div>
        <div className="text-center animate-text-fade-in">
          <p className="text-2xl font-bold tracking-wider">
            loading waves <span className="mx-2">•</span> syncing spiral
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingText;
