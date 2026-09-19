export type Language = 'en' | 'ar';

export interface RSVPItem {
  id: string;
  name: string;
  status: 'yes' | 'maybe' | 'no';
  guestsCount: number;
  phone?: string;
  message?: string;
  createdAt: string;
}

export interface WishItem {
  id: string;
  author: string;
  message: string;
  avatar: string;
  likes: number;
  createdAt: string;
}

export interface AppSettings {
  partyDate: string;
  birthdayGirl: string;
  age: number;
  locationName: string;
  address: string;
  mapLat: number;
  mapLng: number;
  googleSheetWebhookUrl: string;
  isGoogleSheetConfigured?: boolean;
}

export interface RSVPStats {
  totalResponses: number;
  attendingGuests: number;
  maybeGuests: number;
  declinedResponses: number;
}
