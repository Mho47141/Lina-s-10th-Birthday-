/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { FloatingControls } from './components/FloatingControls';
import { AmbientBubbles } from './components/AmbientBubbles';
import { FloatingSeaCreatures } from './components/FadeInSection';
import { CoverShellScreen } from './components/CoverShellScreen';
import { CountdownCard } from './components/CountdownCard';
import { MapLocationCard } from './components/MapLocationCard';
import { RSVPScreen } from './components/RSVPScreen';
import { WishesGuestbook } from './components/WishesGuestbook';
import { ThankYouScreen } from './components/ThankYouScreen';
import { soundFX } from './utils/audio';
import { triggerMagicalGlitter } from './utils/glitter';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import oceanDeepBg from './assets/images/ocean_deep_seamless_1789758713104.jpg';

type SectionId = 'cover' | 'countdown' | 'location' | 'rsvp' | 'wishes' | 'thankyou';

const SECTION_ORDER: SectionId[] = ['cover', 'countdown', 'location', 'rsvp', 'wishes', 'thankyou'];

export default function App() {
  const [lang, setLang] = useState<Language>('en'); // Default to English always; resets to English on refresh
  const [soundActive, setSoundActive] = useState(true);
  const [currentSection, setCurrentSection] = useState<SectionId>('cover');

  // Synchronize document direction with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Audio: Enabled by default as soon as the link is opened
  useEffect(() => {
    soundFX.startAmbient((isPlaying) => setSoundActive(isPlaying));

    // Mobile/Desktop browsers require a user interaction to unlock the AudioContext
    const unlockAudioOnGesture = () => {
      soundFX.resumeAndPlay((isPlaying) => setSoundActive(isPlaying));
      window.removeEventListener('click', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
    };

    window.addEventListener('click', unlockAudioOnGesture, { passive: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { passive: true });
    window.addEventListener('pointerdown', unlockAudioOnGesture, { passive: true });

    return () => {
      window.removeEventListener('click', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
    };
  }, []);

  const toggleLanguage = () => {
    soundFX.playBubblePop();
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleSound = () => {
    soundFX.playBubblePop();
    if (soundActive) {
      soundFX.stopAmbient(() => setSoundActive(false));
      setSoundActive(false);
    } else {
      soundFX.startAmbient(() => setSoundActive(true));
      setSoundActive(true);
    }
  };

  const goToSection = (nextSection: SectionId) => {
    triggerMagicalGlitter(0.6);
    soundFX.playBubblePop();
    setCurrentSection(nextSection);
  };

  const currentIndex = SECTION_ORDER.indexOf(currentSection);

  const handleNext = () => {
    if (currentIndex < SECTION_ORDER.length - 1) {
      goToSection(SECTION_ORDER[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToSection(SECTION_ORDER[currentIndex - 1]);
    }
  };

  const handleRestart = () => {
    goToSection('cover');
  };

  // Section names for indicator tooltip
  const sectionLabels: Record<SectionId, { ar: string; en: string }> = {
    cover: { ar: 'الغلاف', en: 'Cover' },
    countdown: { ar: 'الموعد', en: 'Date & Time' },
    location: { ar: 'الموقع', en: 'Location' },
    rsvp: { ar: 'تأكيد الحضور', en: 'RSVP' },
    wishes: { ar: 'الأمنيات', en: 'Wishes' },
    thankyou: { ar: 'شكر وتقدير', en: 'Thank You' },
  };

  return (
    <div
      id="invitation-app-root"
      className="fixed inset-0 w-full h-full bg-[#021326] text-slate-100 flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* 1. Global Fixed Ocean Background with rich depth and light */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Ocean Artwork */}
        <img
          src={oceanDeepBg}
          alt="Deep Ocean Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 mix-blend-screen scale-105"
        />
        {/* Rich Oceanic Gradient Shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021124]/90 via-[#031d38]/80 to-[#010e1f]/95" />
        {/* Soft bioluminescent lights */}
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)]" />
        <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-[5%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_70%)]" />
      </div>

      {/* 2. Ambient Rising Bubbles */}
      <AmbientBubbles />

      {/* 3. Floating friendly sea creatures */}
      <FloatingSeaCreatures />

      {/* 4. Floating Top Bar: Language & Sound only */}
      <FloatingControls
        lang={lang}
        onToggleLang={toggleLanguage}
        soundActive={soundActive}
        onToggleSound={toggleSound}
      />

      {/* 5. Main Single Slide Canvas (No scroll - Animated transitions with magic blur & glitter) */}
      <main className="w-full max-w-md sm:max-w-lg h-full flex-1 relative z-10 flex flex-col items-center justify-center pt-14 sm:pt-16 pb-16 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)', y: 15 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)', y: -15 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center overflow-hidden"
          >
            {currentSection === 'cover' && (
              <CoverShellScreen lang={lang} onNext={handleNext} />
            )}

            {currentSection === 'countdown' && (
              <CountdownCard lang={lang} />
            )}

            {currentSection === 'location' && (
              <MapLocationCard lang={lang} />
            )}

            {currentSection === 'rsvp' && (
              <RSVPScreen lang={lang} />
            )}

            {currentSection === 'wishes' && (
              <WishesGuestbook lang={lang} />
            )}

            {currentSection === 'thankyou' && (
              <ThankYouScreen
                lang={lang}
                onRestart={handleRestart}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 6. Fixed Bottom Navigation Bar (Hidden on Cover and Thank You screens) */}
      {currentSection !== 'cover' && currentSection !== 'thankyou' && (
        <footer className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-xs sm:max-w-sm mx-auto flex items-center justify-between pointer-events-auto">
            {/* Previous Circular Pearl Button (Fixed) */}
            <button
              id="btn-fixed-nav-prev"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              aria-label={lang === 'ar' ? 'الصفحة السابقة' : 'Previous page'}
              className="w-12 h-12 rounded-full bg-blue-950/85 hover:bg-cyan-950/90 border border-cyan-400/50 hover:border-cyan-300 shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-md flex items-center justify-center text-cyan-200 hover:text-white transition-all active:scale-90 cursor-pointer group"
            >
              {lang === 'ar' ? (
                <ChevronRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-cyan-200 group-hover:-translate-x-0.5 transition-transform" />
              )}
            </button>

            {/* Compact Step Indicator Dots Strip (Small width, no movement buttons) */}
            <div className="bg-slate-950/75 backdrop-blur-md px-3 py-2 rounded-full border border-cyan-400/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-1.5 w-fit">
              {SECTION_ORDER.map((sec) => (
                <button
                  key={sec}
                  id={`btn-dot-${sec}`}
                  onClick={() => goToSection(sec)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSection === sec
                      ? 'w-5 h-1.5 bg-gradient-to-r from-cyan-400 to-pink-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                      : 'w-1.5 h-1.5 bg-cyan-200/30 hover:bg-cyan-200/60'
                  }`}
                  title={lang === 'ar' ? sectionLabels[sec].ar : sectionLabels[sec].en}
                />
              ))}
            </div>

            {/* Next Circular Pearl Medallion (Fixed, with glow & sparkle) */}
            <button
              id="btn-fixed-nav-next"
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= SECTION_ORDER.length - 1}
              aria-label={lang === 'ar' ? 'الصفحة التالية' : 'Next page'}
              className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-300 to-pink-400 hover:from-cyan-300 hover:to-pink-300 border-2 border-white/90 shadow-[0_0_25px_rgba(56,189,248,0.8),0_0_35px_rgba(244,114,182,0.5),0_8px_25px_rgba(0,0,0,0.7)] flex items-center justify-center text-slate-950 transition-all active:scale-90 cursor-pointer group"
            >
              <span className="absolute -top-1 -right-1 text-xs pointer-events-none">✨</span>
              {lang === 'ar' ? (
                <ChevronLeft className="w-6 h-6 text-slate-950 stroke-[2.8] group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ChevronRight className="w-6 h-6 text-slate-950 stroke-[2.8] group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
