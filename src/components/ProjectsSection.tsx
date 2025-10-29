import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import useIsMobile from '../hooks/useIsMobile';

const projects = [
  {
    title: "Selfmade Dev",
    year: "2023",
    liveUrl: "https://selfmade-dev.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Patsons BD",
    year: "2023",
    liveUrl: "https://patsonsbd.com/",
    githubUrl: "#",
  },
  {
    title: "Khadijah Clothing",
    year: "2023",
    liveUrl: "https://khadijahclothing.com/",
    githubUrl: "#",
  },
  {
    title: "Dev Wing",
    year: "2023",
    liveUrl: "https://dev-wing.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Your Interview",
    year: "2023",
    liveUrl: "https://yourinterview.net/",
    githubUrl: "#",
  },
  {
    title: "Visa Gateway",
    year: "2023",
    liveUrl: "https://visa-gateway.vercel.app/",
    githubUrl: "#",
  },
    {
    title: "Hospital UI",
    year: "2023",
    liveUrl: "https://hospital-ui-blue.vercel.app/",
    githubUrl: "#",
  },
    {
    title: "Hajj Gateway",
    year: "2023",
    liveUrl: "https://hajj-gateway.vercel.app/",
    githubUrl: "#",
  },
    {
    title: "RBHS Reunion",
    year: "2023",
    liveUrl: "https://rbhs-reunion.vercel.app/",
    githubUrl: "#",
  },
    {
    title: "CMHSians Reunion",
    year: "2023",
    liveUrl: "https://reunion.cmhsians.com/",
    githubUrl: "#",
  },
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollableWidth, setScrollableWidth] = useState(0);
  const isMobile = useIsMobile();

  const cardWidth = isMobile ? "w-[80vw]" : "w-[32rem]";
  const cardHeight = isMobile ? "h-[60vw]" : "h-[24rem]";

  useEffect(() => {
    const calculateWidth = () => {
      if (projectsContainerRef.current) {
        setScrollableWidth(projectsContainerRef.current.scrollWidth - window.innerWidth);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);

    return () => window.removeEventListener('resize', calculateWidth);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && scrollableWidth > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
          const scrollableHeight = rect.height - window.innerHeight;
          const progress = Math.max(0, Math.min(1, (-rect.top) / scrollableHeight));
          setScrollX(-progress * scrollableWidth);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollableWidth]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh]"
      style={{
        backgroundImage: "url('https://i.gifer.com/4CND.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-0 left-0 p-8 z-10">
          <h2 className="text-4xl font-serif text-white">featured work</h2>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white mt-2 inline-block">
            VIEW GALLERY
          </a>
        </div>
        <div
          className="absolute top-0 left-0 h-full"
        >
          <div
            ref={projectsContainerRef}
            className="h-full flex items-center gap-8 px-8"
            style={{ transform: `translateX(${scrollX}px)` }}
          >
            {projects.map((project, index) => (
              <div key={index} className={`group ${cardWidth} ${cardHeight} flex-shrink-0 ${!isMobile && (index % 2 === 0 ? 'mt-32' : 'mb-32')}`}>
                <div className="relative w-full h-full rounded-lg shadow-lg border-4 border-white overflow-hidden bg-black">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <iframe
                      src={project.liveUrl}
                      title={project.title}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p className="text-sm">{project.year}</p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <Button variant="outline" onClick={() => window.open(project.liveUrl, '_blank')}>
                        Live Preview
                      </Button>
                      <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>
                        View Github
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
