import { Server, GitMerge, Plug, Zap, Key } from 'lucide-react';
import { useEffect, useState } from 'react';

const technologies = [
  { name: "Next.js", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" /> },
  { name: "React", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /> },
  { name: "Tailwind CSS", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" /> },
  { name: "Bootstrap", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" /> },
  { name: "Django", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" /> },
  { name: "Node.js", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> },
  { name: "Docker", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" /> },
  { name: "Kubernetes", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" /> },
  { name: "AWS", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" /> },
  { name: "GitHub Actions", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" /> },
  { name: "PostgreSQL", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" /> },
  { name: "MongoDB", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" /> },
  { name: "MySQL", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" /> },
  { name: "VPS", icon: <Server className="text-white" /> },
  { name: "CI/CD", icon: <GitMerge className="text-white" /> },
  { name: "API Design", icon: <Plug className="text-white" /> },
  { name: "Automation", icon: <Zap className="text-white" /> },
  { name: "Authentication", icon: <Key className="text-white" /> },
];

interface TechStackCircleProps {
  scale: number;
}

const TechStackCircle = ({ scale }: TechStackCircleProps) => {
  const [screenSize, setScreenSize] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveSize = () => {
    if (screenSize < 768) return 300;
    if (screenSize < 1024) return 400;
    return 600;
  }

  const targetScreenSize = getResponsiveSize();
  const outerRingSize = targetScreenSize / (scale || 1);
  const iconRadius = (outerRingSize / 2) * 0.82;
  const innerRingSize = outerRingSize * 0.7;
  const angleStep = 360 / technologies.length;

  const itemCircumference = 2 * Math.PI * iconRadius;
  const itemWidth = itemCircumference / technologies.length;

  const iconSize = screenSize < 768 ? 'w-4 h-4' : 'w-6 h-6';
  const textSize = screenSize < 768 ? 'text-[8px]' : 'text-[10px]';

  const ringStyle = {
    border: '2px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.5)',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: 'white',
    fontSize: `${outerRingSize * 0.15}px`,
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
        <div
            className="absolute"
            style={{
                width: `${outerRingSize}px`,
                height: `${outerRingSize}px`,
                zIndex: 0,
            }}
        >
            <div style={{ ...textStyle, position: 'absolute', top: '15%', left: '15%', transform: 'translate(-50%, -50%) rotate(-15deg)' }}>
                TECH
            </div>
            <div style={{ ...textStyle, position: 'absolute', bottom: '15%', right: '15%', transform: 'translate(50%, 50%) rotate(-15deg)' }}>
                STACK
            </div>
        </div>

      <div
        className="absolute rounded-full"
        style={{
          width: `${outerRingSize}px`,
          height: `${outerRingSize}px`,
          ...ringStyle,
          zIndex: 1,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: `${innerRingSize}px`,
          height: `${innerRingSize}px`,
          ...ringStyle,
          zIndex: 1,
        }}
      />
        {technologies.map((tech, index) => {
          const angle = angleStep * index;
          const x = iconRadius * Math.cos((angle * Math.PI) / 180);
          const y = iconRadius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={tech.name}
              className="absolute flex flex-col items-center"
              style={{
                top: '50%',
                left: '50%',
                width: `${itemWidth}px`,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${1 / Math.max(scale, 1)})`,
                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))',
                zIndex: 2,
              }}
            >
              <div className={iconSize}>{tech.icon}</div>
              <p className={`text-white mt-1 text-center ${textSize}`} style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.7)' }}>{tech.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default TechStackCircle;
