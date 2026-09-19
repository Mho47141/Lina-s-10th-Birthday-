import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import mermaidHeroImg from '../assets/images/mermaid_hero_swim_1789756785046.jpg';

interface HeroScreenProps {
  lang: Language;
  onNext?: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ lang, onNext }) => {
  const t = translations[lang];

  const handleScrollNext = () => {
    if (onNext) {
      onNext();
      return;
    }
    const elem = document.getElementById('section-details');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-between text-white select-none overflow-hidden py-10">
      {/* Background Hero Swimming Image with gentle parallax feel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={mermaidHeroImg}
          alt="Lina swimming with sea turtle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Deep blue ocean gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-transparent to-blue-950/90 pointer-events-none" />
      </div>

      {/* Top Header Card */}
      <div className="relative z-10 pt-10 px-6 text-center max-w-sm">
        <div className="p-5 sm:p-6 rounded-3xl bg-blue-950/55 backdrop-blur-md border border-cyan-300/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          {/* Cursive Name */}
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-sky-200 to-pink-200 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight">
            {t.birthdayTitle}
          </h1>
          <div className="text-2xl sm:text-3xl font-display font-bold text-cyan-200 tracking-wide mt-1">
            {t.birthdaySubtitle}
          </div>

          <div className="flex items-center justify-center gap-2 my-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-300/60" />
            <span className="text-cyan-300 text-base">🐚</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-300/60" />
          </div>

          <p className="text-sm sm:text-base text-cyan-50/95 leading-relaxed font-medium">
            {t.heroDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
