import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Set first-publication dates to the actual live dates if release is later than planned.
// Keep the Black Friday first-publication date unchanged in future annual updates.
const retentionFirstPublished = "2026-11-18";
const blackFridayFirstPublished = "2026-11-18";
// Update this alongside the Black Friday year-specific copy and metadata after a substantive refresh.
const blackFridayContentModified = "2026-11-18";

export const editorialArticles = {
  retention: {
    path: "/why-customers-dont-return",
    title: "למה לקוחות לא חוזרים לעסק? איך מחזירים אותם | וייבי Viby",
    heading: "למה הלקוח ההוא לא חזר? מדריך לעסקים קטנים ובינוניים",
    description: "למה לקוחות לא חוזרים לעסק? מדריך מעשי לעסקים קטנים ובינוניים על ביקורים חוזרים, כרטיסיות דיגיטליות וקשר אישי עם לקוחות.",
    subtitle: "מדריך לבעלי עסקים שמעדיפים לקוחות קבועים על עוד מודעה.",
    byline: "וייבי",
    publishedDate: retentionFirstPublished,
    modifiedDate: retentionFirstPublished,
    socialImage: "/editorial/why-customers-dont-return-social.webp",
    schemaImage: `${siteConfig.url}/editorial/why-customers-dont-return-hero.webp`,
  },
  blackFriday: {
    path: "/black-friday-small-business",
    title: "בלאק פריידי 2026 לעסקים: 5 רעיונות ללקוחות חוזרים | וייבי Viby",
    heading: "בלאק פריידי 2026 לעסקים קטנים ובינוניים: איך הופכים מבצע ללקוחות שחוזרים?",
    description: "חמישה רעיונות לבלאק פריידי 2026 לעסקים קטנים ובינוניים: הצעות משתלמות, הצטרפות למועדון לקוחות ומדידת ביקורים חוזרים.",
    subtitle: "חמישה רעיונות לבעלי עסקים שרוצים להרוויח מהמבצע גם אחרי שההנחות נגמרות.",
    byline: "וייבי",
    publishedDate: blackFridayFirstPublished,
    modifiedDate: blackFridayContentModified,
    schemaImage: `${siteConfig.url}/editorial/black-friday-small-business-hero.webp`,
    socialImage: "/editorial/black-friday-small-business-social.webp",
  },
} as const;

export type EditorialArticle = (typeof editorialArticles)[keyof typeof editorialArticles];

export function editorialMetadata(article: EditorialArticle): Metadata {
  const metadata = createPageMetadata({
    path: article.path,
    title: article.heading,
    metadataTitle: article.title,
    description: article.description,
  }, article.socialImage);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
    },
  };
}

export function editorialStructuredData(article: EditorialArticle) {
  const url = `${siteConfig.url}${article.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: article.heading,
    description: article.description,
    inLanguage: siteConfig.language,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    ...(article.schemaImage ? { image: article.schemaImage } : {}),
    mainEntityOfPage: url,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    author: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}
