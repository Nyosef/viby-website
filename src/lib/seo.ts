import type { Metadata } from "next";
import type { ServiceId } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export type ProductSeo = {
  serviceId: ServiceId;
  path: "/" | `/${string}`;
  title: string;
  internalLinkLabel: string;
  description: string;
  targetIntents: readonly string[];
  schemaId: string;
};

export const productSeoByService = {
  "punch-card": {
    serviceId: "punch-card",
    path: "/",
    title: "כרטיסייה דיגיטלית לעסק",
    internalLinkLabel: "כרטיסייה דיגיטלית לעסק",
    description:
      "כרטיסיית ניקובים דיגיטלית לעסקים בישראל, שנשמרת ב־Apple Wallet או Google Wallet ועוזרת ללקוחות לחזור — בלי אפליקציה.",
    targetIntents: ["כרטיסייה דיגיטלית לעסק", "כרטיס ניקובים דיגיטלי"],
    schemaId: "digital-punch-card",
  },
  "smart-wheel": {
    serviceId: "smart-wheel",
    path: "/smart-wheel",
    title: "גלגל מזל דיגיטלי לעסקים",
    internalLinkLabel: "גלגל מזל דיגיטלי לעסקים",
    description:
      "גלגל חכם לעסקים בישראל שהופך כל קנייה למשחק, מעניק פרס שהעסק בוחר ונותן ללקוחות סיבה לחזור בביקור הבא.",
    targetIntents: ["גלגל מזל לעסקים", "משחק שיווקי לעסק"],
    schemaId: "smart-wheel",
  },
  wallet: {
    serviceId: "wallet",
    path: "/digital-wallet",
    title: "כרטיס מתנה דיגיטלי וארנק דיגיטלי לעסק",
    internalLinkLabel: "כרטיס מתנה דיגיטלי לעסק",
    description:
      "כרטיס מתנה דיגיטלי לעסקים בישראל שנשמר ב־Apple Wallet או Google Wallet ומאפשר ללקוחות לקנות, לשמור ולממש בלי אפליקציה.",
    targetIntents: ["כרטיס מתנה דיגיטלי", "ארנק דיגיטלי לעסק"],
    schemaId: "digital-wallet",
  },
  "viby-rate": {
    serviceId: "viby-rate",
    path: "/viby-rate",
    title: "כרטיס NFC לביקורות Google לעסק",
    internalLinkLabel: "כרטיס NFC לביקורות גוגל",
    description:
      "VibyRate הוא כרטיס NFC לעסקים בישראל שמוביל לקוחות ישירות לעמוד הביקורות ב־Google ומקצר את הדרך לדירוג אמיתי.",
    targetIntents: ["כרטיס NFC לביקורות Google", "ביקורות גוגל לעסק"],
    schemaId: "viby-rate",
  },
  "viby-tap": {
    serviceId: "viby-tap",
    path: "/viby-tap",
    title: "כרטיס NFC ועמוד קישורים לעסק",
    internalLinkLabel: "כרטיס NFC ועמוד קישורים לעסק",
    description:
      "VibyTap מרכז לעסקים בישראל את Instagram, WhatsApp, Waze, האתר וקישורים חשובים בעמוד אחד שנפתח באמצעות NFC או QR.",
    targetIntents: ["כרטיס NFC לעסק", "עמוד קישורים לעסק"],
    schemaId: "viby-tap",
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
