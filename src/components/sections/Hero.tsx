import { HiArrowRight, HiOutlinePhone, HiOutlineCalendarDays } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { SITE } from "@/content/site";
import { CompletionLogCard } from "@/components/sections/CompletionLogCard";

/**
 * HERO
 *
 * UX reasoning
 * ------------
 * Reference sites in this category open with a stock photo of a mop and a
 * "QUALITY CLEANING YOU CAN TRUST" headline. That fails because it is
 * unfalsifiable — every competitor says it, so it carries zero information and
 * the visitor's real question ("can I hand this building to you without it
 * becoming my problem?") goes unanswered above the fold.
 *
 * This hero answers that question instead, and does it with the *product*
 * rather than a promise: the visual is a nightly completion log, the single
 * artefact that separates a managed cleaning contract from a crew with a
 * vacuum. Showing the deliverable is more persuasive than describing it, and
 * it is the thing no competitor's stock photography can imitate.
 *
 * Layout
 * ------
 * Asymmetric 7/5 split on desktop — the wider text column keeps the headline
 * on two or three lines (the readable maximum for display type) while the
 * narrower visual column reads as a supporting artefact rather than a hero
 * image competing for attention.
 *
 * Mobile
 * ------
 * Stacks to a single column, text first. The log card follows the CTAs rather
 * than preceding them, because on a 390px screen every pixel above the primary
 * button is a pixel of conversion tax. Decorative orbs shrink and the
 * blueprint grid coarsens so neither eats fill-rate on a mid-range phone.
 *
 * Performance
 * -----------
 * The `<h1>` is a plain server-rendered element with NO entrance animation.
 * It is almost certainly the LCP element, and starting it at `opacity: 0`
 * would defer the LCP timestamp by the length of the animation. Everything
 * that does animate here is below or beside it.
 *
 * Accessibility
 * -------------
 * Decorative gradients are `aria-hidden` and pointer-events-none. The
 * headline is the page's only `<h1>`. Both CTAs are ≥44px tall and are
 * distinguishable without relying on colour alone (one is filled, one is
 * outlined and carries an icon).
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 pb-section-sm lg:pt-40">
      {/* Decorative layer ---------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-blueprint absolute inset-0" />
        {/* Floating brand orbs. `blur-3xl` + low opacity keeps them reading as
            light rather than as shapes; motion-safe gates the drift. */}
        <div className="absolute -left-32 -top-24 size-[34rem] rounded-full bg-brand-200/40 blur-3xl motion-safe:animate-float-slow" />
        <div
          className="absolute -right-40 top-24 size-[30rem] rounded-full bg-signal-300/25 blur-3xl motion-safe:animate-float-slow"
          style={{ animationDelay: "-4.5s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------------------------------------------------- Copy */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Insured · Bonded · Background-checked</Chip>
              {/* Honest availability, not manufactured scarcity. A fake
                  "3 slots left" counter is trivially disproved by reloading
                  the page, and losing credibility above the fold costs more
                  than the urgency gains. */}
              <Chip tone="brand">
                <HiOutlineCalendarDays aria-hidden="true" className="size-3.5" />
                Walkthroughs typically booked within 3 business days
              </Chip>
            </div>

            <h1 className="mt-7 text-display-1 font-bold text-ink-950">
              Commercial cleaning in{" "}
              <span className="bg-gradient-to-br from-brand-600 to-brand-900 bg-clip-text text-transparent">
                {SITE.address.city}
              </span>
              , documented down to the shift.
            </h1>

            <p className="mt-6 max-w-xl text-lead text-mist-600">
              Offices, medical facilities, schools, warehouses and government
              buildings — cleaned to a written scope by a vetted crew, overseen
              by a supervisor you can reach by name, and logged every night so
              you never have to ask whether it was done.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#quote">
                Book a free walkthrough
                <HiArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                />
              </Button>
              <Button href={SITE.phoneHref} variant="secondary">
                <HiOutlinePhone aria-hidden="true" className="size-4 text-brand-600" />
                <span className="sr-only">Call </span>
                {SITE.phone}
              </Button>
            </div>

            <p className="mt-5 text-sm text-mist-500">
              No obligation, no lock-in contract. 30 minutes on site is usually
              all it takes to quote your building accurately.
            </p>
          </div>

          {/* ------------------------------------------------- Artefact */}
          <div className="lg:col-span-5">
            <CompletionLogCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
