import { useState, useEffect, useRef } from "react";

const ScrollVideoSection = () => {
  const [scales, setScales] = useState([0, 0, 0, 0]);
  const [revealedWords, setRevealedWords] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [expandingCircleScale, setExpandingCircleScale] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const text = "The slowest band in history emerged in late 2003 between Benicàssim and Castellón, Spain, crafting an alternative rock sound shaped by classic rock influences.";
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, -rect.top) / (viewportHeight * 7);

      const textRevealEnd = 0.2;
      const circleExpandEnd = 0.6;
      const textVanishEnd = 0.7;
      
      const textRevealStart = 0.05;
      if (scrollProgress >= textRevealStart && scrollProgress <= textRevealEnd) {
        const textProgress = (scrollProgress - textRevealStart) / (textRevealEnd - textRevealStart);
        setRevealedWords(Math.floor(textProgress * words.length));
      } else if (scrollProgress > textRevealEnd) {
        setRevealedWords(words.length);
      } else {
        setRevealedWords(0);
      }

      let newScales = [0, 0, 0, 0];
      const circleExpandStart = 0.2;
      const shrinkStart = 0.7;
      const shrinkDuration = 0.05;

      if(scrollProgress > circleExpandStart && scrollProgress < circleExpandEnd) {
        for (let i = 0; i < 4; i++) {
          const circleStart = circleExpandStart + i * 0.1;
          if (scrollProgress > circleStart) {
              const progress = (scrollProgress - circleStart) / 0.1;
              newScales[i] = Math.min(1, Math.max(0, progress));
          }
        }
      } else if (scrollProgress >= circleExpandEnd && scrollProgress <= shrinkStart) {
          newScales = [1, 1, 1, 1];
      } else if (scrollProgress > shrinkStart) {
        newScales = [1, 1, 1, 1];
        for (let i = 3; i >= 0; i--) { 
          const circleShrinkStartTime = shrinkStart + (3 - i) * shrinkDuration;
          if (scrollProgress > circleShrinkStartTime) {
              const progress = (scrollProgress - circleShrinkStartTime) / shrinkDuration;
              newScales[i] = 1 - Math.max(0, Math.min(1, progress));
          }
        }
        const shrinkEnd = shrinkStart + 4 * shrinkDuration;
        if (scrollProgress > shrinkEnd) {
            newScales = [0,0,0,0];
        }
      }
      setScales(newScales);

      const textVanishStart = 0.6;
      if (scrollProgress > textVanishStart) {
          const fadeProgress = (scrollProgress - textVanishStart) / (textVanishEnd - textVanishStart);
          setTextOpacity(Math.max(0, 1 - fadeProgress));
      } else {
          setTextOpacity(1);
      }

      const expandingCircleStart = 0.65;
      if (scrollProgress > expandingCircleStart) {
          const expandingCircleProgress = (scrollProgress - expandingCircleStart) / (1.0 - expandingCircleStart);
          setExpandingCircleScale(expandingCircleProgress * 2.5);
      } else {
          setExpandingCircleScale(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <div 
      ref={sectionRef}
      className="relative"
      style={{ 
        height: "800vh",
        backgroundColor: "hsl(0 0% 0%)"
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "hsl(0 0% 0%)" }}>
        <div
          className="absolute text-white text-4xl lg:text-6xl text-center p-8 z-10 transition-opacity duration-300"
          style={{ opacity: textOpacity }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="transition-opacity duration-300"
              style={{ opacity: i < revealedWords ? 1 : 0.2 }}
            >
              {word}{' '}
            </span>
          ))}
        </div>
        
        {[...Array(4)].map((_, i) => {
          const scale = scales[i];
          const videoSrc = [
            "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
          ][i];
          
          const sizes = ["100vw", "80vw", "60vw", "40vw"];

          return scale > 0 && (
            <div
              key={i}
              className="absolute rounded-full overflow-hidden"
              style={{
                width: sizes[i],
                height: sizes[i],
                transform: `scale(${scale})`,
                zIndex: i,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          );
        })}
        {expandingCircleScale > 0 && (
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: "100vw",
              height: "100vw",
              transform: `scale(${expandingCircleScale})`,
              zIndex: 5, 
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ScrollVideoSection;