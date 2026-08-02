import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/content/process";
import { SITE } from "@/content/site";

/**
 * FAQ
 *
 * UX reasoning
 * ------------
 * An FAQ is not a help section — it is the last objection-handling surface
 * before the form. The questions are therefore ordered by what actually kills
 * deals, not by what is most frequently asked:
 *
 *   1. How is pricing calculated?      (fear of being overcharged)
 *   2. Am I locked in?                 (fear of commitment — the biggest one)
 *   3. Do you work out of hours?       (fear of disruption)
 *   4. Insured, bonded, checked?       (procurement gate)
 *   5. What if something is missed?    (fear of no recourse)
 *   6–8. Portfolio, supplies, timing   (logistics, lower stakes)
 *
 * Answers are written to *close* rather than to inform: each concedes the
 * concern honestly, then supplies a specific, checkable commitment. "No lock-in
 * — month-to-month after 90 days, 30 days' notice" defuses the objection far
 * more effectively than "we offer flexible terms", because it is falsifiable.
 *
 * The first item renders open. An accordion that is entirely closed reads as a
 * wall of buttons and depresses engagement; showing one answer teaches the
 * interaction and demonstrates that the answers are substantive.
 *
 * SEO
 * ---
 * This copy is the source for the `FAQPage` JSON-LD emitted in `layout.tsx`.
 * Both read from the same `FAQS` array, so the structured data can never drift
 * from the rendered text — a mismatch is a manual-action risk in Search
 * Console, and hand-maintained duplicate copy always drifts eventually.
 *
 * Layout
 * ------
 * A narrow single column capped near 68ch. Long-form answers set full-width
 * are measurably harder to read, and this is the one section people genuinely
 * read rather than scan.
 *
 * Mobile
 * ------
 * Identical. Rows are 60px+ tall, the toggle target spans the full row width
 * rather than just the icon, and single-open behaviour keeps the section from
 * growing into an endless scroll.
 *
 * Accessibility
 * -------------
 * Full WAI-ARIA disclosure pattern — see `Accordion`. Questions are real
 * `<h3>`s inside the section's `<h2>`, so the heading outline stays valid and
 * screen-reader users can jump between questions by heading navigation.
 */
/**
 * `index` is a prop so this section can be renumbered when it is composed
 * onto a dedicated route alongside different siblings. The measure-rail index
 * describes position within the CURRENT page, so a hard-coded value would lie
 * on every page except the homepage.
 */
export function Faq({ index = "07" }: { index?: string } = {}) {
  return (
    <Section id="faq" tone="mist" labelledBy="faq-heading">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index={index}
                eyebrow="Questions"
                id="faq-heading"
                title="The things buyers actually ask us."
                lead="Straight answers on pricing, contracts, insurance and what happens when something goes wrong."
              />

              <Reveal delay={0.16}>
                <p className="mt-8 text-sm leading-relaxed text-mist-600">
                  Still unsure about something?{" "}
                  <a
                    href={SITE.phoneHref}
                    className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition-colors hover:text-brand-800 hover:decoration-brand-600"
                  >
                    Call {SITE.phone}
                  </a>{" "}
                  and ask. No script, no gatekeeping.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <Accordion items={[...FAQS]} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
