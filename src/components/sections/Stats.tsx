import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/ui/Section";
import { STATS } from "@/content/proof";

/**
 * ANIMATED STATISTICS
 *
 * UX reasoning
 * ------------
 * The first dark band on the page. Inverting the surface here does two things:
 * it gives the eye a hard stop after the light hero-and-logos run, and it
 * frames these four numbers as *the* headline claim of the business. A
 * statistic on a white background is a detail; the same statistic on a deep
 * navy field is a statement.
 *
 * Each stat carries a `detail` line — the denominator. "99.2%" alone is
 * marketing noise; "99.2%, rolling 12-month average" is a measurement, and
 * measurement is this brand's entire positioning. The qualifier is what makes
 * the number persuasive to the sceptical buyer we are targeting.
 *
 * Layout
 * ------
 * Four columns on desktop, separated by hairline rules rather than cards.
 * Rules keep the band feeling like one instrument panel; four boxes would
 * fragment it into four unrelated brags.
 *
 * Mobile
 * ------
 * Collapses to a 2×2 grid, not a 1×4 stack. Two columns preserve the
 * "dashboard" gestalt at 390px and halve the scroll distance, so all four
 * numbers can be taken in with a single glance instead of four.
 *
 * Animation
 * ---------
 * Counters run once, when 50% of each number is in view — early enough to be
 * seen, late enough that it has not already finished before the user arrives.
 *
 * Accessibility
 * -------------
 * Ticking digits are hidden from assistive tech; each stat is announced once
 * as a settled value plus its label (see `Counter`). White on `ink-950` is
 * 18.3:1, and the `brand-200` detail text is 12.2:1 — both comfortably AAA.
 */
export function Stats() {
  return (
    <Section id="stats" tone="ink" size="compact" labelledBy="stats-heading" className="overflow-hidden">
      <div aria-hidden="true" className="bg-blueprint-dark pointer-events-none absolute inset-0" />

      <Container size="wide" className="relative">
        <h2
          id="stats-heading"
          className="text-center font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-brand-200"
        >
          The numbers we are held to
        </h2>

        <dl className="mt-12 grid grid-cols-2 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={stagger(i)}
              // Hairline separator drawn as a pseudo-element on the grid item
              // itself, so `odd:`/`first:` resolve against sibling position in
              // the grid. It is suppressed at the start of every row: 2-up on
              // mobile that means the odd-numbered items, 4-up on desktop only
              // the first.
              className={
                "relative px-4 text-center lg:px-6 " +
                "before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-white/12 " +
                "max-lg:odd:before:hidden lg:first:before:hidden"
              }
            >
              <dd className="font-display text-[clamp(2.5rem,1.8rem+2.6vw,3.75rem)] font-bold leading-none text-white">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  srLabel={stat.label}
                />
              </dd>
              <dt className="mt-4 font-display text-sm font-semibold text-brand-100">
                {stat.label}
              </dt>
              <p className="mx-auto mt-2 max-w-[18ch] text-xs leading-relaxed text-brand-300/80">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
