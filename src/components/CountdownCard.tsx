import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles, Check } from 'lucide-react';
import { getGoogleCalendarUrl, downloadICalFile } from '../utils/share';
import { soundFX } from '../utils/audio';
import { triggerMagicalGlitter } from '../utils/glitter';

interface CountdownCardProps {
  lang: Language;
  targetDateStr?: string;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({
  lang,
  targetDateStr = '2026-09-25T17:00:00',
}) => {
  const t = translations[lang];
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [calendarSaved, setCalendarSaved] = useState(false);

  useEffect(() => {
    let target = new Date(targetDateStr).getTime();
    if (isNaN(target)) {
      target = new Date('2026-09-25T17:00:00').getTime();
    }

    const calculate = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const handleCalendar = (type: 'google' | 'ical') => {
    soundFX.playBubblePop();
    triggerMagicalGlitter(0.7);
    if (type === 'google') {
      window.open(getGoogleCalendarUrl(), '_blank');
    } else {
      downloadICalFile();
    }
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 4000);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-white select-none p-3 sm:p-4 pb-20 overflow-y-auto scrollbar-none">
      {/* Center Container Card with glowing shadows & rich styling */}
      <div className="relative z-10 w-full max-w-sm m-auto text-center flex flex-col gap-3 py-1">
        <div className="bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/90 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-cyan-300/40 shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(56,189,248,0.3)]">
          {/* Header */}
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 text-cyan-300 border border-cyan-300/50 mb-1.5 shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {lang === 'ar' ? 'الموعد والعد التنازلي' : 'Date, Time & Countdown'}
          </h3>
          <p className="text-xs text-cyan-200/85 mt-0.5 max-w-xs mx-auto">
            {lang === 'ar'
              ? 'ننتظر بشوق رؤيتكم لنحتفل سوياً بأجمل الذكريات!'
              : 'Counting down the magical seconds until the celebration!'}
          </p>

          {/* Combined Date & Time Box */}
          <div className="my-2.5 p-3 rounded-2xl bg-blue-950/60 border border-cyan-400/30 backdrop-blur-md shadow-inner text-start flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-cyan-100">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                <Calendar className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-cyan-300/80 block font-semibold">
                  {lang === 'ar' ? 'التاريخ' : 'Date'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t.dateLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-cyan-100 border-t border-cyan-400/15 pt-1.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                <Clock className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-cyan-300/80 block font-semibold">
                  {lang === 'ar' ? 'الوقت' : 'Time'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t.timeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Live Countdown Flip/Counter Cards */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 my-2.5">
            {/* Days */}
            <div className="p-2 rounded-2xl bg-gradient-to-b from-blue-900/70 to-blue-950/95 border border-cyan-400/40 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-100 font-mono tracking-tight drop-shadow">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] text-cyan-300/90 uppercase font-semibold mt-0.5">
                {t.days}
              </div>
            </div>

            {/* Hours */}
            <div className="p-2 rounded-2xl bg-gradient-to-b from-blue-900/70 to-blue-950/95 border border-cyan-400/40 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-100 font-mono tracking-tight drop-shadow">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] text-cyan-300/90 uppercase font-semibold mt-0.5">
                {t.hours}
              </div>
            </div>

            {/* Minutes */}
            <div className="p-2 rounded-2xl bg-gradient-to-b from-blue-900/70 to-blue-950/95 border border-cyan-400/40 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-100 font-mono tracking-tight drop-shadow">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] text-cyan-300/90 uppercase font-semibold mt-0.5">
                {t.minutes}
              </div>
            </div>

            {/* Seconds */}
            <div className="p-2 rounded-2xl bg-gradient-to-b from-pink-950/50 to-blue-950/95 border border-pink-400/50 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <motion.div
                key={timeLeft.seconds}
                initial={{ scale: 1.15, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl sm:text-2xl font-extrabold text-pink-300 font-mono tracking-tight drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]"
              >
                {String(timeLeft.seconds).padStart(2, '0')}
              </motion.div>
              <div className="text-[9px] sm:text-[10px] text-pink-200 uppercase font-semibold mt-0.5">
                {t.seconds}
              </div>
            </div>
          </div>

          {/* Add to Calendar Button */}
          <div className="pt-2 border-t border-cyan-400/20">
            <span className="block text-[11px] text-cyan-200/90 font-medium mb-1.5">
              {t.addToCalendar}
            </span>

            <div className="flex items-center gap-2 justify-center">
              <button
                id="btn-add-google-calendar"
                onClick={() => handleCalendar('google')}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white font-semibold text-xs border border-cyan-300/50 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Google Calendar</span>
              </button>

              <button
                id="btn-add-icalendar"
                onClick={() => handleCalendar('ical')}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-200 font-semibold text-xs border border-cyan-400/40 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Apple / iCal</span>
              </button>
            </div>

            {calendarSaved && (
              <div className="flex items-center justify-center gap-1 text-emerald-300 text-xs font-medium mt-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{t.calendarSuccess}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
