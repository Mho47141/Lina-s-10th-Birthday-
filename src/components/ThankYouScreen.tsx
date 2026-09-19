import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import mermaidThankyouImg from '../assets/images/mermaid_thankyou_1789756812147.jpg';
import { triggerMagicalGlitter } from '../utils/glitter';
import { soundFX } from '../utils/audio';

interface ThankYouScreenProps {
  lang: Language;
  onRestart?: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ lang, onRestart }) => {
  const t = translations[lang];

  const handleRestart = () => {
    soundFX.playShellOpenChime();
    triggerMagicalGlitter(0.7);
    if (onRestart) onRestart();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between text-white select-none overflow-hidden py-4 sm:py-6 px-3 sm:px-4 pb-16 sm:pb-20">
      {/* Mermaid Gazing at Castle Background with subtle scale animation */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
        <img
          src={mermaidThankyouImg}
          alt="Mermaid gazing at underwater kingdom"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-950/30 to-blue-950/90 pointer-events-none" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-4 px-2 text-center max-w-sm w-full"
      >
        <div className="p-5 sm:p-6 rounded-3xl bg-blue-950/70 backdrop-blur-xl border border-cyan-300/40 shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(56,189,248,0.3)]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-cyan-500/30 text-pink-300 border border-pink-300/50 mb-2 shadow-[0_0_20px_rgba(244,114,182,0.4)]">
            <Heart className="w-6 h-6 text-pink-200 fill-pink-400 animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-pink-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {t.thankYouTitle}
          </h1>

          <div className="flex items-center justify-center gap-2 my-2">
            <span className="text-cyan-300 text-base">🐚</span>
            <span className="text-pink-300 text-xs">✨</span>
            <span className="text-cyan-300 text-base">🧜‍♀️</span>
          </div>

          <p className="mt-2 text-sm sm:text-base text-pink-200 font-semibold drop-shadow">
            {lang === 'ar' ? 'بانتظاركم بكل حب وشوق! 💕' : "Can't wait to celebrate together! 💕"}
          </p>
        </div>
      </motion.div>

      {/* Bottom Action: Restart from beginning */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 pb-4 px-2 w-full max-w-sm flex flex-col gap-2 items-center"
      >
        <button
          id="btn-restart-invitation"
          onClick={handleRestart}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] border border-white/40 transition-all active:scale-95 cursor-pointer group"
        >
          <RotateCcw className="w-4 h-4 text-slate-950 group-hover:-rotate-45 transition-transform" />
          <span>{lang === 'ar' ? 'العودة لبداية الدعوة 🐚' : 'Back to Beginning 🐚'}</span>
          <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-spin" style={{ animationDuration: '6s' }} />
        </button>
      </motion.div>
    </div>
  );
};
