import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  id?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <section
      id={id}
      className={`relative w-full ${className}`}
    >
      {children}
    </section>
  );
};

export const FloatingSeaCreatures: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {/* Gentle floating starfish */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [0, 6, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="absolute top-28 left-3 sm:left-6 text-2xl opacity-80 select-none pointer-events-none"
      >
        ⭐
      </motion.div>

      {/* Gentle swimming turtle on right */}
      <motion.div
        animate={{
          y: [0, 18, 0],
          x: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7.5,
          ease: 'easeInOut',
        }}
        className="absolute top-[42%] right-3 sm:right-6 text-2xl opacity-75 select-none pointer-events-none"
      >
        🐢
      </motion.div>

      {/* Floating Seashell */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6.5,
          ease: 'easeInOut',
        }}
        className="absolute top-[68%] left-4 text-2xl opacity-75 select-none pointer-events-none"
      >
        🐚
      </motion.div>

      {/* Friendly crab near bottom */}
      <motion.div
        animate={{
          x: [0, 8, 0],
          y: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-4 text-2xl opacity-80 select-none pointer-events-none"
      >
        🦀
      </motion.div>
    </div>
  );
};
