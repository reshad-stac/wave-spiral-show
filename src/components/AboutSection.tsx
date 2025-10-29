import { useState, useEffect, useRef } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

const AboutSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate scroll progress within the section itself
        const progress = -rect.top / (rect.height - window.innerHeight);
        setScrollY(Math.min(1, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentOpacity = 1 - Math.min(1, scrollY * 4); 
  const contentTransform = -scrollY * 50;

  return (
    <div
      ref={sectionRef}
      className="relative h-[200vh] text-white font-sans overflow-hidden"
      style={{
        backgroundImage: "url('https://i.gifer.com/Mf08.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div 
          className="relative w-full h-full flex items-center justify-center transition-opacity duration-300"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentTransform}px)`
          }}
        >
          {/* Left Navigation */}
          {!isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 p-8 md:p-12 space-y-4">
              <div className="relative p-4 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
                <a href="#home" className="block text-sm md:text-base font-light tracking-widest hover:text-gray-300">HOME</a>
                <a href="#work" className="block text-sm md:text-base font-light tracking-widest hover:text-gray-300">WORK</a>
                <a href="#about" className="block text-sm md:text-base font-light tracking-widest hover:text-gray-300">ABOUT</a>
                <a href="#contact" className="block text-sm md:text-base font-light tracking-widest hover:text-gray-300">CONTACT</a>
              </div>
            </div>
          )}

          {/* Center Content */}
          <div className="w-full max-w-2xl mx-auto text-center p-4">
            <div className="relative p-8 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
                <hr className="border-t-2 border-white/30 w-1/3 mx-auto mb-6"/>
                <h1 className={`font-light ${isMobile ? 'text-3xl tracking-widest' : 'text-4xl md:text-6xl tracking-[0.2em]'}`}>JAHIDUL HASSAN</h1>
                <p className="mt-2 text-sm md:text-base tracking-widest text-gray-300">FULL-STACK SOFTWARE ENGINEER</p>
                <hr className="border-t-2 border-white/30 w-1/3 mx-auto mt-6"/>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="relative p-4 rounded-lg flex justify-between items-center" style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
              <div className="text-center">
                <p className="text-xs tracking-widest text-gray-400">SPECIALIZING IN</p>
                <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg md:text-xl'}`}>Next.js & Django</p>
              </div>
              {!isMobile && (
                <div className="text-center">
                  <p className="text-xs tracking-widest text-gray-400">SCROLL</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-xs tracking-widest text-gray-400">INFRASTRUCTURE</p>
                <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg md:text-xl'}`}>Docker & K8s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
