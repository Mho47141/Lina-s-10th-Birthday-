import { Language } from './types';

export const translations = {
  en: {
    appName: "Lina's 10th Birthday",
    appSubtitle: "Underwater Adventure Invitation",
    
    // Cover & Reveal
    tapToOpen: "Tap to open",
    welcomeTitle: "Welcome to my underwater world",
    scrollDown: "Scroll to explore",
    nextScreen: "Next",
    prevScreen: "Previous",

    // Hero
    birthdayTitle: "Lina's",
    birthdaySubtitle: "10th Birthday",
    heroDescription: "Dive into a day full of fun, friends and ocean vibes!",

    // Details Card
    detailsHeader: "Birthday Details",
    dateLabel: "Friday, 25 September 2026",
    timeLabel: "5:00 PM – 9:00 PM",
    locationTitle: "Stone Residence Compound",
    locationAddress: "Unit 273, Ground Floor",
    activitiesLabel: "Food, games, magic & lots of underwater fun!",
    dressCode: "Underwater / Pastel / Mermaid vibes welcome!",

    // Countdown
    countdownTitle: "Countdown to the Party",
    countdownSubtitle: "Days until the underwater celebration begins!",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    partyToday: "The magical celebration is happening today! 🧜‍♀️✨",
    addToCalendar: "Add to Calendar",
    calendarSuccess: "Calendar event generated!",

    // Location & Map
    partyLocation: "Party Location & Map",
    openGoogleMaps: "Google Maps",
    openAppleMaps: "Apple Maps",
    copyAddress: "Copy Address",
    addressCopied: "Address copied to clipboard!",
    getDirections: "Get Directions",

    // RSVP
    rsvpQuestion: "Will you join Lina's underwater adventure?",
    rsvpPrompt: "Please RSVP by September 15th, 2026",
    yesOption: "Yes! I'll be there!",
    maybeOption: "Maybe",
    noOption: "Sorry, can't make it",
    yourName: "Your Name / Family Name",
    namePlaceholder: "e.g. Sarah Jenkins",
    guestCountLabel: "Number of Attendees (including kids)",
    phoneLabel: "WhatsApp / Phone (optional)",
    phonePlaceholder: "+1 234 567 890",
    dietaryLabel: "Dietary restrictions / Note (optional)",
    dietaryPlaceholder: "e.g. Vegetarian, excited to celebrate!",
    confirmRSVP: "Confirm Attendance",
    rsvpSubmitting: "Saving your RSVP...",
    rsvpSuccess: "Thank you! Your RSVP has been confirmed!",
    rsvpSyncedSheet: "✓ Stored & synced to Google Sheets",
    changeRSVP: "Update your response",

    // Wishes Guestbook
    wishesTitle: "Birthday Wishes Wall",
    wishesSubtitle: "Leave a warm congratulatory message for Lina! Stored in the guestbook & Google Sheets.",
    leaveWish: "Write a Birthday Wish",
    yourWishPlaceholder: "Write your sweet birthday wish for Lina here... 🧜‍♀️✨",
    chooseAvatar: "Pick your sea avatar:",
    sendWish: "Send Wish",
    wishesSending: "Sending your wish...",
    wishSentSuccess: "Your wish has been posted to Lina's wall!",
    noWishesYet: "Be the first to wish Lina a happy birthday!",
    likeWish: "Cheer",

    // Thank You
    thankYouTitle: "Thank You!",
    thankYouSubtitle: "I can't wait to celebrate with you!",

    // Sharing & Actions
    shareWhatsApp: "Share on WhatsApp",
    copyInviteLink: "Copy Link",
    linkCopied: "Invitation link copied to clipboard!",
    showQRCode: "Show QR Code",
    scanQRInfo: "Scan to open this invitation on mobile",
    audioOn: "Ocean Melody: ON",
    audioOff: "Ocean Melody: OFF",

    // Host & Google Sheet Settings
    hostSettings: "Host & Google Sheets",
    hostSettingsTitle: "Party Organizer & Google Sheets Sync",
    googleSheetsSetup: "Google Sheets Connection",
    googleSheetsDesc: "Connect your Google Sheet via Google Apps Script Webhook so every RSVP and Wish is automatically saved to your spreadsheet in real time.",
    sheetUrlLabel: "Google Apps Script Webhook URL",
    sheetUrlPlaceholder: "https://script.google.com/macros/s/.../exec",
    testConnection: "Test Webhook",
    saveSettings: "Save Settings",
    testing: "Testing...",
    viewRSVPStats: "Live RSVP Summary",
    totalResponses: "Total Responses",
    attendingGuests: "Attending",
    maybeGuests: "Maybe",
    declinedGuests: "Can't Make It",
    downloadRSVPsCSV: "Download RSVPs (CSV for Sheets)",
    downloadWishesCSV: "Download Wishes (CSV)",
    viewStepByStepGuide: "How to set up Google Apps Script (30 seconds):",
    guideStep1: "1. Open your Google Sheet, click Extensions > Apps Script.",
    guideStep2: "2. Paste the provided 10-line script from below.",
    guideStep3: "3. Click Deploy > New deployment > Web app (Execute as: Me, Access: Anyone).",
    guideStep4: "4. Paste the Web app URL here and click Save!",
    copyAppsScriptCode: "Copy Google Apps Script Code",
    codeCopied: "Apps Script code copied!",

    // View mode
    storyMode: "Story Cards",
    scrollMode: "Full Invitation",
  },

  ar: {
    appName: "عيد ميلاد لينا العاشر",
    appSubtitle: "دعوة مغامرة أعماق البحار",

    // Cover & Reveal
    tapToOpen: "اضغط للفتح",
    welcomeTitle: "مرحباً بكم في عالمي تحت الماء",
    scrollDown: "مرر للأسفل للاستكشاف",
    nextScreen: "التالي",
    prevScreen: "السابق",

    // Hero
    birthdayTitle: "عيد ميلاد",
    birthdaySubtitle: "لينا العاشر",
    heroDescription: "انغمسوا في يوم مليء بالمرح، والأصدقاء، وأجواء المحيط الساحرة!",

    // Details Card
    detailsHeader: "تفاصيل الحفلة",
    dateLabel: "الجمعة، 25 سبتمبر 2026",
    timeLabel: "5:00 مساءً – 9:00 مساءً",
    locationTitle: "كمبوند ستون ريزيدنس (Stone Residence)",
    locationAddress: "الوحدة 273، الدور الأرضي",
    activitiesLabel: "طعام شهي، ألعاب مائية، سحر، والكثير من المرح تحت البحر!",
    dressCode: "نرحب بأزياء حورية البحر والألوان المائية الباستيل!",

    // Countdown
    countdownTitle: "العد التنازلي للحفلة",
    countdownSubtitle: "أيام تفصلنا عن انطلاق الاحتفال المائي الرائع!",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    partyToday: "الاحتفال السحري يقام اليوم! 🧜‍♀️✨",
    addToCalendar: "إضافة للتقويم",
    calendarSuccess: "تم إنشاء حدث التقويم بنجاح!",

    // Location & Map
    partyLocation: "موقع الحفلة والخريطة",
    openGoogleMaps: "خرائط جوجل",
    openAppleMaps: "خرائط آبل",
    copyAddress: "نسخ العنوان",
    addressCopied: "تم نسخ العنوان إلى الحافظة!",
    getDirections: "الحصول على الاتجاهات",

    // RSVP
    rsvpQuestion: "هل ستنضم إلى مغامرة لينا تحت الماء؟",
    rsvpPrompt: "يرجى تأكيد الحضور قبل 15 سبتمبر 2026",
    yesOption: "نعم! سأحضر بالتأكيد!",
    maybeOption: "ربما",
    noOption: "للأسف، لا أستطيع الحضور",
    yourName: "الاسم / اسم العائلة",
    namePlaceholder: "مثال: سارة أحمد",
    guestCountLabel: "عدد الحاضرين (شاملاً الأطفال)",
    phoneLabel: "رقم الواتساب / الهاتف (اختياري)",
    phonePlaceholder: "+966 50 123 4567",
    dietaryLabel: "ملاحظات غذائية أو تهنئة خاصة (اختياري)",
    dietaryPlaceholder: "مثال: متحمسون جداً لحضور الحفلة!",
    confirmRSVP: "تأكيد الحضور",
    rsvpSubmitting: "جاري حفظ تأكيد الحضور...",
    rsvpSuccess: "شكراً لك! تم تسجيل حضورك بنجاح!",
    rsvpSyncedSheet: "✓ تم الحفظ والمزامنة مع جوجل شيت",
    changeRSVP: "تعديل الرد",

    // Wishes Guestbook
    wishesTitle: "حائط تهاني عيد الميلاد",
    wishesSubtitle: "اكتب رسالة تهنئة لطيفة لـ لينا! تُحفظ في سجل الذكريات وفي جوجل شيت.",
    leaveWish: "أكتب تهنئة للينا",
    yourWishPlaceholder: "اكتب رسالتك الجميلة لـ لينا هنا... 🧜‍♀️✨",
    chooseAvatar: "اختر شخصيتك البحرية:",
    sendWish: "إرسال التهنئة",
    wishesSending: "جاري إرسال التهنئة...",
    wishSentSuccess: "تم نشر تهنئتك بنجاح على الحائط!",
    noWishesYet: "كن أول من يهنئ لينا بعيد ميلادها!",
    likeWish: "إعجاب",

    // Thank You
    thankYouTitle: "شكراً لكم!",
    thankYouSubtitle: "لا أستطيع الانتظار للاحتفال معكم! 💙",

    // Sharing & Actions
    shareWhatsApp: "مشاركة عبر واتساب",
    copyInviteLink: "نسخ الرابط",
    linkCopied: "تم نسخ رابط الدعوة بنجاح!",
    showQRCode: "عرض رمز QR",
    scanQRInfo: "امسح الرمز لفتح الدعوة على الجوال",
    audioOn: "ألحان المحيط: مفعلة",
    audioOff: "ألحان المحيط: صامتة",

    // Host & Google Sheet Settings
    hostSettings: "لوحة المنظم وجوجل شيت",
    hostSettingsTitle: "إعدادات الحفلة ومزامنة جوجل شيت",
    googleSheetsSetup: "ربط جوجل شيت (Google Sheets)",
    googleSheetsDesc: "اربط جدول جوجل شيت عبر رابط ويب هوك Google Apps Script ليتم حفظ كل تأكيد حضور وكل تهنئة تلقائياً في شيت إكسل الخاص بك في الوقت الفعلي.",
    sheetUrlLabel: "رابط ويب هوك جوجل شيت (Apps Script URL)",
    sheetUrlPlaceholder: "https://script.google.com/macros/s/.../exec",
    testConnection: "اختبار الاتصال",
    saveSettings: "حفظ الإعدادات",
    testing: "جاري الاختبار...",
    viewRSVPStats: "إحصائيات الحضور المباشرة",
    totalResponses: "إجمالي الردود",
    attendingGuests: "حاضرون",
    maybeGuests: "ربما",
    declinedGuests: "معتذرون",
    downloadRSVPsCSV: "تحميل الحضور (ملف CSV لجوجل شيت)",
    downloadWishesCSV: "تحميل التهاني (ملف CSV)",
    viewStepByStepGuide: "طريقة الربط السريعة مع جوجل شيت (خلال 30 ثانية):",
    guideStep1: "1. افتح جدول Google Sheet جديد واضغط على الإضافات (Extensions) > Apps Script.",
    guideStep2: "2. الصق الكود الجاهز المكون من 10 أسطر بالأسفل.",
    guideStep3: "3. اضغط Deploy > New deployment > Web app (اختر Anyone للوصول).",
    guideStep4: "4. انسخ الرابط والصقه هنا واضغط حفظ!",
    copyAppsScriptCode: "نسخ كود Apps Script الجاهز",
    codeCopied: "تم نسخ كود جوجل شيت!",

    // View mode
    storyMode: "بطاقات قصة",
    scrollMode: "الدعوة الكاملة",
  },
};

export const sampleAppsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Type", "Timestamp", "Name/Author", "Status/Details", "Guests Count", "Phone", "Message/Note"]);
    }
    
    if (data.type === "RSVP") {
      sheet.appendRow([
        "RSVP",
        data.timestamp || new Date().toISOString(),
        data.name || "",
        data.status || "",
        data.guestsCount || 1,
        data.phone || "",
        data.message || ""
      ]);
    } else if (data.type === "BIRTHDAY_WISH") {
      sheet.appendRow([
        "WISH",
        data.timestamp || new Date().toISOString(),
        data.author || "",
        data.avatar || "🧜‍♀️",
        "-",
        "-",
        data.message || ""
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
