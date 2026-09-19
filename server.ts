import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const RSVPS_FILE = path.join(DATA_DIR, "rsvps.json");
const WISHES_FILE = path.join(DATA_DIR, "wishes.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

interface RSVPItem {
  id: string;
  name: string;
  status: "yes" | "maybe" | "no";
  guestsCount: number;
  phone?: string;
  message?: string;
  createdAt: string;
}

interface WishItem {
  id: string;
  author: string;
  message: string;
  avatar: string;
  likes: number;
  createdAt: string;
}

interface AppSettings {
  partyDate: string; // ISO or date string e.g. "2025-05-24T15:00:00"
  birthdayGirl: string;
  age: number;
  locationName: string;
  address: string;
  mapLat: number;
  mapLng: number;
  googleSheetWebhookUrl: string;
}

// Initial default settings
const defaultSettings: AppSettings = {
  partyDate: "2026-09-25T17:00:00",
  birthdayGirl: "Lina",
  age: 10,
  locationName: "كمبوند ستون ريزيدنس (Stone Residence)",
  address: "الوحدة 273، الدور الأرضي",
  mapLat: 30.0131,
  mapLng: 31.4289,
  googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbw2yC1kkf5sJidoBZBo-FYHgW_jaKLO1QmJ7Q-7m3OYmCwhSpFRrsApFr2OZEzDEZzL/exec",
};

// Empty defaults so deleted records are never resurrected
const defaultWishes: WishItem[] = [];
const defaultRSVPs: RSVPItem[] = [];

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`Error reading ${file}:`, e);
  }
  return fallback;
}

function writeJSON<T>(file: string, data: T): void {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error(`Error writing ${file}:`, e);
  }
}

// Forward data to Google Sheets via Webhook (Google Apps Script Web App)
async function forwardToGoogleSheets(webhookUrl: string, payload: any): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.startsWith("http")) return false;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    return response.ok;
  } catch (err) {
    console.error("Failed to forward to Google Sheets webhook:", err);
    return false;
  }
}

// --- API ROUTES ---

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// App Settings & Config
app.get("/api/settings", (req, res) => {
  const settings = readJSON<AppSettings>(SETTINGS_FILE, defaultSettings);
  // Don't hide the webhook URL completely, but indicate if configured
  res.json({
    ...settings,
    isGoogleSheetConfigured: Boolean(settings.googleSheetWebhookUrl && settings.googleSheetWebhookUrl.trim().length > 0),
  });
});

app.post("/api/settings", (req, res) => {
  const current = readJSON<AppSettings>(SETTINGS_FILE, defaultSettings);
  const updated: AppSettings = {
    ...current,
    ...req.body,
  };
  writeJSON(SETTINGS_FILE, updated);
  res.json({ success: true, settings: updated });
});

