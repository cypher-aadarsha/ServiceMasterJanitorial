import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SERVICES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { NAV_LINKS, SITE } from "@/content/site";

/**
 * FOOTER
 *
 * UX reasoning
 * ------------
 * The footer has two jobs, and neither is decoration.
 *
 * 1. LOCAL SEO. The NAP block (name, address, phone) is marked up in real
 *    address semantics and matches the Google Business Profile exactly. The
 *    service-area list gives crawlers unambiguous geographic signal without
 *    resorting to a spammy city-stuffed paragraph.
 *
 * 2. INTERNAL LINKING. Service and industry links are the site's link equity
 *    distribution layer. They currently point at on-page anchors; when the
 *    dedicated `/services/*` and `/industries/*` pages ship, only these `href`
 *    values change and every page inherits the link graph automatically. That
 *    is why they are generated from the same content arrays the sections use,
 *    rather than hand-listed.
 *
 * A last tap-to-call sits in the footer because a meaningful share of mobile
 * visitors scroll straight to the bottom looking for a phone number — it is
 * where the number has lived on every site they have ever used.
 *
 * Layout
 * ------
 * A 12-column grid: brand and NAP occupy four, then three link columns. Deep
 * navy closes the page and bookends the dark utility strip at the very top.
 *
 * Mobile
 * ------
 * Stacks to a single column in source order — brand, contact, then link
 * groups. Link lists stay full lists rather than collapsing into accordions:
 * the crawler benefit and the tap-target simplicity both favour plain lists.
 *
 * Accessibility
 * -------------
 * `<address>` wraps the contact block (its correct semantic use). Each link
 * column is a `<nav>` with its own accessible name, so screen-reader users get
 * three clearly labelled groups instead of one 20-item list. Body text is
 * `brand-100` on `ink-950` — comfortably AAA.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink-950 text-brand-100/75">
      <Container size="wide" className="py-section-sm">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand + NAP */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />

            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Commercial cleaning for offices, medical facilities, schools,
              retail, warehouses and government buildings across{" "}
              {SITE.address.city} and the surrounding counties.
            </p>

            <address className="mt-7 space-y-3.5 not-italic">
              <a
                href={SITE.phoneHref}
                className="flex items-start gap-3 text-white transition-colors hover:text-brand-200"
              >
                <HiOutlinePhone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span className="font-display text-base font-semibold">{SITE.phone}</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-3 text-sm transition-colors hover:text-brand-200"
              >
                <HiOutlineEnvelope aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span className="break-all">{SITE.email}</span>
              </a>
              <p className="flex items-start gap-3 text-sm">
                <HiOutlineMapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </p>
            </address>

            <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-brand-300/70">
              {SITE.hours}
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-brand-200">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#services`}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries served" className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-brand-200">
              Industries
            </h2>
            <ul className="mt-5 space-y-3">
              {INDUSTRIES.map((industry) => (
                <li key={industry.id}>
                  <a href="#industries" className="text-sm transition-colors hover:text-white">
                    {industry.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-brand-200">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className="text-sm font-semibold text-white transition-colors hover:text-brand-200">
                  Get a quote
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Service areas — explicit local signal, kept as a readable list
            rather than a keyword-stuffed sentence. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-brand-200">
            Service area
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {SITE.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-pill bg-white/6 px-3 py-1.5 text-xs text-brand-100/80 ring-1 ring-white/10"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-300/70">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-brand-300/70">
            Licensed · Bonded · Insured — certificates available on request.
          </p>
        </div>
      </Container>
    </footer>
  );
}
