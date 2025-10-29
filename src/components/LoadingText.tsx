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
      <div className="text-center animate-text-fade-in">
        <p className="text-2xl font-bold tracking-wider">
          loading waves <span className="mx-2">•</span> syncing spiral
        </p>
      </div>
    </div>
  );
};

export default LoadingText;
