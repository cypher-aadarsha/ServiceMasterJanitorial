export type ProcessStep = {
  id: string;
  index: string;
  title: string;
  duration: string;
  body: string;
  /** Removing the buyer's specific hesitation at the exact step where it
   *  occurs is what makes a timeline persuasive rather than decorative. */
  deliverable: string;
};

/**
 * Five steps. The first two are deliberately framed as low-commitment and
 * time-boxed, because the real conversion barrier for commercial cleaning is
 * not price — it is the fear of a long, pushy sales process.
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "walkthrough",
    index: "01",
    title: "On-site walkthrough",
    duration: "30–45 min",
    body:
      "We walk your building with you, square-footage it properly, and note the things the last vendor missed. No sales pitch, no obligation.",
    deliverable: "Written condition notes",
  },
  {
    id: "scope",
    index: "02",
    title: "Scope & fixed quote",
    duration: "Within 48 hrs",
    body:
      "You get a line-by-line scope of work and a fixed monthly price. Every task, frequency and exclusion is written down before you sign anything.",
    deliverable: "Fixed-price proposal",
  },
  {
    id: "onboarding",
    index: "03",
    title: "Crew assignment & onboarding",
    duration: "5–10 days",
    body:
      "A named supervisor and a dedicated crew are assigned to your site, background-checked, and briefed on your access, security and safety rules.",
    deliverable: "Named site supervisor",
  },
  {
    id: "service",
    index: "04",
    title: "Service delivery & logging",
    duration: "Ongoing",
    body:
      "Crews work to your signed checklist and log completion every shift. You can see what was cleaned, when, and by whom — without asking.",
    deliverable: "Nightly completion log",
  },
  {
    id: "review",
    index: "05",
    title: "Quarterly inspection & review",
    duration: "Every 90 days",
    body:
      "We inspect against the original scope, score it, and sit down with you to adjust. Standards drift when nobody measures them, so we measure them.",
    deliverable: "Scored inspection report",
  },
];

export type Differentiator = {
  title: string;
  body: string;
  /** The competitor behaviour we are contrasting against. Stated plainly,
   *  because "why us" is only meaningful relative to "instead of what". */
  instead: string;
};

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "A named supervisor, not a call centre",
    body:
      "One person owns your building, knows your access codes and answers their own phone. Escalations skip the queue entirely.",
    instead: "Instead of a ticket number and a 48-hour callback",
  },
  {
    title: "Written scope, fixed price",
    body:
      "Every task and frequency is documented before work starts, and the monthly figure does not move unless you ask it to.",
    instead: "Instead of vague scopes and surprise line items",
  },
  {
    title: "Proof the work happened",
    body:
      "Shift-level completion logs and scored quarterly inspections mean cleanliness is a number you can take into a budget meeting.",
    instead: "Instead of trusting that it got done",
  },
  {
    title: "Crews vetted before they hold a key",
    body:
      "Background checks, bonding and site-specific safety briefings are complete before anyone works unsupervised in your building.",
    instead: "Instead of rotating unvetted subcontractors",
  },
];

export type Faq = { q: string; a: string };

/**
 * Ordered by where each objection actually kills the deal: price and lock-in
 * first, logistics second, credentials third. Also the source for FAQPage
 * schema — question and answer text must stay identical to what renders.
 */
export const FAQS: Faq[] = [
  {
    q: "How is a commercial cleaning quote calculated?",
    a: "Pricing is driven by cleanable square footage, service frequency, floor types and traffic level — not by a per-hour guess. After the walkthrough you receive a fixed monthly price with the scope of work attached, so you can compare bids line by line rather than on headline number alone.",
  },
  {
    q: "Am I locked into a long-term contract?",
    a: "No. Our standard agreement runs month-to-month after an initial 90-day period, and it can be cancelled with 30 days' written notice. We would rather keep your building by performing than by holding you to a three-year term.",
  },
  {
    q: "Do you clean outside of business hours?",
    a: "Yes. Most offices, retail and medical sites are serviced after close or overnight, and warehouse and industrial work is scheduled around your production shifts. Access, alarm and lock-up procedures are agreed in writing during onboarding.",
  },
  {
    q: "Are your staff insured, bonded and background-checked?",
    a: "Every technician is background-checked and bonded before their first unsupervised shift, and we carry general liability and workers' compensation coverage. A current certificate of insurance naming you as certificate holder is issued on request.",
  },
  {
    q: "What happens if something is missed?",
    a: "Report it to your named site supervisor and it is corrected within one business day at no charge. Recurring issues are escalated into the quarterly inspection review so the root cause gets fixed, not just the symptom.",
  },
  {
    q: "Can you service multiple buildings in a portfolio?",
    a: "Yes. Multi-site portfolios get a single point of contact, consistent scopes across locations and one consolidated monthly invoice, with per-building reporting available for internal cost allocation.",
  },
  {
    q: "Do you supply your own equipment and consumables?",
    a: "We bring all equipment, chemicals and PPE. Restroom consumables — paper, soap and liners — can be added as a managed par-level programme so your team stops tracking supply closets.",
  },
  {
    q: "How quickly can you start?",
    a: "Typical onboarding is five to ten business days from a signed scope, covering crew assignment, background clearance and a site walkthrough with your facilities lead. Emergency and transition-cover starts can usually be arranged faster.",
  },
];
