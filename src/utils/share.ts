import { Language } from '../types';

export function getWhatsAppShareUrl(lang: Language, currentUrl: string): string {
  const isAr = lang === 'ar';
  const text = isAr
    ? `🧜‍♀️✨ *دعوة خاصة لعيد ميلاد لينا العاشر!* 🌊🪸\n\n` +
      `يسعدنا دعوتكم للانضمام إلى مغامرة مائية ساحرة للاحتفال بعيد ميلاد لينا العاشر!\n\n` +
      `📅 *التاريخ:* الجمعة، 25 سبتمبر 2026\n` +
      `⏰ *الوقت:* 5:00 مساءً – 9:00 مساءً\n` +
      `📍 *المكان:* Unit 273, Stone Residence Compound, Ground Floor\n` +
      `🗺️ *خرائط جوجل:* https://maps.app.goo.gl/rvnMapek8SyPEGDh9\n` +
      `🍎 *خرائط أبل:* https://maps.apple/p/fyVjGupWUKkqIZ\n\n` +
      `💌 *تأكيد الحضور وكتابة التهاني عبر الرابط التالي:*\n` +
      `${currentUrl}\n\n` +
      `نتشرف بوجودكم معنا! 💙🐚`
    : `🧜‍♀️✨ *You're Invited to Lina's 10th Birthday!* 🌊🪸\n\n` +
      `Dive into a day full of fun, friends, and magical ocean vibes!\n\n` +
      `📅 *Date:* Friday, 25 September 2026\n` +
      `⏰ *Time:* 5:00 PM – 9:00 PM\n` +
      `📍 *Location:* Unit 273, Stone Residence Compound, Ground Floor\n` +
      `🗺️ *Google Maps:* https://maps.app.goo.gl/rvnMapek8SyPEGDh9\n` +
      `🍎 *Apple Maps:* https://maps.apple/p/fyVjGupWUKkqIZ\n\n` +
      `💌 *RSVP and leave your birthday wishes here:*\n` +
      `${currentUrl}\n\n` +
      `Can't wait to celebrate under the sea! 💙🐚`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent("Lina's 10th Birthday Underwater Adventure 🧜‍♀️✨");
  const details = encodeURIComponent(
    "Join us celebrating Lina's 10th Birthday! Time: 5:00 PM - 9:00 PM. Location: Unit 273, Stone Residence Compound, Ground Floor. Google Map: https://maps.app.goo.gl/rvnMapek8SyPEGDh9 | Apple Map: https://maps.apple/p/fyVjGupWUKkqIZ"
  );
  const location = encodeURIComponent("Unit 273, Stone Residence Compound, Ground Floor");
  // 25 September 2026, 17:00 to 21:00 (5 PM to 9 PM)
  const dates = "20260925T170000/20260925T210000";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadICalFile() {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lina's Birthday//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "SUMMARY:Lina's 10th Birthday Underwater Adventure 🧜‍♀️✨",
    "DESCRIPTION:Join us celebrating Lina's 10th Birthday! Time: 5:00 PM - 9:00 PM. Apple Map: https://maps.apple/p/fyVjGupWUKkqIZ",
    "LOCATION:Unit 273, Stone Residence Compound, Ground Floor",
    "DTSTART:20260925T170000",
    "DTEND:20260925T210000",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "linas_10th_birthday.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
