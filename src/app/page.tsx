import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES } from "@/content/site";

/**
 * HOMEPAGE
 *
 * Section order follows the buyer's decision sequence, not a template's:
 *
 *   HERO            What is this, and can it solve my problem?   → the artefact
 *   CLIENT LOGOS    Do people like me use them?                  → borrowed trust
 *   STATS           Is there substance behind it?                → measurement
 *   SERVICES        Can they cover everything I need?            → scope
 *   INDUSTRIES      Do they understand MY building?              → relevance
 *   WHY US          Why them and not the incumbent?              → contrast
 *   PROCESS         What am I actually signing up for?           → de-risking
 *   BEFORE/AFTER    Show me it works.                            → evidence
 *   TESTIMONIALS    What changed for someone like me?            → outcomes
 *   CERTIFICATIONS  Will this clear procurement?                 → permission
 *   CTA BANNER      The ask.                                     → conversion
 *
 * Trust is front-loaded (logos and hard numbers inside the first two screens)
 * because a local-service visitor decides whether a company is credible long
 * before they finish reading.
 *
 * ROLE AFTER THE ROUTING SPLIT
 * ----------------------------
 * Each nav item now has its own page, so this page's job changed: it is the
 * overview that establishes credibility and routes people onward, not the
 * place every question gets answered exhaustively.
 *
 * Two consequences, both deliberate:
 *
 *  - Each preview section is followed by a "deeper" link to its full route.
 *    Without those, the dedicated pages would be reachable only from the nav,
 *    which is the classic failure mode of splitting a long homepage — the
 *    sub-pages get no internal link equity and no in-context entry point.
 *  - The FAQ and the contact form no longer live here. Both now have routes,
 *    and duplicating long-form content across URLs creates self-competing
 *    pages. The CTA banner carries the conversion path instead.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Stats />

      <Services />
      <MoreLink href={ROUTES.services} label="Explore all six services in detail" />

      <Industries />
      <MoreLink href={ROUTES.industries} label="See how we work in your industry" />

      <WhyUs />

      <ProcessTimeline />
      <MoreLink href={ROUTES.process} label="Walk through the full process" />

      <BeforeAfter />

      <Testimonials />
      <MoreLink href={ROUTES.results} label="See more results and client outcomes" />

      <Certifications />
      <MoreLink href={ROUTES.faq} label="Read the questions buyers ask most" />

      <CtaBanner />
    </>
  );
}

/**
 * The homepage-to-route bridge.
 *
 * Styled as a quiet, wide link rather than a button: it is a secondary path,
 * and giving it button weight would put it in competition with the primary
 * "Book a walkthrough" CTA that the whole page is driving toward.
 *
 * The arrow translates on hover — the same micro-interaction used on every
 * other forward action on the site, so the affordance is learned once.
 */
function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="bg-white pb-section-sm">
      <Container size="wide">
        <Reveal>
          <Link
            href={href}
            className="group mx-auto flex w-fit items-center gap-3 rounded-pill bg-mist-50 px-6 py-3.5 text-sm font-semibold text-brand-700 ring-1 ring-mist-200 transition-all duration-300 ease-out-expo hover:bg-white hover:shadow-card hover:ring-brand-200 motion-safe:hover:-translate-y-0.5"
          >
            {label}
            <HiArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Container>
    </div>
  );
}
