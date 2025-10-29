import { useState, useEffect, useRef } from "react";

const ScrollVideoSection = () => {
  const [circleScale, setCircleScale] = useState(0.1);
  const [secondCircleScale, setSecondCircleScale] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within this section
      const scrollProgress = Math.max(0, -rect.top) / (viewportHeight * 2);
      
      // First circle grows from 0 to 1 more gradually
      const firstCircle = Math.min(scrollProgress * 1.5, 1);
      setCircleScale(firstCircle);
      
      // Second circle starts growing when first reaches about 80% full screen
      if (firstCircle >= 0.8) {
        const secondProgress = (scrollProgress - 0.53) * 1.8;
        setSecondCircleScale(Math.max(0, Math.min(secondProgress, 1)));
      } else {
        setSecondCircleScale(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative"
      style={{ 
        height: "300vh",
        backgroundColor: "hsl(0 0% 0%)"
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "hsl(0 0% 0%)" }}>
        {/* First Circle with Video */}
        {circleScale > 0 && (
          <div
            className="absolute rounded-full overflow-hidden transition-transform duration-300"
            style={{
              width: "100vw",
              height: "100vw",
              maxWidth: "100vw",
              maxHeight: "100vh",
              transform: `scale(${circleScale})`,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* Second Circle with Video */}
        {secondCircleScale > 0 && (
          <div
            className="absolute rounded-full overflow-hidden transition-transform duration-300"
            style={{
              width: "100vw",
              height: "100vw",
              maxWidth: "100vw",
              maxHeight: "100vh",
              transform: `scale(${secondCircleScale})`,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollVideoSection;