// Test Google Sheets Webhook URL
app.post("/api/test-google-sheet", async (req, res) => {
  const { webhookUrl } = req.body;
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    res.status(400).json({ error: "Invalid webhook URL" });
    return;
  }

  try {
    const testPayload = {
      type: "TEST_CONNECTION",
      message: "Test connection from Lina's Birthday App",
      timestamp: new Date().toISOString(),
    };
    const ok = await forwardToGoogleSheets(webhookUrl, testPayload);
    res.json({ success: ok, message: ok ? "Successfully connected to Google Sheet Webhook!" : "Webhook did not respond with 200 OK" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to reach Google Sheet" });
  }
});

// RSVPs
app.get("/api/rsvps", async (req, res) => {
  let rsvps = readJSON<RSVPItem[]>(RSVPS_FILE, defaultRSVPs);
  const settings = readJSON<AppSettings>(SETTINGS_FILE, defaultSettings);

  if (settings.googleSheetWebhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const sheetRes = await fetch(`${settings.googleSheetWebhookUrl}?action=rsvps`, {
        signal: controller.signal,
        redirect: "follow",
      });
      clearTimeout(timeoutId);
      if (sheetRes.ok) {
        const sheetData: any = await sheetRes.json();
        if (Array.isArray(sheetData.rsvps)) {
          const sheetRsvps: RSVPItem[] = sheetData.rsvps.map((r: any) => {
            let st: "yes" | "maybe" | "no" = "yes";
            const s = String(r.status || "").toLowerCase();
            if (s.includes("اعتذر") || s.includes("no")) st = "no";
            else if (s.includes("ربما") || s.includes("maybe")) st = "maybe";
            else st = "yes";

            return {
              id: r.id || `sheet-${r.timestamp || Math.random()}`,
              name: r.name || "Guest",
              status: st,
              guestsCount: Number(r.guestsCount) || 1,
              phone: r.phone || undefined,
              message: r.message || undefined,
              createdAt: r.timestamp || new Date().toISOString(),
            };
          });

          // Google Sheet is the master source: update local cache with exact sheet content
          rsvps = sheetRsvps;
          writeJSON(RSVPS_FILE, rsvps);
        }
      }
    } catch (err) {
      console.warn("Could not fetch RSVPs from Google Sheet, using local cache:", err);
    }
  }

  const attendingCount = rsvps.filter((r) => r.status === "yes").reduce((sum, r) => sum + (r.guestsCount || 1), 0);
  const maybeCount = rsvps.filter((r) => r.status === "maybe").reduce((sum, r) => sum + (r.guestsCount || 1), 0);
  const declinedCount = rsvps.filter((r) => r.status === "no").length;

  res.json({
    rsvps,
    stats: {
      totalResponses: rsvps.length,
      attendingGuests: attendingCount,
      maybeGuests: maybeCount,
      declinedResponses: declinedCount,
    },
  });
});

app.post("/api/rsvp", async (req, res) => {
  const { name, status, guestsCount, phone, message } = req.body;
  if (!name || !status) {
    res.status(400).json({ error: "Name and status are required" });
    return;
  }

  const rsvps = readJSON<RSVPItem[]>(RSVPS_FILE, defaultRSVPs);
  const newRSVP: RSVPItem = {
    id: `rsvp-${Date.now()}`,
    name: String(name).trim(),
    status: status === "yes" || status === "maybe" || status === "no" ? status : "yes",
    guestsCount: Number(guestsCount) || 1,
    phone: phone ? String(phone).trim() : undefined,
    message: message ? String(message).trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  rsvps.unshift(newRSVP);
  writeJSON(RSVPS_FILE, rsvps);

  // Sync to Google Sheet if webhook is configured
  const settings = readJSON<AppSettings>(SETTINGS_FILE, defaultSettings);
  let sheetSyncSuccess = false;
  if (settings.googleSheetWebhookUrl) {
    sheetSyncSuccess = await forwardToGoogleSheets(settings.googleSheetWebhookUrl, {
      type: "RSVP",
      timestamp: newRSVP.createdAt,
      name: newRSVP.name,
      status: newRSVP.status,
      guestsCount: newRSVP.guestsCount,
      phone: newRSVP.phone || "",
      message: newRSVP.message || "",
    });
  }

  res.json({
    success: true,
    rsvp: newRSVP,
    syncedToGoogleSheet: sheetSyncSuccess,
  });
});

// Birthday Wishes (Guestbook)
app.get("/api/wishes", async (req, res) => {
  const localWishes = readJSON<WishItem[]>(WISHES_FILE, defaultWishes);
  const settings = readJSON<AppSettings>(SETTINGS_FILE, defaultSettings);

  if (settings.googleSheetWebhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const sheetRes = await fetch(`${settings.googleSheetWebhookUrl}?action=wishes`, {
        signal: controller.signal,
        redirect: "follow",
      });
      clearTimeout(timeoutId);
      if (sheetRes.ok) {
        const sheetData: any = await sheetRes.json();
        if (Array.isArray(sheetData.wishes)) {
          const sheetWishes: WishItem[] = sheetData.wishes.map((w: any) => ({
            id: w.id || `sheet-${w.timestamp || Math.random()}`,
            author: w.author || "Guest",
            message: w.message || "",
            avatar: w.avatar || "🧜‍♀️",
            likes: 0,
            createdAt: w.timestamp || new Date().toISOString(),
          }));

          writeJSON(WISHES_FILE, sheetWishes);
          return res.json({ wishes: sheetWishes });
        }
      }
    } catch (err) {
      console.warn("Could not fetch wishes from Google Sheet, using local cache:", err);
    }
  }

  res.json({ wishes: localWishes });
});

