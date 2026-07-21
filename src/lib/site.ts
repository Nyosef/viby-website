export const siteConfig = {
  name: "Viby",
  title: "כרטיסי Apple Wallet ו-Google Wallet לעסקים | Viby",
  description:
    "Viby מחזירה לקוחות עם כרטיסי Apple Wallet ו-Google Wallet, כרטיסיות דיגיטליות, משחקי פרס ומועדון לקוחות ללא הורדת אפליקציה.",
  url: getSiteUrl(),
  locale: "he_IL",
  language: "he",
  ogImage: "/viby_transparent.png",
  address: {
    locality: "הרצליה",
    country: "ישראל",
  },
  areaServed: "ישראל",
  whatsappNumber: "972509565137",
  whatsappDisplay: "050-956-5137",
  instagramUrl: "https://www.instagram.com/viby.il/",
  businessEntranceUrl: "https://customer-retention-system-six.vercel.app/",
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
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelPreviewUrl = process.env.VERCEL_URL;

  if (explicitUrl) {
    return normalizeUrl(explicitUrl);
  }

  if (vercelProductionUrl) {
    return normalizeUrl(`https://${vercelProductionUrl}`);
  }

  if (vercelPreviewUrl) {
    return normalizeUrl(`https://${vercelPreviewUrl}`);
  }

  return "http://localhost:3000";
}

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}
