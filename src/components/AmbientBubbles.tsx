import React, { useMemo } from 'react';

export const AmbientBubbles: React.FC = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 14) + 8,
      left: Math.floor(Math.random() * 94) + 3,
      duration: Math.floor(Math.random() * 8) + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.2,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {/* Gentle water shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-blue-950/20 pointer-events-none" />

      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-gradient-to-tr from-white/20 via-cyan-100/40 to-white/60 shadow-[0_0_6px_rgba(56,189,248,0.4)] animate-rise will-change-transform"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: '-40px',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            animationIterationCount: 'infinite',
            opacity: b.opacity,
          }}
        >
          {/* Inner bubble reflection */}
          <div className="absolute top-[18%] left-[22%] w-[30%] h-[30%] rounded-full bg-white/70" />
        </div>
      ))}
    </div>
  );
};
