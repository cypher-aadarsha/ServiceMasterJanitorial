import { Container } from "@/components/ui/Container";
import { CLIENT_LOGOS } from "@/content/proof";

/**
 * CLIENT LOGOS
 *
 * UX reasoning
 * ------------
 * Placed immediately below the hero because borrowed credibility works best
 * before the visitor has formed a judgement, not after. The sector label under
 * each name does the real work: a medical facility manager scanning this rail
 * is looking for *someone like me*, and "Healthcare" answers that faster than
 * any logo shape can.
 *
 * Layout
 * ------
 * An infinite marquee rather than a static grid. A grid of seven names forces
 * an awkward orphan row and freezes the eye; continuous drift implies a longer
 * list than is shown, which is honest here (it is a sample, not the roster)
 * and keeps the strip to a single compact band.
 *
 * The track is duplicated once and translated -50%, which is what makes the
 * loop seamless. The copy is `aria-hidden` so assistive tech reads each client
 * exactly once.
 *
 * Mobile
 * ------
 * Identical behaviour, faster perceived speed because less of the track is
 * visible. Edge masks prevent the hard clipping that makes marquees look
 * broken on narrow screens.
 *
 * Animation
 * ---------
 * Pure CSS transform on a duplicated track — no JS, no scroll listener, and it
 * runs on the compositor. Hover and keyboard focus pause it (WCAG 2.2.2:
 * moving content lasting more than five seconds needs a pause mechanism), and
 * `prefers-reduced-motion` stops it outright via the global CSS kill-switch.
 */
export function ClientLogos() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section aria-labelledby="clients-heading" className="border-y border-mist-200 bg-mist-50 py-12">
      <Container size="wide">
        <h2
          id="clients-heading"
          className="text-center font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-mist-500"
        >
          Trusted across the facilities our crews clean nightly
        </h2>

        <div className="edge-fade mt-8 overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-4 motion-safe:animate-marquee">
            {track.map((client, i) => (
              <li
                key={`${client.name}-${i}`}
                // The second half of the track is a visual duplicate only.
                aria-hidden={i >= CLIENT_LOGOS.length}
                className="sweep flex shrink-0 items-center gap-3 rounded-card bg-white px-6 py-4 ring-1 ring-mist-200 shadow-soft transition-shadow duration-300 hover:shadow-card"
              >
                {/* Abstract monogram tile — a neutral stand-in for a real
                    supplied logo asset, so the layout is exact from day one. */}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-900 font-display text-xs font-bold text-white"
                >
                  {client.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="whitespace-nowrap font-display text-sm font-semibold text-ink-950">
                    {client.name}
                  </span>
                  <span className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mist-400">
                    {client.sector}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
