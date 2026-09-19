import React from 'react';
import { motion } from 'motion/react';

interface MermaidScrollDecorProps {
  type?: 'divider' | 'pearl' | 'wave';
}

export const MermaidScrollDecor: React.FC<MermaidScrollDecorProps> = ({ type = 'divider' }) => {
  return (
    <div className="relative w-full flex items-center justify-center py-6 select-none pointer-events-none">
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
        className="mx-3 px-3 py-1 rounded-full bg-blue-950/70 border border-cyan-400/30 backdrop-blur-sm text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
      >
        <span className="text-pink-300">✨</span>
        <span className="text-cyan-200">🐚</span>
        <span className="text-pink-300">✨</span>
      </motion.div>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
};
