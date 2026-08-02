import type { Crumb } from "@/components/layout/PageHero";
import { SITE } from "@/content/site";

/**
 * `BreadcrumbList` structured data.
 *
 * Emitted per page and fed the SAME `crumbs` array that `PageHero` renders, so
 * the markup can never describe a hierarchy different from the one on screen —
 * a mismatch Google treats as a structured-data violation.
 *
 * `item` is omitted on the final crumb, per Google's guidance: the last
 * element represents the current page and should not link to itself.
 */
export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  const itemList = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    ...crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: crumb.label,
      ...(i === crumbs.length - 1 ? {} : { item: `${SITE.url}${crumb.href}` }),
    })),
  ];

  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemList,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
