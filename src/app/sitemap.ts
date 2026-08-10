import type { MetadataRoute } from "next";
import { productSeoEntries } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages: MetadataRoute.Sitemap = productSeoEntries.map(
    (entry) => ({
      url: `${siteConfig.url}${entry.path === "/" ? "" : entry.path}`,
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
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/terms`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
