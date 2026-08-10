export const siteConfig = {
  name: "Viby",
  title: "כרטיסי Apple Wallet ו-Google Wallet לעסקים | Viby",
  description:
    "Viby מחזירה לקוחות עם כרטיסי Apple Wallet ו-Google Wallet, כרטיסיות דיגיטליות, משחקי פרס ומועדון לקוחות ללא הורדת אפליקציה.",
  url: getSiteUrl(),
  locale: "he_IL",
  language: "he-IL",
  availableLanguage: "he",
  ogImage: "/og.jpg",
  logo: "/viby-logo-white.png",
  address: {
    locality: "הרצליה",
    country: "ישראל",
  },
  areaServed: "ישראל",
  whatsappNumber: "972509565137",
  whatsappDisplay: "050-956-5137",
  instagramUrl: "https://www.instagram.com/viby.il/",
  businessEntranceUrl: "https://myviby.co.il/login",
  launchPrice: "49",
  regularPrice: "49",
  keywords: [
    "מערכת לשימור לקוחות",
    "מערכת לשימור לקוחות לעסקים",
    "משחקי נאמנות",
    "כרטיס ניקובים דיגיטלי",
    "כרטיסיות דיגיטליות",
    "Apple Wallet לעסקים",
    "Google Wallet לעסקים",
    "ארנק דיגיטלי לעסקים",
    "מועדון לקוחות ללא אפליקציה",
    "גלגל מזל לעסקים",
    "כרטיסי גירוד לעסקים",
    "מועדון לקוחות",
    "מועדון לקוחות דיגיטלי",
    "נאמנות לקוחות",
    "שימור לקוחות",
    "פרסום לעסקים קטנים",
    "פרסום לעסק מקומי",
    "משחקי פרס לעסקים",
    "קידום עסקים קטנים",
    "תשלום לפי שימוש לעסקים",
    "חבילות משחקים לעסקים",
    "קרדיטים למשחקי פרס",
    "קפה",
    "עגלת קפה",
    "בר יין",
    "פיצריה",
    "מכון יופי",
    "גלידריה",
    "מספרה",
    "Viby",
  ],
};

function getSiteUrl() {
  const canonicalUrl = "https://joinviby.co.il";
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (
    process.env.VERCEL_ENV === "production" &&
    normalizeUrl(explicitUrl ?? "") !== canonicalUrl
  ) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be ${canonicalUrl} for production builds.`,
    );
  }

  return canonicalUrl;
}

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}
