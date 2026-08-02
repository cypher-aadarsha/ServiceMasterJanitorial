import { HiOutlineXMark, HiCheck } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DIFFERENTIATORS } from "@/content/process";

/**
 * WHY CHOOSE US
 *
 * UX reasoning
 * ------------
 * "Why choose us" sections almost always fail because they list virtues
 * (reliable, professional, detail-oriented) that the reader has already heard
 * from every competitor, and which are unfalsifiable by construction.
 *
 * This one is built as an explicit contrast: each claim is paired with the
 * competitor behaviour it replaces. Contrast is what makes a differentiator
 * legible — "a named supervisor" only lands once you have re-felt the
 * frustration of "a ticket number and a 48-hour callback". Naming the pain
 * the reader has personally lived through does more persuasive work than any
 * adjective can.
 *
 * The `instead of` line is set in muted grey with a strike-through mark, so
 * the visual hierarchy reads: our claim (dark, bold) > their status quo
 * (light, negated). The reader gets the whole argument in a single glance
 * without reading a word.
 *
 * Layout
 * ------
 * A 2×2 grid of wide rows rather than four narrow columns. Each item needs
 * two lines of claim and one of contrast; narrow columns would fragment that
 * into ragged six-line blocks.
 *
 * Mobile
 * ------
 * Single column. The contrast line stays directly beneath its claim so the
 * pairing never breaks across a scroll boundary.
 *
 * Accessibility
 * -------------
 * The ✗/✓ marks are decorative and hidden — the words "Instead of" carry the
 * meaning, so the contrast is never encoded in icon or colour alone.
 */
/**
 * `index` is a prop so this section can be renumbered when it is composed
 * onto a dedicated route alongside different siblings. The measure-rail index
 * describes position within the CURRENT page, so a hard-coded value would lie
 * on every page except the homepage.
 */
export function WhyUs({ index = "03" }: { index?: string } = {}) {
  return (
    <Section id="why-us" labelledBy="why-heading">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index={index}
              eyebrow="Why ServiceMaster Janitorial"
              id="why-heading"
              title="Most cleaning problems are accountability problems."
              lead="The mop is not the hard part. Knowing who is responsible, what was agreed, and whether it actually happened — that is the part that goes wrong, and it is the part we engineered around."
            />

            <Reveal delay={0.18}>
              <div className="mt-10 rounded-card border-l-2 border-brand-600 bg-mist-50 p-6">
                <p className="font-display text-lg font-semibold leading-snug text-ink-950">
                  “If you cannot measure it, you cannot manage it — and you
                  certainly cannot defend it in a budget meeting.”
                </p>
                <p className="mt-3 text-sm text-mist-500">
                  The operating principle behind every scope we write.
                </p>
              </div>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal key={item.title} as="li" delay={stagger(i, 0.08)} className="flex">
                <article className="sweep flex w-full flex-col rounded-card bg-white p-6 ring-1 ring-mist-200 shadow-soft transition-[box-shadow,transform,--tw-ring-color] duration-300 ease-out-expo hover:shadow-lift hover:ring-brand-200 motion-safe:hover:-translate-y-1">
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full bg-signal-50 text-signal-600 ring-1 ring-signal-500/25"
                  >
                    <HiCheck className="size-4" />
                  </span>

                  <h3 className="mt-5 font-display text-base font-semibold leading-snug text-ink-950">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-mist-600">{item.body}</p>

                  <p className="mt-auto flex items-start gap-2 pt-5 text-xs text-mist-400">
                    <HiOutlineXMark aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                    <span className="line-through decoration-mist-300">{item.instead}</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
