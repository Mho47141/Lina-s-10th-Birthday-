import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Globe, Volume2, VolumeX } from 'lucide-react';

interface FloatingControlsProps {
  lang: Language;
  onToggleLang: () => void;
  soundActive: boolean;
  onToggleSound: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  lang,
  onToggleLang,
  soundActive,
  onToggleSound,
}) => {
  const t = translations[lang];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 pointer-events-none" aria-label="Invitation Quick Controls">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left cluster: Language & Sound */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Language Switch */}
          <button
            id="btn-language-toggle"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-cyan-200 border border-cyan-400/40 backdrop-blur-md text-xs font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all active:scale-95 cursor-pointer"
            title={lang === 'en' ? 'الترجمة إلى العربية' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>{lang === 'en' ? 'عربي' : 'English'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-sound-toggle"
            onClick={onToggleSound}
            className={`flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all active:scale-95 cursor-pointer ${
              soundActive
                ? 'bg-cyan-500/80 border-cyan-300 text-white shadow-cyan-500/30'
                : 'bg-slate-900/70 border-cyan-500/30 text-cyan-300 hover:bg-slate-900/90'
            }`}
            title={soundActive ? t.audioOff : t.audioOn}
          >
            {soundActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>
        </div>
      </div>
    </header>
  );
};
