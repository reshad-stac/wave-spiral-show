import { useRef, useEffect, useState } from 'react';

const projects = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1540998145369-5c32509355a3?q=80&w=1935&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    x: 5,
    y: 10,
    width: 25,
    height: 60,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isSketch: true,
    x: 40,
    y: 30,
    width: 15,
    height: 20,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    x: 90,
    y: 15,
    width: 40,
    height: 50,
  },
   {
    title: 'Beurre, Food & Beverage',
    year: '2024',
    x: 90,
    y: 70,
    width: 40,
    isText: true,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    x: 140,
    y: 40,
    width: 25,
    height: 40,
  },
   {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isSketch: true,
    x: 120,
    y: 5,
    width: 15,
    height: 25,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    x: 60,
    y: 5,
    width: 20,
    height: 30,
  },
   {
    imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/github-repo/bq-codes/bq-42/project_images/cabinet.png',
    isSketch: true,
    x: 150,
    y: 20,
    width: 25,
    height: 30,
  }
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
          const scrollableHeight = rect.height - window.innerHeight;
          const progress = (-rect.top) / scrollableHeight;
          const scrollableWidth = 100; // 200vw - 100vw
          setScrollX(-progress * scrollableWidth);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: '200vw', transform: `translateX(${scrollX}vw)` }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${project.x}vw`,
                top: `${project.y}vh`,
                width: `${project.width}vw`,
                height: project.isText ? 'auto' : `${project.height}vh`,
              }}
            >
              {project.isText ? (
                <div>
                    <p className="text-lg font-semibold">{project.title}</p>
                    <p className="text-sm text-gray-700">{project.year}</p>
                </div>
              ) : (
                <img
                    src={project.imageUrl}
                    alt={project.title || `Project ${index + 1}`}
                    className={`w-full h-full ${project.isSketch ? '' : 'object-cover'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;