import { HiCheckBadge } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/ui/Section";
import { CERTIFICATIONS } from "@/content/proof";

/**
 * CERTIFICATIONS & COMPLIANCE
 *
 * UX reasoning
 * ------------
 * Positioned deliberately between the testimonials and the FAQ — at the point
 * where an interested reader flips from "do I like them?" to "can I actually
 * put them through procurement?". Insurance, bonding and background checks are
 * not persuasion, they are *permission*: for medical, education and government
 * buyers these are hard gates, and a vendor who does not state them plainly is
 * eliminated before a conversation happens.
 *
 * Every item pairs the credential with what it means in practice ("$2M General
 * Liability" → "Certificate of insurance on request"). A badge without a
 * consequence is decoration; a badge with a next action is a de-risking device.
 *
 * Layout
 * ------
 * A compact 3×2 band with light dividers rather than cards — this is reference
 * information, and giving it card weight would let it compete with the
 * services grid. Low visual volume, high informational value.
 *
 * Mobile
 * ------
 * Two columns at ≥480px, single column below. Detail lines are short enough
 * to survive a 390px column without wrapping past two lines.
 *
 * Animation
 * ---------
 * A fast 50ms stagger — quicker than elsewhere on the page, so the band reads
 * as one ripple of confirmation rather than six separate entrances.
 *
 * Accessibility
 * -------------
 * A definition list: credential as `<dt>`, meaning as `<dd>`. Badges are
 * decorative and hidden. Emerald appears here in its one sanctioned role,
 * so the colour's learned meaning stays intact.
 */
export function Certifications() {
  return (
    <Section id="certifications" size="compact" labelledBy="certifications-heading">
      <Container size="wide">
        <div className="rounded-panel bg-mist-50 p-8 ring-1 ring-mist-200 sm:p-12">
          <Reveal>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2
                id="certifications-heading"
                className="font-display text-2xl font-semibold text-ink-950"
              >
                Cleared for procurement before we quote.
              </h2>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mist-500">
                Documentation issued on request
              </p>
            </div>
          </Reveal>

          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.label} delay={stagger(i, 0.05)} className="flex items-start gap-3.5">
                <HiCheckBadge
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-signal-600"
                />
                <div className="min-w-0">
                  <dt className="font-display text-[0.9375rem] font-semibold leading-snug text-ink-950">
                    {cert.label}
                  </dt>
                  <dd className="mt-1 text-[0.8125rem] leading-relaxed text-mist-600">
                    {cert.detail}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
