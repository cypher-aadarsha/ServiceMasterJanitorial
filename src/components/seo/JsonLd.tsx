import { FAQS } from "@/content/process";
import { SERVICES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { SITE } from "@/content/site";

/**
 * STRUCTURED DATA
 *
 * Three graphs, each earning its place:
 *
 *  1. `LocalBusiness` / `ProfessionalService` — the single most valuable
 *     schema for a local service business. It feeds the knowledge panel and
 *     the local pack, and `areaServed` gives Google explicit geographic scope
 *     instead of forcing it to infer coverage from body copy.
 *
 *  2. `FAQPage` — generated from the SAME `FAQS` array the accordion renders.
 *     Google requires structured-data text to match visible page text; sharing
 *     one source makes divergence structurally impossible rather than merely
 *     unlikely.
 *
 *  3. `WebSite` — establishes the site entity and its publisher relationship.
 *
 * ⚠️  DELIBERATELY OMITTED: `aggregateRating` and `review`. Both are eligible
 * for rich-result stars, and both are a manual-action risk unless the ratings
 * are real, first-party and collected through a verifiable process. Add them
 * only when genuine reviews exist to back them. Marking up invented ratings is
 * the most common cause of structured-data penalties for local businesses.
 *
 * `hasOfferCatalog` is populated from the services array, so adding a service
 * to `content/services.ts` updates the markup with no further work.
 */
export function JsonLd() {
  const businessId = `${SITE.url}/#business`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": businessId,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        telephone: SITE.phone,
        email: SITE.email,
        description:
          "Commercial cleaning and janitorial services for offices, medical facilities, schools, retail, warehouses, government and industrial buildings — with written scopes, named site supervisors and nightly completion logs.",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        areaServed: SITE.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
        knowsAbout: INDUSTRIES.map((industry) => `${industry.name} cleaning`),
        sameAs: [SITE.social.linkedin, SITE.social.facebook],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Commercial cleaning services",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              serviceType: service.title,
              provider: { "@id": businessId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": businessId },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored in-repo, never user input, so there is no injection
      // surface here. JSON.stringify also escapes the `<` that could otherwise
      // terminate the script element early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/**
 * `FAQPage` — emitted ONLY on `/faq`, where the questions actually render.
 *
 * This moved out of the site-wide graph when the FAQ got its own route.
 * Google requires FAQ markup to sit on the page whose visible content it
 * describes; leaving it in the shared layout would have declared an FAQPage on
 * every route, including ones with no questions on them at all.
 *
 * Generated from the same `FAQS` array the accordion renders, so the
 * structured data cannot drift from the visible text.
 */
export function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/faq#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
