/**
 * ⚠️  EVERY VALUE IN THIS FILE IS PLACEHOLDER PROOF.
 *
 * Statistics, client names, testimonials and certifications below are
 * illustrative only. Replace each with verified, documented fact before
 * launch — and keep the evidence on file. Unsubstantiated proof claims are
 * the fastest way to lose a government or healthcare bid, and in the US they
 * are actionable under FTC endorsement rules.
 */

export type Stat = {
  value: number;
  /** Rendered verbatim after the counter — keeps "+", "%", "M" out of the
   *  animated number so the tween stays purely numeric. */
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  /** The qualifier that makes a number believable. A stat without a
   *  denominator is decoration; with one, it is evidence. */
  detail: string;
};

/** PLACEHOLDER — substitute audited figures. */
export const STATS: Stat[] = [
  { value: 1200, suffix: "+", label: "Facilities serviced", detail: "Across eight counties since 2004" },
  { value: 99.2, suffix: "%", decimals: 1, label: "Scheduled-clean completion", detail: "Rolling 12-month average" },
  { value: 4, suffix: "hr", label: "Response window", detail: "For any escalated service request" },
  { value: 2, prefix: "$", suffix: "M", label: "Liability coverage", detail: "Certificate issued on request" },
];

export type ClientLogo = { name: string; sector: string };

/** PLACEHOLDER — these are invented organisations used to demonstrate the
 *  marquee. Never display a client's name or mark without written permission;
 *  most commercial contracts require it explicitly. */
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Northgate Medical", sector: "Healthcare" },
  { name: "Vantage Logistics", sector: "Distribution" },
  { name: "Harbor Point Schools", sector: "Education" },
  { name: "Meridian Property Group", sector: "Property" },
  { name: "Ironline Manufacturing", sector: "Industrial" },
  { name: "Cedar Civic Center", sector: "Government" },
  { name: "Ellis & Roe LLP", sector: "Professional" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
  metric: string;
};

/** PLACEHOLDER — replace with real, attributable, written-consent quotes. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We switched because our previous vendor could never tell us what had actually been cleaned. The nightly log ended that argument in the first week — I now walk into the Monday facilities meeting with the answer already in hand.",
    name: "Dana Whitfield",
    role: "Director of Facilities",
    org: "Northgate Medical",
    metric: "Complaint tickets down 71%",
  },
  {
    quote:
      "Our infection-control audit used to be a fire drill. Their documentation lined up with what the surveyor asked for, line for line, and we cleared it without a single corrective action.",
    name: "Marcus Reyes",
    role: "Environmental Services Manager",
    org: "Cedar Civic Center",
    metric: "Zero corrective actions",
  },
  {
    quote:
      "Eleven buildings, one supervisor I can actually reach, one invoice. Consolidating onto them cut the time my team spends managing cleaning vendors by more than half.",
    name: "Priya Raman",
    role: "Regional Portfolio Manager",
    org: "Meridian Property Group",
    metric: "11 sites, 1 point of contact",
  },
];

export type Certification = { label: string; detail: string };

/** PLACEHOLDER — list ONLY credentials currently held, with live expiry
 *  dates. Displaying a lapsed or unearned certification is fraud. */
export const CERTIFICATIONS: Certification[] = [
  { label: "OSHA-Compliant Crews", detail: "Hazard communication & PPE trained" },
  { label: "$2M General Liability", detail: "Certificate of insurance on request" },
  { label: "Bonded & Background-Checked", detail: "Every technician, before first shift" },
  { label: "EPA List N Protocols", detail: "Registered disinfectants, verified dwell times" },
  { label: "Green Seal Cleaning Options", detail: "Low-VOC programme available on request" },
  { label: "Bloodborne Pathogen Trained", detail: "Annual recertification, records retained" },
];
