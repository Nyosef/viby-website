import type { Metadata } from "next";
import type { ServiceId } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export type ProductSeo = {
  serviceId: ServiceId;
  path: "/" | `/${string}`;
  title: string;
  internalLinkLabel: string;
  description: string;
  primaryIntent: string;
  supportingIntents: readonly string[];
  schemaId: string;
  lastModified: string;
};

export const productSeoByService = {
  "punch-card": {
    serviceId: "punch-card",
    path: "/",
    title: "כרטיסייה דיגיטלית לעסק",
    internalLinkLabel: "כרטיסייה דיגיטלית לעסק",
    description:
      "כרטיסייה דיגיטלית לעסק שמחליפה כרטיס ניקוב מנייר, נשמרת ב־Apple Wallet או Google Wallet ועוזרת להחזיר לקוחות — בלי אפליקציה.",
    primaryIntent: "כרטיסייה דיגיטלית לעסק",
    supportingIntents: [
      "כרטיס ניקוב דיגיטלי",
      "כרטיסיית נאמנות דיגיטלית",
      "כרטיסיית נייר",
    ],
    schemaId: "digital-punch-card",
    lastModified: "2026-08-16",
  },
  "smart-wheel": {
    serviceId: "smart-wheel",
    path: "/smart-wheel",
    title: "גלגל מזל דיגיטלי לעסקים",
    internalLinkLabel: "גלגל מזל דיגיטלי לעסקים",
    description:
      "גלגל מזל דיגיטלי לעסקים שמופעל בסריקת QR, מעניק פרסים שהעסק מגדיר והופך כל קנייה לסיבה לחזור בביקור הבא.",
    primaryIntent: "גלגל מזל דיגיטלי לעסקים",
    supportingIntents: [
      "משחק פרסים לעסק",
      "משחק שיווקי לעסק",
      "גלגל חכם",
      "QR",
    ],
    schemaId: "smart-wheel",
    lastModified: "2026-08-16",
  },
  wallet: {
    serviceId: "wallet",
    path: "/digital-wallet",
    title: "כרטיס מתנה דיגיטלי לעסק",
    internalLinkLabel: "כרטיס מתנה דיגיטלי לעסק",
    description:
      "מערכת כרטיסי מתנה דיגיטליים לעסק: מוכרים מתנה או יתרה עם בונוס, ושומרים את הכרטיס ב־Apple Wallet או Google Wallet — בלי אפליקציה.",
    primaryIntent: "כרטיס מתנה דיגיטלי לעסק",
    supportingIntents: [
      "מערכת כרטיסי מתנה לעסק",
      "יתרה עם בונוס",
      "Apple Wallet",
      "Google Wallet",
    ],
    schemaId: "digital-wallet",
    lastModified: "2026-08-16",
  },
  "viby-rate": {
    serviceId: "viby-rate",
    path: "/viby-rate",
    title: "כרטיס NFC לביקורות גוגל לעסק",
    internalLinkLabel: "כרטיס NFC לביקורות גוגל",
    description:
      "כרטיס NFC לביקורות גוגל שמוביל לקוחות ישירות לעמוד הדירוג של העסק ומקצר את הדרך לביקורת אמיתית — בלי חיפוש ובלי הקלדה.",
    primaryIntent: "כרטיס NFC לביקורות גוגל",
    supportingIntents: [
      "שלט NFC לביקורות גוגל",
      "כרטיס ביקורות גוגל לעסק",
      "Google Reviews",
    ],
    schemaId: "viby-rate",
    lastModified: "2026-08-16",
  },
  "viby-tap": {
    serviceId: "viby-tap",
    path: "/viby-tap",
    title: "שלט NFC ועמוד קישורים לעסק",
    internalLinkLabel: "שלט NFC ועמוד קישורים לעסק",
    description:
      "שלט NFC לעסק עם QR שפותח עמוד קישורים ממותג לביקורות גוגל, Instagram, WhatsApp, Waze ואתר העסק — בעמוד אחד שניתן לעדכן.",
    primaryIntent: "שלט NFC לעסק",
    supportingIntents: [
      "עמוד קישורים לעסק",
      "מדבקת NFC לעסק",
      "QR לעסק",
    ],
    schemaId: "viby-tap",
    lastModified: "2026-08-16",
  },
} as const satisfies Record<ServiceId, ProductSeo>;

export const productSeoEntries = Object.values(productSeoByService);

export const productSeoByPath: ReadonlyMap<string, ProductSeo> = new Map(
  productSeoEntries.map((entry) => [entry.path, entry]),
);

export function getProductPath(serviceId: ServiceId) {
  return productSeoByService[serviceId].path;
}

export function createPageMetadata(
  seo: Pick<ProductSeo, "path" | "title" | "description">,
  image = siteConfig.ogImage,
): Metadata {
  const brandedTitle = `${seo.title} | ${siteConfig.name}`;

  return {
    title: { absolute: brandedTitle },
    description: seo.description,
    alternates: {
      canonical: seo.path,
      languages: { "he-IL": seo.path },
    },
    openGraph: {
      type: "website",
      url: seo.path,
      siteName: siteConfig.name,
      title: brandedTitle,
      description: seo.description,
      locale: siteConfig.locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${seo.title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: seo.description,
      images: [{ url: image, alt: `${seo.title} — ${siteConfig.name}` }],
    },
  };
}
