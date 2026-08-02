import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/content/site";

/**
 * Generated from the `ROUTES` map, so a new page is listed automatically and
 * the sitemap can never drift from what the navigation actually links to.
 *
 * Priorities reflect commercial value rather than depth: `/contact` is where
 * conversions happen and `/services` is the strongest commercial-intent
 * landing page, so both outrank the deeper informational routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const priorities: Record<string, number> = {
    [ROUTES.home]: 1,
    [ROUTES.services]: 0.9,
    [ROUTES.contact]: 0.9,
    [ROUTES.industries]: 0.8,
    [ROUTES.about]: 0.7,
    [ROUTES.process]: 0.7,
    [ROUTES.results]: 0.7,
    [ROUTES.faq]: 0.6,
  };

  return Object.values(ROUTES).map((path) => ({
    url: path === ROUTES.home ? SITE.url : `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: priorities[path] ?? 0.6,
  }));
}
