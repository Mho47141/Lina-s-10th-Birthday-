/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { triggerMagicalGlitter } from '../utils/glitter';

interface NavPearlButtonsProps {
  lang: Language;
  onPrev?: () => void;
  onNext?: () => void;
  nextId?: string;
  prevId?: string;
}

export const NavPearlButtons: React.FC<NavPearlButtonsProps> = ({
  lang,
  onPrev,
  onNext,
  nextId = 'btn-pearl-next',
  prevId = 'btn-pearl-prev',
}) => {
  const isRtl = lang === 'ar';

  const handleNext = () => {
    soundFX.playBubblePop();
    triggerMagicalGlitter(0.5);
    if (onNext) onNext();
  };

  const handlePrev = () => {
    soundFX.playBubblePop();
    if (onPrev) onPrev();
  };

  return (
    <div className="flex items-center justify-center gap-5 pt-3 pb-1 w-full">
      {/* Previous Pearl Button (Circular) */}
      {onPrev && (
        <button
          id={prevId}
          type="button"
          onClick={handlePrev}
          aria-label={isRtl ? 'الصفحة السابقة' : 'Previous Page'}
          className="w-12 h-12 rounded-full bg-blue-950/80 hover:bg-cyan-950/90 border border-cyan-400/50 hover:border-cyan-300 shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_15px_rgba(56,189,248,0.25)] flex items-center justify-center text-cyan-200 hover:text-white transition-all active:scale-90 cursor-pointer group"
        >
          {isRtl ? (
            <ChevronRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-cyan-200 group-hover:-translate-x-0.5 transition-transform" />
          )}
        </button>
      )}

      {/* Next Magical Pearl Medallion (Circular with bioluminescent glow) */}
      {onNext && (
        <button
          id={nextId}
          type="button"
          onClick={handleNext}
          aria-label={isRtl ? 'الصفحة التالية' : 'Next Page'}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-300 to-pink-400 hover:from-cyan-300 hover:to-pink-300 border-2 border-white/90 shadow-[0_0_30px_rgba(56,189,248,0.8),0_0_45px_rgba(244,114,182,0.5),0_8px_25px_rgba(0,0,0,0.7)] flex items-center justify-center text-slate-950 transition-all active:scale-95 cursor-pointer group animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          {/* Subtle rotating magical sparkle accent */}
          <span className="absolute -top-1 -right-1 text-xs">✨</span>

          {isRtl ? (
            <ChevronLeft className="w-6 h-6 text-slate-950 stroke-[2.8] group-hover:-translate-x-0.5 transition-transform" />
          ) : (
            <ChevronRight className="w-6 h-6 text-slate-950 stroke-[2.8] group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>
      )}
    </div>
  );
};
