import { RSVPItem, WishItem } from '../types';

export const GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbw2yC1kkf5sJidoBZBo-FYHgW_jaKLO1QmJ7Q-7m3OYmCwhSpFRrsApFr2OZEzDEZzL/exec';

const LOCAL_RSVPS_KEY = 'lina_party_local_rsvps';
const LOCAL_WISHES_KEY = 'lina_party_local_wishes';

const initialSampleWishes: WishItem[] = [
  {
    id: 'sample-1',
    author: 'Auntie Noor',
    message: 'كل عام وأنتِ أحلى وأرق حورية بحر يا لينا! عقبال 100 سنة سعادة ونجاح يا رب 🧜‍♀️💖',
    avatar: '🧜‍♀️',
    likes: 5,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'sample-2',
    author: 'Maya & Family',
    message: 'Happy 10th Birthday Princess Lina! Cannot wait to swim into this magical undersea adventure with you! 🐠✨🎂',
    avatar: '🐠',
    likes: 8,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

function getStoredLocalWishes(): WishItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_WISHES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read local wishes:', e);
  }
  return [];
}

function saveLocalWish(wish: WishItem) {
  try {
    const current = getStoredLocalWishes();
    localStorage.setItem(LOCAL_WISHES_KEY, JSON.stringify([wish, ...current]));
  } catch (e) {
    console.warn('Could not save local wish:', e);
  }
}

function saveLocalRSVP(rsvp: RSVPItem) {
  try {
    const raw = localStorage.getItem(LOCAL_RSVPS_KEY);
    const list: RSVPItem[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(LOCAL_RSVPS_KEY, JSON.stringify([rsvp, ...list]));
  } catch (e) {
    console.warn('Could not save local RSVP:', e);
  }
}

// Direct Webhook sender to Google Apps Script
async function sendToGoogleSheetWebhook(payload: Record<string, any>): Promise<boolean> {
  try {
    // We send with text/plain to avoid CORS OPTIONS preflight issues in browsers
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    return res.ok;
  } catch (err) {
    console.warn('Direct fetch attempt error, trying with no-cors fallback:', err);
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (innerErr) {
      console.error('Failed to dispatch to Google Sheet webhook:', innerErr);
      return false;
    }
  }
}

export const dataService = {
  async submitRSVP(data: {
    name: string;
    status: 'yes' | 'maybe' | 'no';
    guestsCount: number;
    phone?: string;
    message?: string;
  }): Promise<{ success: boolean; rsvp: RSVPItem }> {
    const statusArabic =
      data.status === 'yes'
        ? 'حاضر بالتأكيد 🎉'
        : data.status === 'maybe'
        ? 'ربما سأحضر ✨'
        : 'اعتذر عن الحضور 🌸';

    const timestamp = new Date().toISOString();
    const newRSVP: RSVPItem = {
      id: `rsvp-${Date.now()}`,
      name: data.name,
      status: data.status,
      guestsCount: data.guestsCount,
      phone: data.phone,
      message: data.message,
      createdAt: timestamp,
    };

    // 1. Immediately store in localStorage
    saveLocalRSVP(newRSVP);

    // 2. Prepare Google Sheet payload
    const sheetPayload = {
      type: 'RSVP',
      timestamp,
      name: data.name,
      status: statusArabic,
      guestsCount: data.guestsCount,
      phone: data.phone || '',
      message: data.message || '',
    };

    // 3. Send directly to Google Sheet (works everywhere, including GitHub Pages)
    const directPromise = sendToGoogleSheetWebhook(sheetPayload);

    // 4. Try local /api/rsvp if backend server is available (e.g. in dev)
    try {
      fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    } catch {
      // Ignore if /api route does not exist (GitHub Pages)
    }

    await directPromise;

    return {
      success: true,
      rsvp: newRSVP,
    };
  },

  async getWishes(): Promise<WishItem[]> {
    const localSaved = getStoredLocalWishes();
    let sheetWishes: WishItem[] = [];

    // First try Google Sheet Webhook directly (works on GitHub Pages and everywhere)
    try {
      const res = await fetch(`${GOOGLE_SHEET_WEBHOOK_URL}?action=wishes`, {
        redirect: 'follow',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.wishes)) {
          sheetWishes = data.wishes.map((w: any) => ({
            id: w.id || `sheet-${w.timestamp || Math.random()}`,
            author: w.author || 'Guest',
            message: w.message || '',
            avatar: w.avatar || '🧜‍♀️',
            likes: 0,
            createdAt: w.timestamp || new Date().toISOString(),
          }));
        }
      }
    } catch (e) {
      // If direct Google Sheet fetch fails (e.g. offline), try local API
      try {
        const apiRes = await fetch('/api/wishes');
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (Array.isArray(apiData.wishes)) {
            sheetWishes = apiData.wishes;
          }
        }
      } catch {
        // static environment
      }
    }

    // Combine sheet wishes + local storage wishes + initial sample wishes (deduplicated)
    const allWishes: WishItem[] = [...localSaved];

    for (const sw of sheetWishes) {
      const exists = allWishes.some(
        (w) => (w.author === sw.author && w.message === sw.message) || w.id === sw.id
      );
      if (!exists) {
        allWishes.push(sw);
      }
    }

    for (const sample of initialSampleWishes) {
      const exists = allWishes.some(
        (w) => w.author === sample.author && w.message === sample.message
      );
      if (!exists) {
        allWishes.push(sample);
      }
    }

    // Sort by createdAt descending (newest first)
    return allWishes.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async submitWish(data: {
    author: string;
    message: string;
    avatar: string;
  }): Promise<{ success: boolean; wish: WishItem }> {
    const timestamp = new Date().toISOString();
    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      author: data.author,
      message: data.message,
      avatar: data.avatar || '🧜‍♀️',
      likes: 0,
      createdAt: timestamp,
    };

    // 1. Immediately store in localStorage
    saveLocalWish(newWish);

    // 2. Prepare Google Sheet payload
    const sheetPayload = {
      type: 'WISH',
      timestamp,
      author: data.author,
      message: data.message,
      avatar: data.avatar || '🧜‍♀️',
    };

    // 3. Send directly to Google Sheet (works everywhere including GitHub Pages)
    const directPromise = sendToGoogleSheetWebhook(sheetPayload);

    // 4. Try local /api/wishes if backend server is available
    try {
      fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    } catch {
      // Ignore if /api route does not exist (GitHub Pages)
    }

    await directPromise;

    return {
      success: true,
      wish: newWish,
    };
  },
};
