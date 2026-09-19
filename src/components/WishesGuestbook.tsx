import React, { useState, useEffect } from 'react';
import { Language, WishItem } from '../types';
import { translations } from '../translations';
import { motion } from 'motion/react';
import { MessageCircle, Heart, Send, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import { triggerMagicalGlitter } from '../utils/glitter';
import { dataService } from '../services/dataService';

interface WishesGuestbookProps {
  lang: Language;
  onWishAdded?: () => void;
}

const AVATARS = ['🧜‍♀️', '🐬', '🐚', '⭐', '🐠', '🪸', '🌊', '🐙'];

const INITIAL_LOCAL_WISHES: WishItem[] = [
  {
    id: 'wish-1',
    author: 'سارة وأحمد',
    message: 'كل عام وأنتِ بألف خير يا أحلى لينا في العالم! عقبال 100 سنة سعادة وفرحة ونجاح يا رب 🎂💖',
    avatar: '🧜‍♀️',
    createdAt: '2026-09-18T12:00:00.000Z',
    likes: 12,
  },
  {
    id: 'wish-2',
    author: 'خالتو مريم',
    message: 'أميرتنا الصغيرة لينا، أسعد لحظاتنا لما نشوف ضحكتك منورة.. عيد ميلاد سعيد ومميز يا قمر 🌟✨',
    avatar: '⭐',
    createdAt: '2026-09-18T14:30:00.000Z',
    likes: 8,
  },
];

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({
  lang,
  onWishAdded,
}) => {
  const t = translations[lang];

  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [successToast, setSuccessToast] = useState(false);

  const fetchWishes = async () => {
    try {
      const items = await dataService.getWishes();
      if (items && items.length > 0) {
        setWishes(items);
        return;
      }
    } catch (_) {}

    // Fallback to localStorage
    try {
      const saved = localStorage.getItem('lina_guestbook_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
        return;
      }
    } catch (_) {}
    setWishes(INITIAL_LOCAL_WISHES);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await dataService.submitWish({
        author: author.trim(),
        message: message.trim(),
        avatar: selectedAvatar,
      });

      // Refresh list directly from data service
      const updated = await dataService.getWishes();
      setWishes(updated);
    } catch (err) {
      console.error('Error submitting wish:', err);
      // Fallback
      const newWish: WishItem = {
        id: `wish-${Date.now()}`,
        author: author.trim(),
        message: message.trim(),
        avatar: selectedAvatar,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      setWishes((prev) => [newWish, ...prev]);
    } finally {
      setAuthor('');
      setMessage('');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
      setSubmitting(false);

      triggerMagicalGlitter(0.6);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#f472b6', '#fbbf24', '#a855f7'],
      });
      soundFX.playBubblePop();
      if (onWishAdded) onWishAdded();
    }
  };

  const handleLike = async (wishId: string) => {
    if (likedIds[wishId]) return;

    soundFX.playBubblePop();
    setLikedIds((prev) => ({ ...prev, [wishId]: true }));
    setWishes((prev) => {
      const updated = prev.map((w) => (w.id === wishId ? { ...w, likes: (w.likes || 0) + 1 } : w));
      try {
        localStorage.setItem('lina_guestbook_wishes', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await fetch(`/api/wishes/${wishId}/like`, { method: 'POST' });
    } catch (_) {}
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start text-white select-none p-3 sm:p-4 pt-3 sm:pt-4 pb-24 overflow-y-auto scrollbar-thin">
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-3 my-0">
        {/* Header */}
        <div className="text-center pt-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 text-cyan-300 border border-cyan-300/50 mb-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <MessageCircle className="w-5 h-5 text-cyan-200 animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 drop-shadow">
            {t.wishesTitle}
          </h3>
          <p className="text-xs text-cyan-200/85 mt-0.5 max-w-xs mx-auto">
            {t.wishesSubtitle}
          </p>
        </div>

        {/* Wish Form Card - برواز كتابة الأمنية */}
        <div className="bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/90 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-cyan-300/40 shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(56,189,248,0.3)] mt-0.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-cyan-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.leaveWish}</span>
            </span>
            <span className="text-[10px] text-pink-300/90 font-medium">
              {lang === 'ar' ? 'أمنيات عيد الميلاد 🧜‍♀️' : "Birthday Wishes 🧜‍♀️"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Avatar selector */}
            <div>
              <label className="block text-[10px] text-cyan-200/80 font-medium mb-1">
                {t.chooseAvatar}
              </label>
              <div className="flex items-center justify-between gap-1.5 py-2 px-1.5 overflow-x-auto scrollbar-none">
                {AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av;
                  return (
                    <button
                      type="button"
                      key={av}
                      onClick={() => {
                        soundFX.playBubblePop();
                        setSelectedAvatar(av);
                      }}
                      className={`relative w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all duration-200 cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-cyan-500 to-teal-400 text-white ring-2 ring-cyan-300 ring-offset-2 ring-offset-blue-950 shadow-[0_0_14px_rgba(56,189,248,0.85)]'
                          : 'bg-blue-950/70 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-blue-900/70'
                      }`}
                    >
                      <span>{av}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Author Name */}
            <div>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={lang === 'ar' ? 'اسمك الكريم...' : 'Your name...'}
                className="w-full px-3 py-2 rounded-xl bg-blue-950/70 border border-cyan-400/40 text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-300 text-xs shadow-inner"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                required
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.yourWishPlaceholder}
                className="w-full px-3 py-2 rounded-xl bg-blue-950/70 border border-cyan-400/40 text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-300 text-xs resize-none shadow-inner"
              />
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-between pt-1">
              {successToast && (
                <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.wishSentSuccess}</span>
                </span>
              )}
              <button
                id="btn-submit-wish"
                type="submit"
                disabled={submitting || !author.trim() || !message.trim()}
                className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? t.wishesSending : t.sendWish}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Wishes List (scrolls together with the form) */}
        <div className="space-y-2.5">
          {wishes.length === 0 ? (
            <div className="text-center py-4 text-cyan-200/60 text-xs">
              {t.noWishesYet}
            </div>
          ) : (
            wishes.map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-2xl bg-blue-950/70 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/50 shadow-sm transition-all text-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-cyan-950/90 border border-cyan-400/40 flex items-center justify-center text-sm shadow-sm">
                      {w.avatar}
                    </div>
                    <div>
                      <h5 className="font-bold text-cyan-200 text-xs">{w.author}</h5>
                      <span className="text-[9px] text-cyan-300/60">
                        {new Date(w.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    id={`btn-like-wish-${w.id}`}
                    onClick={() => handleLike(w.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                      likedIds[w.id]
                        ? 'bg-pink-500/30 text-pink-300 border border-pink-400/40'
                        : 'bg-blue-900/40 text-cyan-300/80 hover:text-pink-300 hover:bg-pink-900/30 border border-cyan-400/20'
                    }`}
                  >
                    <Heart
                      className={`w-3 h-3 ${likedIds[w.id] ? 'fill-pink-400 text-pink-400' : ''}`}
                    />
                    <span>{w.likes || 0}</span>
                  </button>
                </div>

                <p className="text-slate-100 text-xs leading-relaxed font-normal pl-9 pr-1">
                  {w.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
