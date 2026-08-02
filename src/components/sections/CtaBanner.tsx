import { HiArrowRight, HiOutlinePhone } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ROUTES, SITE } from "@/content/site";

/**
 * CTA BANNER
 *
 * UX reasoning
 * ------------
 * A deliberate interruption between the FAQ and the form. By this point the
 * reader has consumed every argument the page has; the banner catches the
 * ones who are convinced and gives them a route out of the scroll, without
 * making the still-undecided feel pushed — they simply keep scrolling and land
 * on the form anyway.
 *
 * Two CTAs, ranked by commitment: the form for planners, the phone for people
 * with a problem today. Splitting by *urgency* rather than by preference
 * captures both without diluting either.
 *
 * The reassurance line under the buttons does the heavy lifting. Three
 * friction removers — no obligation, no lock-in, fixed price — stack directly
 * beneath the click target, which is exactly where hesitation occurs.
 *
 * Layout
 * ------
 * Full-bleed brand gradient, the only saturated surface on the page. Because
 * nothing else competes at this intensity, it functions as a visual full stop.
 * Content is centred and capped near 40ch — short lines make a short message
 * feel decisive.
 *
 * Mobile
 * ------
 * Buttons stack full-width, primary on top, and remain ≥48px. The decorative
 * grid and glow are dropped below `sm` so the band stays cheap to paint.
 *
 * Animation
 * ---------
 * A single reveal for the block, plus a slow-drifting radial glow behind the
 * heading. The glow is `motion-safe` gated and sits under the text at low
 * opacity, so it never reduces the contrast of the copy above it.
 *
 * Accessibility
 * -------------
 * White on `brand-800` clears AAA. The secondary CTA is outlined with a
 * visible border rather than distinguished by colour alone, so it stays
 * discoverable in forced-colours and greyscale.
 */
export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative overflow-hidden bg-brand-800 py-section-sm">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950" />
        <div className="bg-blueprint-dark absolute inset-0 hidden sm:block" />
        <div className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-400/20 blur-3xl motion-safe:animate-float-slow" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-brand-200">
              Ready when you are
            </p>

            <h2
              id="cta-heading"
              className="mt-5 text-display-3 font-semibold text-white sm:text-display-2"
            >
              Stop chasing your cleaning vendor.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lead text-brand-100/85">
              One walkthrough, one written scope, one fixed price. Find out what
              your building should actually cost to keep clean.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={ROUTES.contact} variant="onDark">
                Book a free walkthrough
                <HiArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                />
              </Button>
              <Button
                href={SITE.phoneHref}
                className="border border-white/30 bg-white/8 text-white shadow-none hover:border-white/60 hover:bg-white/15"
              >
                <HiOutlinePhone aria-hidden="true" className="size-4" />
                <span className="sr-only">Call </span>
                {SITE.phone}
              </Button>
            </div>

            <p className="mt-6 text-sm text-brand-200/80">
              No obligation · No lock-in contract · Fixed monthly price
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
