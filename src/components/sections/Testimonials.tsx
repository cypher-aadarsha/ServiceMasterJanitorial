import { HiOutlineStar } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/content/proof";

/**
 * TESTIMONIALS
 *
 * UX reasoning
 * ------------
 * B2B testimonials fail when they praise the vendor ("great team, always
 * friendly"). Nobody signs a facilities contract because a crew was friendly.
 * Each quote here is instead a first-person account of a *problem being
 * solved*, and each is topped by the quantified outcome — "Complaint tickets
 * down 71%", "Zero corrective actions".
 *
 * The metric sits ABOVE the quote, not below it. Readers scan proof blocks by
 * jumping between bold fragments; leading with the number gives the skimmer
 * the whole argument, and the quote then supplies the credibility for anyone
 * who slows down to read it.
 *
 * Attribution carries role plus organisation. A quote from "Dana W." is worth
 * nothing; a quote from a named Director of Facilities is worth a great deal,
 * because the reader recognises their own job title.
 *
 * Layout
 * ------
 * Three equal columns, no carousel. Carousels hide two-thirds of your social
 * proof behind an interaction most users never perform, and they are a
 * perennial accessibility problem. Three visible quotes beat nine hidden ones.
 *
 * Mobile
 * ------
 * Stacks to one column in full — again, no carousel and no "read more".
 * Quotes are short enough (≈45 words) that the full text stays scannable at
 * 390px, which is why they were written to that constraint.
 *
 * Animation
 * ---------
 * Staggered reveal only. This section is doing rhetorical work, not visual
 * work; heavy motion over a testimonial reads as distraction from a weak claim.
 *
 * Accessibility
 * -------------
 * Real `<blockquote>` + `<figcaption>` semantics, so assistive tech announces
 * the quotation boundary and its attribution. The decorative quote glyph is
 * `aria-hidden` — otherwise screen readers announce a stray punctuation mark
 * before every quote.
 */
/**
 * `index` is a prop so this section can be renumbered when it is composed
 * onto a dedicated route alongside different siblings. The measure-rail index
 * describes position within the CURRENT page, so a hard-coded value would lie
 * on every page except the homepage.
 */
export function Testimonials({ index = "06" }: { index?: string } = {}) {
  return (
    <Section id="testimonials" tone="mist" labelledBy="testimonials-heading">
      <Container size="wide">
        <SectionHeading
          index={index}
          eyebrow="Client outcomes"
          id="testimonials-heading"
          align="center"
          title="What changes after the first ninety days."
          lead="The facility managers who switch to us tend to describe the same thing: the building stopped being something they had to chase."
        />

        {/* `grid-cols-1` is explicit rather than implied. Tailwind compiles it
            to `minmax(0, 1fr)`, whereas an implicit auto track floors at
            min-content — which lets a single nowrap child (see the truncating
            attribution below) widen the track past the viewport. */}
        <ul className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} as="li" delay={stagger(i, 0.09)} className="flex">
              <figure className="sweep relative flex w-full flex-col rounded-card bg-white p-7 ring-1 ring-mist-200 shadow-soft transition-[box-shadow,transform,--tw-ring-color] duration-300 ease-out-expo hover:shadow-lift hover:ring-brand-200 motion-safe:hover:-translate-y-1">
                {/* Outcome first — the skimmer's entry point. */}
                <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-signal-50 px-3 py-1.5 text-xs font-semibold text-signal-700 ring-1 ring-signal-500/25">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-signal-500" />
                  {t.metric}
                </p>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-5 font-display text-6xl leading-none text-brand-100 select-none"
                >
                  &rdquo;
                </span>

                <blockquote className="mt-6 flex-1">
                  <p className="text-[0.9375rem] leading-relaxed text-mist-700">{t.quote}</p>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-mist-200 pt-5">
                  {/* Monogram stands in for a client headshot: no fabricated
                      stock portrait, and no layout hole where an avatar
                      would be once real photography is supplied. */}
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-900 font-display text-xs font-bold text-white"
                  >
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold text-ink-950">
                      {t.name}
                    </span>
                    {/* Wraps rather than truncates: "Regional Portfolio
                        Manager, Meridian Property Group" is exactly the detail
                        that makes the quote credible, and an ellipsis at 390px
                        would cut it off. */}
                    <span className="block text-xs leading-snug text-mist-500">
                      {t.role}, {t.org}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.16}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-mist-500">
            <HiOutlineStar aria-hidden="true" className="size-4 text-brand-600" />
            References from facilities of a comparable size and sector are
            available on request during the quoting process.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
