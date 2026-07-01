export const siteConfig = {
  name: "Viby",
  title: "Viby | מועדון לקוחות דיגיטלי לעסקים",
  description:
    "Viby עוזרת לעסקים לבנות מועדון לקוחות דיגיטלי, להחזיר לקוחות ולמדוד נאמנות בזמן אמת.",
  url: getSiteUrl(),
  locale: "he_IL",
  language: "he",
  ogImage: "/viby_transparent.png",
  keywords: [
    "מועדון לקוחות",
    "מועדון לקוחות דיגיטלי",
    "כרטיס ניקובים דיגיטלי",
    "נאמנות לקוחות",
    "שימור לקוחות",
    "הטבות לעסקים",
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
