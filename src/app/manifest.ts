import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8fb",
    theme_color: "#ff2f83",
    dir: "rtl",
    lang: siteConfig.language,
    icons: [
      {
        src: "/viby_transparent.png",
        sizes: "1536x1024",
        type: "image/png",
      },
    ],
  };
}
