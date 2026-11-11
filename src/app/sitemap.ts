import type { MetadataRoute } from "next";
import { productSeoEntries } from "@/lib/seo";
import { legalDocuments } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";
import { blackFridayPath } from "@/lib/black-friday";

// Replace with R1's actual production publication date if it ships after this content date.
const r1LastModified = "2026-11-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages: MetadataRoute.Sitemap = productSeoEntries.map(
    (entry) => ({
      url: `${siteConfig.url}${entry.path === "/" ? "" : entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: "monthly",
      priority: entry.path === "/" ? 1 : 0.9,
      alternates: {
        languages: {
          "he-IL": `${siteConfig.url}${entry.path === "/" ? "" : entry.path}`,
        },
      },
    }),
  );

  return [
    ...productPages,
    {
      url: `${siteConfig.url}${blackFridayPath}`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/customer-retention`,
      lastModified: "2026-10-20",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...[
      "/business-faq",
      "/business-faq/free-digital-punch-card",
      "/business-faq/printable-vs-digital-punch-card",
    ].map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: r1LastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/business-faq" ? 0.7 : 0.65,
    })),
    {
      url: `${siteConfig.url}/industries/cafes`,
      lastModified: "2026-10-26",
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: { languages: {
        "he-IL": `${siteConfig.url}/industries/cafes`,
        en: `${siteConfig.url}/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026`,
      } },
    },
    {
      url: `${siteConfig.url}/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026`,
      lastModified: "2026-10-26",
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: {
        "he-IL": `${siteConfig.url}/industries/cafes`,
        en: `${siteConfig.url}/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026`,
      } },
    },
    {
      url: `${siteConfig.url}/industries/car-washes`,
      lastModified: "2026-10-30",
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/industries/bakeries`,
      lastModified: "2026-10-30",
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/industries/hair-salons`,
      lastModified: "2026-10-30",
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: "2026-10-20",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/support`,
      lastModified: "2026-10-26",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      lastModified: r1LastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: legalDocuments.terms.effectiveDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: legalDocuments.privacy.effectiveDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
