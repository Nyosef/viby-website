import type { MetadataRoute } from "next";
import { productSeoEntries } from "@/lib/seo";
import { legalDocuments } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

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
      url: `${siteConfig.url}/support`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      lastModified: "2026-10-08",
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
