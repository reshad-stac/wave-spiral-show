import { useState } from "react";
import SpiralAnimation from "./SpiralAnimation";
import { Menu, X } from "lucide-react";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-8">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-foreground hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex items-center justify-center animate-text-fade-in">
          <div className="text-center space-y-8">
            <a href="#about" className="block text-4xl font-bold hover:opacity-70 transition-opacity">
              About
            </a>
            <a href="#work" className="block text-4xl font-bold hover:opacity-70 transition-opacity">
              Work
            </a>
            <a href="#contact" className="block text-4xl font-bold hover:opacity-70 transition-opacity">
              Contact
            </a>
          </div>
        </div>
      )}

      {/* Spiral Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <SpiralAnimation continuous className="w-[800px] h-[800px] text-foreground" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center animate-hero-reveal">
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-extrabold leading-none tracking-tighter">
            skizophonic
          </h1>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-sm font-medium tracking-wider uppercase">Skizophonic</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
