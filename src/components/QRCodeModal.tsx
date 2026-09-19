import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { X, QrCode } from 'lucide-react';

interface QRCodeModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ lang, isOpen, onClose }) => {
  const t = translations[lang];

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  // High-reliability QR generator API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=ffffff&color=03203c&margin=2`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xs bg-[#061d36] border border-cyan-400/40 rounded-3xl p-6 shadow-2xl text-center text-white">
        <button
          id="btn-close-qr-modal"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-cyan-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-display font-bold text-cyan-200">
          {t.showQRCode}
        </h3>
        <p className="text-xs text-cyan-300/70 mt-0.5 mb-4">
          {t.scanQRInfo}
        </p>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-2xl shadow-lg inline-block border-2 border-cyan-300/40">
          <img
            src={qrImageUrl}
            alt="Invitation QR Code"
            className="w-48 h-48 mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-cyan-200 font-medium">
          <span>🐚</span>
          <span>Lina's 10th Birthday</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};
