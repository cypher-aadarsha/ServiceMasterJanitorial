/**
 * ============================================================================
 * SITE CONTENT — single source of truth for copy, NAP data and proof points.
 * ============================================================================
 *
 * ⚠️  PLACEHOLDER CONTENT WARNING
 *
 * Every value marked `PLACEHOLDER` below is illustrative copy written to
 * demonstrate the layout. It is NOT verified fact. Before this site goes to
 * production, the business owner must replace each one with a real, provable
 * figure, name or quote. Publishing invented statistics, client names,
 * testimonials or certifications is false advertising and, for the medical and
 * government verticals this site targets, a procurement-disqualifying risk.
 *
 * Anything not marked PLACEHOLDER is structural copy (labels, headings,
 * explanations of process) and is safe to ship as written.
 */

export const SITE = {
  name: "ServiceMaster Janitorial",
  legalName: "ServiceMaster Janitorial",
  tagline: "Commercial cleaning, held to a measurable standard.",
  url: "https://www.servicemasterjanitorial.com",

  /** PLACEHOLDER — replace with the real NAP. Must match Google Business
   *  Profile character-for-character; inconsistent NAP is the single most
   *  common local-SEO ranking leak. */
  phone: "(555) 014-2200",
  phoneHref: "tel:+15550142200",
  email: "bids@servicemasterjanitorial.com",
  address: {
    street: "1400 Commerce Park Drive, Suite 210",
    city: "Springfield",
    region: "IL",
    postalCode: "62704",
    country: "US",
  },
  /** PLACEHOLDER — geo coordinates of the real office, for LocalBusiness schema. */
  geo: { lat: 39.7817, lng: -89.6501 },
  hours: "Office Mon–Fri 8:00a–5:00p · Cleaning crews 24/7",

  /** PLACEHOLDER — replace with the actual served municipalities. Keep this
   *  list honest and tight; padding it with cities you cannot service dilutes
   *  relevance and generates unqualified leads. */
  serviceAreas: [
    "Springfield",
    "Chatham",
    "Sherman",
    "Rochester",
    "Decatur",
    "Jacksonville",
    "Lincoln",
    "Taylorville",
  ],

  social: {
    linkedin: "https://www.linkedin.com/company/servicemasterjanitorial",
    facebook: "https://www.facebook.com/servicemasterjanitorial",
  },
} as const;

/**
 * ROUTES — the single source of truth for the site's URL structure.
 *
 * Every navigation item resolves to its own page rather than an on-page
 * anchor. Beyond the stakeholder requirement, dedicated routes are the right
 * call for a lead-generation site: each one gets its own title, meta
 * description, canonical URL and H1, so "commercial cleaning services" and
 * "medical facility cleaning" can rank independently instead of competing for
 * a single homepage listing. They also give analytics real per-section
 * pageviews, which anchors never produce.
 *
 * Adding a route here automatically updates the header, the mobile panel, the
 * footer and the sitemap — nothing is hand-listed anywhere else.
 */
export const ROUTES = {
  home: "/",
  services: "/services",
  industries: "/industries",
  about: "/about",
  process: "/process",
  results: "/results",
  faq: "/faq",
  contact: "/contact",
} as const;

/** Primary navigation. Kept flat and short — a facility manager evaluating
 *  vendors should never need to hunt through a mega-menu. Contact is excluded
 *  because it is already the header's CTA button; listing it twice splits the
 *  click and weakens the primary action. */
export const NAV_LINKS = [
  { label: "Services", href: ROUTES.services },
  { label: "Industries", href: ROUTES.industries },
  { label: "About", href: ROUTES.about },
  { label: "Process", href: ROUTES.process },
  { label: "Results", href: ROUTES.results },
  { label: "FAQ", href: ROUTES.faq },
] as const;
