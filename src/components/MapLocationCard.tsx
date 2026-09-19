import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface MapLocationCardProps {
  lang: Language;
}

export const MapLocationCard: React.FC<MapLocationCardProps> = ({ lang }) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = "https://maps.app.goo.gl/rvnMapek8SyPEGDh9";
  const appleMapsUrl = "https://maps.apple/p/fyVjGupWUKkqIZ";
  const venueName = lang === 'ar' ? "كمبوند ستون ريزيدنس (Stone Residence)" : "Stone Residence Compound";
  const venueAddress = lang === 'ar' ? "الوحدة 273، الدور الأرضي" : "Unit 273, Ground Floor";
  const fullAddress = "Unit 273, Stone Residence Compound, Ground Floor";
  const mapEmbedQuery = encodeURIComponent("Stone Residence Compound, New Cairo, Egypt");

  const handleCopyAddress = () => {
    soundFX.playBubblePop();
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenGoogleMaps = () => {
    soundFX.playBubblePop();
    window.open(googleMapsUrl, '_blank');
  };

  const handleOpenAppleMaps = () => {
    soundFX.playBubblePop();
    window.open(appleMapsUrl, '_blank');
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-white select-none p-3 sm:p-4 pb-20 overflow-y-auto scrollbar-none">
      {/* Main Map Card */}
      <div className="relative z-10 w-full max-w-sm m-auto flex flex-col gap-3 py-1">
        <div className="bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/90 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-cyan-300/40 shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(56,189,248,0.3)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 text-cyan-300 border border-cyan-300/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <MapPin className="w-5 h-5 text-cyan-200 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 drop-shadow">
                  {t.partyLocation}
                </h3>
                <p className="text-xs text-cyan-200/80 font-medium">{venueName}</p>
              </div>
            </div>
            <span className="text-2xl filter drop-shadow">🧜‍♀️</span>
          </div>

          {/* Map Preview Embed */}
          <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-cyan-400/40 shadow-inner group">
            <iframe
              title="Party Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.2)' }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${mapEmbedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
            {/* Click to open badge overlay */}
            <div
              onClick={handleOpenGoogleMaps}
              className="absolute bottom-2 right-2 bg-slate-950/85 hover:bg-slate-900 text-cyan-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-cyan-400/40 backdrop-blur-md flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-lg"
            >
              <span>{t.openGoogleMaps}</span>
              <ExternalLink className="w-3 h-3 text-cyan-300" />
            </div>
          </div>

          {/* Address Box */}
          <div className="mt-3.5 p-3 rounded-2xl bg-blue-950/70 border border-cyan-400/30 flex items-center justify-between gap-2 shadow-inner">
            <div className="text-xs text-slate-200 truncate">
              <span className="font-bold text-cyan-200 block truncate">{venueName}</span>
              <span className="text-[11px] text-cyan-200/80 truncate block">{venueAddress}</span>
            </div>
            <button
              id="btn-copy-address"
              onClick={handleCopyAddress}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white text-[11px] font-semibold border border-cyan-300/40 shrink-0 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-300">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copyAddress}</span>
                </>
              )}
            </button>
          </div>

          {/* Map App Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-cyan-400/20">
            <button
              id="btn-open-google-maps"
              onClick={handleOpenGoogleMaps}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white font-semibold text-xs border border-cyan-300/50 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>

            <button
              id="btn-open-apple-maps"
              onClick={handleOpenAppleMaps}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-200 font-semibold text-xs border border-cyan-400/40 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t.openAppleMaps}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
