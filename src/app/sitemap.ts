import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Single-page site today, so the sitemap has one entry. It exists anyway
 * because it is the canonical signal Search Console reads, and because adding
 * `/services/*` and `/industries/*` later is then a one-line change here
 * rather than a new integration.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