app.post("/api/wishes", async (req, res) => {
  const { author, message, avatar } = req.body;
  if (!author || !message) {
    res.status(400).json({ error: "Author name and message are required" });
    return;
  }

  const wishes = readJSON<WishItem[]>(WISHES_FILE, defaultWishes);
  const newWish: WishItem = {
    id: `wish-${Date.now()}`,
    author: String(author).trim(),
    message: String(message).trim(),
    avatar: avatar || "🧜‍♀️",
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  wishes.unshift(newWish);
  writeJSON(WISHES_FILE, wishes);

  // Sync to Google Sheet if webhook is configured
  const settings = readJSON<AppSettings>(SETTINGS_FILE, defaultSettings);
  let sheetSyncSuccess = false;
  if (settings.googleSheetWebhookUrl) {
    sheetSyncSuccess = await forwardToGoogleSheets(settings.googleSheetWebhookUrl, {
      type: "BIRTHDAY_WISH",
      timestamp: newWish.createdAt,
      author: newWish.author,
      message: newWish.message,
      avatar: newWish.avatar,
    });
  }

  res.json({
    success: true,
    wish: newWish,
    syncedToGoogleSheet: sheetSyncSuccess,
  });
});

app.post("/api/wishes/:id/like", (req, res) => {
  const { id } = req.params;
  const wishes = readJSON<WishItem[]>(WISHES_FILE, defaultWishes);
  const wish = wishes.find((w) => w.id === id);
  if (wish) {
    wish.likes = (wish.likes || 0) + 1;
    writeJSON(WISHES_FILE, wishes);
    res.json({ success: true, likes: wish.likes });
  } else {
    res.status(404).json({ error: "Wish not found" });
  }
});

// CSV Export for Google Sheets import
app.get("/api/export/rsvps.csv", (req, res) => {
  const rsvps = readJSON<RSVPItem[]>(RSVPS_FILE, defaultRSVPs);
  const headers = ["ID", "Name", "Status", "Guests Count", "Phone", "Note", "Submitted At"];
  const rows = rsvps.map((r) => [
    r.id,
    `"${r.name.replace(/"/g, '""')}"`,
    r.status.toUpperCase(),
    r.guestsCount,
    `"${(r.phone || "").replace(/"/g, '""')}"`,
    `"${(r.message || "").replace(/"/g, '""')}"`,
    r.createdAt,
  ]);
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="lina_birthday_rsvps.csv"');
  res.send("\uFEFF" + csvContent); // Include UTF-8 BOM for Excel / Google Sheets
});

app.get("/api/export/wishes.csv", (req, res) => {
  const wishes = readJSON<WishItem[]>(WISHES_FILE, defaultWishes);
  const headers = ["ID", "Author", "Message", "Avatar", "Likes", "Date"];
  const rows = wishes.map((w) => [
    w.id,
    `"${w.author.replace(/"/g, '""')}"`,
    `"${w.message.replace(/"/g, '""')}"`,
    `"${w.avatar}"`,
    w.likes,
    w.createdAt,
  ]);
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="lina_birthday_wishes.csv"');
  res.send("\uFEFF" + csvContent);
});

// Vite middleware for development / Static file serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
