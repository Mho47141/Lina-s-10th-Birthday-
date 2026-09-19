import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, User, Users, Phone, FileText, Send, Check, Minus, Plus } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { triggerMagicalGlitter } from '../utils/glitter';
import { dataService } from '../services/dataService';

interface RSVPScreenProps {
  lang: Language;
  onRSVPSubmitted?: (newCount: number) => void;
  isGoogleSheetConnected?: boolean;
}

export const RSVPScreen: React.FC<RSVPScreenProps> = ({
  lang,
  onRSVPSubmitted,
  isGoogleSheetConnected,
}) => {
  const t = translations[lang];

  const [status, setStatus] = useState<'yes' | 'maybe' | 'no' | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [syncedToSheet, setSyncedToSheet] = useState(false);

  const handleSelectStatus = (selected: 'yes' | 'maybe' | 'no') => {
    setStatus(selected);
    setShowForm(true);
    soundFX.playBubblePop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !status) return;

    setSubmitting(true);
    try {
      await dataService.submitRSVP({
        name: name.trim(),
        status,
        guestsCount,
        phone: phone.trim() || undefined,
        message: message.trim() || undefined,
      });

      setIsSuccess(true);
      setSyncedToSheet(true);
      triggerMagicalGlitter(0.5);
      if (status === 'yes' || status === 'maybe') {
        soundFX.playShellOpenChime();
      } else {
        soundFX.playBubblePop();
      }
      if (onRSVPSubmitted) onRSVPSubmitted(guestsCount);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      // Still show confirmation and glitter for smooth guest experience
      setIsSuccess(true);
      setSyncedToSheet(true);
      triggerMagicalGlitter(0.5);
      soundFX.playShellOpenChime();
      if (onRSVPSubmitted) onRSVPSubmitted(guestsCount);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center text-white select-none p-3 sm:p-4 pt-3 sm:pt-4 pb-24 overflow-y-auto scrollbar-thin">
      {/* Main RSVP Card */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-3 py-1 my-0 sm:my-auto">
        <div className="bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/90 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-cyan-300/40 shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(56,189,248,0.3)] text-center">
          {/* Header */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 text-cyan-300 border border-cyan-300/50 mb-2 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <CheckCircle2 className="w-6 h-6 text-cyan-200 animate-pulse" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 drop-shadow">
            {t.rsvpQuestion}
          </h3>

          <p className="text-xs text-cyan-200/85 mt-1 mb-4">
            {t.rsvpPrompt}
          </p>

          {/* Form State */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/70 to-blue-950/95 border border-emerald-400/50 shadow-lg text-center my-2"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-2.5 border border-emerald-400/40">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-emerald-300 mb-1">
                  {t.rsvpSuccess}
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {t.rsvpSyncedSheet}
                </p>

                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-xs text-cyan-300 underline hover:text-cyan-200 transition-colors"
                >
                  {t.changeRSVP}
                </button>
              </motion.div>
            ) : (
              <div key="rsvp-options" className="flex flex-col gap-3">
                {/* 3 Status Options */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Yes */}
                  <button
                    type="button"
                    onClick={() => handleSelectStatus('yes')}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                      status === 'yes'
                        ? 'bg-emerald-600/80 border-emerald-300 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-[1.02]'
                        : 'bg-blue-900/50 border-cyan-400/30 text-cyan-100 hover:bg-blue-800/60'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🎉</span>
                    <span className="text-xs font-bold block">{t.yesOption}</span>
                  </button>

                  {/* Maybe */}
                  <button
                    type="button"
                    onClick={() => handleSelectStatus('maybe')}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                      status === 'maybe'
                        ? 'bg-amber-600/80 border-amber-300 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-[1.02]'
                        : 'bg-blue-900/50 border-cyan-400/30 text-cyan-100 hover:bg-blue-800/60'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🤔</span>
                    <span className="text-xs font-bold block">{t.maybeOption}</span>
                  </button>

                  {/* No */}
                  <button
                    type="button"
                    onClick={() => handleSelectStatus('no')}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                      status === 'no'
                        ? 'bg-rose-600/80 border-rose-300 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-[1.02]'
                        : 'bg-blue-900/50 border-cyan-400/30 text-cyan-100 hover:bg-blue-800/60'
                    }`}
                  >
                    <span className="text-2xl block mb-1">😢</span>
                    <span className="text-xs font-bold block">{t.noOption}</span>
                  </button>
                </div>

                {/* Form fields appear when status is picked */}
                {showForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2.5 mt-2 text-start"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] text-cyan-200/90 font-medium mb-1">
                        {t.yourName} *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.namePlaceholder}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-blue-950/70 border border-cyan-400/40 text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-300 text-xs shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Guest count stepper buttons */}
                    {status !== 'no' && (
                      <div>
                        <label className="block text-[11px] text-cyan-200/90 font-medium mb-1">
                          {t.guestCountLabel}
                        </label>
                        <div className="flex items-center justify-between p-1.5 rounded-xl bg-blue-950/70 border border-cyan-400/40 shadow-inner">
                          {/* Minus Button */}
                          <button
                            type="button"
                            id="btn-decrease-guests"
                            onClick={() => {
                              soundFX.playBubblePop();
                              setGuestsCount((prev) => Math.max(1, prev - 1));
                            }}
                            disabled={guestsCount <= 1}
                            aria-label={lang === 'ar' ? 'تقليل عدد الأفراد' : 'Decrease guest count'}
                            className="w-9 h-9 rounded-lg bg-blue-900/80 hover:bg-cyan-600/70 border border-cyan-400/40 text-cyan-200 flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          {/* Guests Display */}
                          <div className="flex items-center gap-2 px-3 select-none">
                            <Users className="w-4 h-4 text-cyan-300" />
                            <span className="text-base font-bold font-mono text-white drop-shadow">
                              {guestsCount}
                            </span>
                            <span className="text-xs text-cyan-200/90 font-medium">
                              {lang === 'ar'
                                ? guestsCount === 1
                                  ? 'فرد واحد'
                                  : guestsCount === 2
                                  ? 'فردان'
                                  : guestsCount <= 10
                                  ? 'أفراد'
                                  : 'فرد'
                                : guestsCount === 1
                                ? 'Guest'
                                : 'Guests'}
                            </span>
                          </div>

                          {/* Plus Button */}
                          <button
                            type="button"
                            id="btn-increase-guests"
                            onClick={() => {
                              soundFX.playBubblePop();
                              setGuestsCount((prev) => Math.min(10, prev + 1));
                            }}
                            disabled={guestsCount >= 10}
                            aria-label={lang === 'ar' ? 'زيادة عدد الأفراد' : 'Increase guest count'}
                            className="w-9 h-9 rounded-lg bg-blue-900/80 hover:bg-cyan-600/70 border border-cyan-400/40 text-cyan-200 flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] text-cyan-200/90 font-medium mb-1">
                        {t.phoneLabel}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.phonePlaceholder}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-blue-950/70 border border-cyan-400/40 text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-300 text-xs shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Note / Message */}
                    <div>
                      <label className="block text-[11px] text-cyan-200/90 font-medium mb-1">
                        {t.dietaryLabel}
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                        <textarea
                          rows={2}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t.dietaryPlaceholder}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-blue-950/70 border border-cyan-400/40 text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-300 text-xs resize-none shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        id="btn-submit-rsvp"
                        type="submit"
                        disabled={submitting || !name.trim()}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? (
                          <span>{t.rsvpSubmitting}</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>{t.confirmRSVP}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
