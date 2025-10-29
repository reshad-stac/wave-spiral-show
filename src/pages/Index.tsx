import { useState, useEffect } from "react";
import WaveAnimation from "@/components/WaveAnimation";
import LoadingText from "@/components/LoadingText";
import SpiralAnimation from "@/components/SpiralAnimation";
import HeroSection from "@/components/HeroSection";

type AnimationStage = "wave" | "loading" | "transition" | "spiral" | "hero";

const Index = () => {
  const [stage, setStage] = useState<AnimationStage>("wave");
  const [showSpiral, setShowSpiral] = useState(false);

  useEffect(() => {
    // Handle transition stage
    if (stage === "transition") {
      const timer = setTimeout(() => {
        setStage("spiral");
        setShowSpiral(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Handle spiral stage
    if (stage === "spiral") {
      const timer = setTimeout(() => {
        setStage("hero");
      }, 2000);
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
      
      {stage === "spiral" && showSpiral && (
        <div className="fixed inset-0 bg-background flex items-center justify-center">
          <SpiralAnimation className="w-96 h-96 text-foreground" />
        </div>
      )}
      
      {stage === "hero" && <HeroSection />}
    </>
  );
};

export default Index;
