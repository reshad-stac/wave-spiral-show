interface SpiralAnimationProps {
  continuous?: boolean;
  className?: string;
}

const SpiralAnimation = ({ continuous = false, className = "" }: SpiralAnimationProps) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${continuous ? "animate-spiral-continuous" : "animate-spiral-spin"} ${className}`}
    >
      <defs>
        <path
          id="spiral"
          d="M 100,100 m 0,-90 a 90,90 0 0,1 0,180 a 70,70 0 0,1 0,-140 a 50,50 0 0,1 0,100 a 30,30 0 0,1 0,-60 a 10,10 0 0,1 0,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </defs>
      <use href="#spiral" />
    </svg>
  );
};

export default SpiralAnimation;
