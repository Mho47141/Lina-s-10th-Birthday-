import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { triggerMagicalGlitter } from '../utils/glitter';
import linaMermaidImg from '../assets/images/Lina_mermaid.png';
import underLinaShapeImg from '../assets/images/Under_Lina_Decorative_Shape.png';

interface CoverShellScreenProps {
  lang: Language;
  onNext?: () => void;
}

export const CoverShellScreen: React.FC<CoverShellScreenProps> = ({ lang, onNext }) => {
  const t = translations[lang];
  const [isSparkleActive, setIsSparkleActive] = useState(false);

  const handleOpenInvitation = () => {
    soundFX.resumeAndPlay();
    soundFX.playShellOpenChime();
    triggerMagicalGlitter(0.5);
    setIsSparkleActive(true);
    setTimeout(() => {
      setIsSparkleActive(false);
      if (onNext) onNext();
    }, 300);
  };

  return (
    <div className="relative w-full h-full min-h-[85vh] max-h-[96vh] flex flex-col items-center justify-between text-white select-none py-2 px-3 sm:px-4">
      {/* Standalone Mermaid Section - No Frame, No Card Container */}
      <div className="relative z-10 my-auto flex flex-col items-center w-full max-w-md sm:max-w-xl">
        {/* Character Stage with Decorative Shape Base Behind & Below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative flex flex-col items-center justify-center w-full"
        >
          {/* Decorative Shape Base (Positioned directly behind and slightly below Lina) */}
          <img
            src={underLinaShapeImg}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[115%] max-w-[460px] h-auto object-contain pointer-events-none -z-10 select-none opacity-95"
          />

          {/* Standalone Transparent Mermaid Character: Lina on the Sea Rock */}
          <div
            onClick={handleOpenInvitation}
            className="relative z-10 cursor-pointer flex flex-col items-center w-full"
          >
            <motion.img
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              src={linaMermaidImg}
              alt="Lina the Mermaid"
              referrerPolicy="no-referrer"
              className="w-auto max-h-[60vh] sm:max-h-[66vh] md:max-h-[70vh] object-contain transition-transform duration-500 hover:scale-[1.03] select-none pointer-events-auto filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
            />

            {/* Large Circular Action Button - Positioned in Bottom-Left Corner over Lina's image */}
            <motion.button
              id="btn-open-royal-invitation"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInvitation();
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              animate={{
                boxShadow: [
                  '0 0 25px rgba(56,189,248,0.7), 0 10px 26px rgba(0,0,0,0.5)',
                  '0 0 40px rgba(244,114,182,0.85), 0 10px 26px rgba(0,0,0,0.5)',
                  '0 0 25px rgba(56,189,248,0.7), 0 10px 26px rgba(0,0,0,0.5)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute bottom-2 -left-2 sm:bottom-4 sm:-left-4 md:-left-6 z-30 w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] rounded-full bg-gradient-to-tr from-cyan-400 via-teal-300 to-pink-400 text-slate-950 flex items-center justify-center border-2 border-white/95 cursor-pointer group select-none shadow-[0_0_30px_rgba(56,189,248,0.7)]"
              title={lang === 'ar' ? 'افتح الدعوة الملكية' : 'Open Royal Invitation'}
              aria-label={lang === 'ar' ? 'افتح الدعوة الملكية' : 'Open Royal Invitation'}
            >
              {/* Outer pulsing ring */}
              <span className="absolute -inset-2 rounded-full bg-cyan-300/35 animate-ping pointer-events-none" style={{ animationDuration: '2.8s' }} />

              <span className="font-greatvibes text-3xl sm:text-4xl font-extrabold tracking-normal leading-none text-emerald-950 text-center select-none pt-1">
                Open
              </span>
            </motion.button>

            {/* Sparkle burst when clicked */}
            {isSparkleActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <span className="text-6xl filter drop-shadow-[0_0_25px_rgba(255,255,255,0.95)] animate-ping">
                  ✨
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Lina Name & Title Info (Sitting directly in the underwater atmosphere) */}
        <div className="pt-0 text-center relative z-10 flex flex-col items-center overflow-visible">
          <div className="relative overflow-visible filter drop-shadow-[0_6px_25px_rgba(0,0,0,0.85)]">
            <motion.h1
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="font-greatvibes text-7xl sm:text-8xl md:text-9xl leading-[1.35] pt-5 pb-2 px-8 overflow-visible text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-pink-200 select-none tracking-wide"
            >
              Lina
            </motion.h1>
          </div>

          <div className="flex items-center justify-center gap-2 -mt-1">
            <span className="text-cyan-300 text-xs">⭐</span>
            <p className="text-xs uppercase tracking-widest text-cyan-200 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {lang === 'ar' ? 'عيد ميلاد لينا العاشر' : "Lina's 10th Birthday"}
            </p>
            <span className="text-cyan-300 text-xs">⭐</span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-cyan-100/95 leading-relaxed font-medium max-w-xs drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {lang === 'ar'
              ? 'ندعوكم لمشاركتنا أجمل اللحظات وأسعدها في حفل عيد ميلادي الساحر تحت أعماق البحار 🌊'
              : "Join us under the sea for an enchanting royal underwater birthday celebration! 🌊"}
          </p>
        </div>
      </div>
    </div>
  );
};
