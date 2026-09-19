import React, { useState, useEffect } from 'react';
import { Language, RSVPStats, AppSettings } from '../types';
import { translations, sampleAppsScriptCode } from '../translations';
import {
  X,
  Sheet,
  Copy,
  Check,
  Download,
  Users,
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface HostSettingsModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSettingsUpdated?: () => void;
}

export const HostSettingsModal: React.FC<HostSettingsModalProps> = ({
  lang,
  isOpen,
  onClose,
  onSettingsUpdated,
}) => {
  const t = translations[lang];

  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Fetch current settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setWebhookUrl(data.googleSheetWebhookUrl || '');
      })
      .catch((e) => console.error(e));

    // Fetch RSVP stats
    fetch('/api/rsvps')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch((e) => console.error(e));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!webhookUrl.trim()) return;
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/test-google-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: webhookUrl.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: lang === 'ar' ? 'تم الاتصال بنجاح مع شيت جوجل!' : 'Successfully connected to Google Sheet!',
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || (lang === 'ar' ? 'فشل الاتصال برابط الويب هوك' : 'Webhook did not respond successfully'),
        });
      }
    } catch (e: any) {
      setTestResult({
        success: false,
        message: e.message || 'Connection error',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleSheetWebhookUrl: webhookUrl.trim() }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        if (onSettingsUpdated) onSettingsUpdated();
      }
    } catch (e) {
      console.error('Error saving settings', e);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#061d36] border border-cyan-400/40 rounded-3xl p-6 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-400/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-200">
                {t.hostSettingsTitle}
              </h3>
              <p className="text-xs text-cyan-300/70">
                {t.googleSheetsSetup}
              </p>
            </div>
          </div>
          <button
            id="btn-close-host-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-cyan-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Attendance Stats */}
        {stats && (
          <div className="my-5">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.viewRSVPStats}</span>
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-blue-900/40 border border-cyan-400/20">
                <div className="text-lg font-extrabold text-white">{stats.totalResponses}</div>
                <div className="text-[10px] text-cyan-300/70">{t.totalResponses}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                <div className="text-lg font-extrabold text-emerald-300">{stats.attendingGuests}</div>
                <div className="text-[10px] text-emerald-200/70">{t.attendingGuests}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30">
                <div className="text-lg font-extrabold text-amber-300">{stats.maybeGuests}</div>
                <div className="text-[10px] text-amber-200/70">{t.maybeGuests}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/30">
                <div className="text-lg font-extrabold text-rose-300">{stats.declinedResponses}</div>
                <div className="text-[10px] text-rose-200/70">{t.declinedGuests}</div>
              </div>
            </div>
          </div>
        )}

        {/* Google Sheet Webhook Config */}
        <div className="p-4 rounded-2xl bg-blue-950/50 border border-cyan-400/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Sheet className="w-4 h-4" />
              <span>{t.googleSheetsSetup}</span>
            </span>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-[11px] text-cyan-300 underline flex items-center gap-1 hover:text-white cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showGuide ? (lang === 'ar' ? 'إخفاء الدليل' : 'Hide Guide') : (lang === 'ar' ? 'دليل الربط (30 ثانية)' : 'Setup Guide')}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            {t.googleSheetsDesc}
          </p>

          <div>
            <label className="block text-[11px] text-cyan-200 font-medium mb-1">
              {t.sheetUrlLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder={t.sheetUrlPlaceholder}
                className="flex-1 px-3 py-2 rounded-xl bg-blue-900/40 border border-cyan-400/40 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-300 font-mono"
              />
              <button
                onClick={handleTestConnection}
                disabled={testing || !webhookUrl.trim()}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-200 text-xs font-semibold border border-cyan-400/30 shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {testing ? t.testing : t.testConnection}
              </button>
            </div>
          </div>

          {testResult && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border ${
                testResult.success
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Setup Guide & Apps Script code preview */}
          {showGuide && (
            <div className="mt-3 pt-3 border-t border-cyan-400/20 space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-amber-300">
                {t.viewStepByStepGuide}
              </div>
              <div className="space-y-1 text-[11px]">
                <p>{t.guideStep1}</p>
                <p>{t.guideStep2}</p>
                <p>{t.guideStep3}</p>
                <p>{t.guideStep4}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCopyCode}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-600/70 hover:bg-cyan-500 text-white text-xs font-bold border border-cyan-300/40 cursor-pointer transition-all active:scale-95"
                >
                  {codeCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-200" />
                      <span>{t.codeCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyAppsScriptCode}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            {saveSuccess && (
              <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تم الحفظ بنجاح!' : 'Settings Saved!'}</span>
              </span>
            )}
            <button
              id="btn-save-host-settings"
              onClick={handleSaveSettings}
              disabled={saving}
              className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? '...' : t.saveSettings}
            </button>
          </div>
        </div>

        {/* CSV Exports */}
        <div className="mt-4 pt-4 border-t border-cyan-400/20 flex items-center gap-2">
          <a
            href="/api/export/rsvps.csv"
            download
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-900/50 hover:bg-blue-800 text-cyan-200 text-xs font-semibold border border-cyan-400/30 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t.downloadRSVPsCSV}</span>
          </a>

          <a
            href="/api/export/wishes.csv"
            download
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-900/50 hover:bg-blue-800 text-cyan-200 text-xs font-semibold border border-cyan-400/30 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-pink-300" />
            <span>{t.downloadWishesCSV}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
