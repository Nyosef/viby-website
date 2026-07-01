export const siteConfig = {
  name: "Viby",
  title: "מערכת לשימור לקוחות לעסקים | Viby",
  description:
    "מערכת שימור לקוחות שהופכת כל ביקור לחוויה מהנה עם משחקי נאמנות, תגמולים, כרטיסיות דיגיטליות ומועדון לקוחות.",
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
  launchPrice: "149",
  regularPrice: "199",
  keywords: [
    "מערכת לשימור לקוחות",
    "מערכת לשימור לקוחות לעסקים",
    "משחקי נאמנות",
    "כרטיס ניקובים דיגיטלי",
    "כרטיסיות דיגיטליות",
    "גלגל מזל לעסקים",
    "כרטיסי גירוד לעסקים",
    "מועדון לקוחות",
    "מועדון לקוחות דיגיטלי",
    "נאמנות לקוחות",
    "שימור לקוחות",
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
