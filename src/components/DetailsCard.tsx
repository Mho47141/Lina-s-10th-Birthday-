import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import parchmentReefImg from '../assets/images/parchment_reef_1789756799539.jpg';

interface DetailsCardProps {
  lang: Language;
  onNext?: () => void;
  onNavigateToMap?: () => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ lang, onNext, onNavigateToMap }) => {
  const t = translations[lang];

  const handleMapClick = () => {
    if (onNavigateToMap) {
      onNavigateToMap();
      return;
    }
    const mapElem = document.getElementById('section-map');
    if (mapElem) mapElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    if (onNext) {
      onNext();
      return;
    }
    const elem = document.getElementById('section-countdown');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-between text-slate-900 select-none overflow-hidden p-4 py-8">
      {/* Background with Reef & Treasure Chest */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={parchmentReefImg}
          alt="Coral reef and treasure chest"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/45 via-transparent to-blue-950/85 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-4" />

      {/* Center Parchment Card - styled like ancient treasure map scroll */}
      <div className="relative z-10 w-full max-w-sm my-auto">
        <div className="relative bg-[#fff7ea] rounded-3xl p-6 sm:p-7 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-4 border-[#e6d0a7] text-slate-800">
          {/* Decorative Sea Star & Shell corners */}
          <motion.div
            animate={{ rotate: [-12, -4, -12] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -top-3.5 -left-3.5 text-2xl select-none filter drop-shadow"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{ rotate: [12, 4, 12] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -top-3.5 -right-3.5 text-2xl select-none filter drop-shadow"
          >
            🪸
          </motion.div>
          <div className="absolute -bottom-3 -left-3 text-2xl select-none filter drop-shadow">
            🐚
          </div>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute -bottom-3 -right-3 text-2xl select-none filter drop-shadow"
          >
            🦀
          </motion.div>

          {/* Card Header */}
          <div className="text-center mb-5">
            <div className="text-xl mb-0.5">🐚</div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-sky-900 tracking-wide">
              {t.detailsHeader}
            </h2>
            <div className="h-0.5 w-16 bg-amber-400/80 mx-auto mt-1 rounded-full" />
          </div>

          {/* Items */}
          <div className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#ffeed2]/70 border border-[#ecd2a8]">
              <div className="p-2 rounded-xl bg-cyan-600 text-white shadow-sm shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-800">
                  {t.dateLabel}
                </div>
                <div className="text-xs text-cyan-900/80 font-medium flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-700" />
                  <span>{t.timeLabel}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div
              onClick={handleMapClick}
              className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#ffeed2]/70 border border-[#ecd2a8] cursor-pointer hover:bg-[#ffe6bf] transition-colors group"
            >
              <div className="p-2 rounded-xl bg-pink-500 text-white shadow-sm shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-800">
                  {t.locationTitle}
                </div>
                <div className="text-xs text-slate-700 mt-0.5 leading-snug">
                  {t.locationAddress}
                </div>
                <span className="text-[11px] text-cyan-700 font-semibold underline mt-1 inline-block">
                  {lang === 'ar' ? 'عرض على الخريطة ←' : 'View on map →'}
                </span>
              </div>
            </div>

            {/* Activities & Fun */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#ffeed2]/70 border border-[#ecd2a8]">
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-xs sm:text-sm text-slate-800 leading-snug">
                  {t.activitiesLabel}
                </div>
                <div className="text-[11px] text-amber-800 font-medium mt-1">
                  {t.dressCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
