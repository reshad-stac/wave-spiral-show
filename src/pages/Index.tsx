import { useState, useEffect } from "react";
import WaveAnimation from "@/components/WaveAnimation";
import LoadingText from "@/components/LoadingText";
import WordSwapAnimation from "@/components/WordSwapAnimation";
import HeroSection from "@/components/HeroSection";
import ScrollVideoSection from "@/components/ScrollVideoSection";

type AnimationStage = "wave" | "loading" | "transition" | "wordSwap" | "hero";

const Index = () => {
  const [stage, setStage] = useState<AnimationStage>("wave");

  useEffect(() => {
    // Handle transition stage
    if (stage === "transition") {
      const timer = setTimeout(() => {
        setStage("wordSwap");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <>
      {stage === "wave" && <WaveAnimation onComplete={() => setStage("loading")} />}
      
      {stage === "loading" && <LoadingText onComplete={() => setStage("transition")} />}
      
      {stage === "transition" && (
        <div className="fixed inset-0 bg-background animate-text-fade-in" />
      )}
      
      {stage === "wordSwap" && (
        <WordSwapAnimation onComplete={() => setStage("hero")} />
      )}
      
      {stage === "hero" && (
        <>
          <HeroSection />
          <ScrollVideoSection />
        </>
      )}
    </>
  );
};

export default Index;
