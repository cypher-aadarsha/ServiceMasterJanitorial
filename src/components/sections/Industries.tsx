import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/content/industries";

/**
 * INDUSTRY EXPERTISE
 *
 * UX reasoning
 * ------------
 * This is the highest-leverage section on the page for a multi-vertical
 * cleaning company, and the one competitors get most wrong. The usual version
 * is a list of industry names, which communicates nothing — every janitorial
 * firm claims all eight.
 *
 * Here each tile names the *specific* thing that vertical is judged on
 * ("Every surface has to survive an infection-control audit") and answers it
 * with a matching capability. Articulating a buyer's problem better than they
 * can articulate it themselves is the strongest available proof of expertise —
 * far stronger than asserting the expertise directly.
 *
 * Layout
 * ------
 * A dense 4×2 tile grid on desktop. Tiles are deliberately smaller and
 * quieter than the service cards: this section answers "do you understand
 * me?", not "what do you sell?", so it should read fast and not compete with
 * the services grid above it.
 *
 * Mobile
 * ------
 * 2-up grid down to 390px. Two columns keep the section to four scroll-rows
 * instead of eight, and the copy is short enough to stay legible at that
 * width. The pain line truncates to no fewer than two lines at any size.
 *
 * Animation
 * ---------
 * Staggered reveal. On hover the icon tile fills with brand colour and the
 * proof line slides up from beneath the pain line — a small reward that makes
 * scanning the grid feel interactive rather than passive.
 *
 * Accessibility
 * -------------
 * The hover-revealed proof line is present in the DOM at all times and merely
 * transitions opacity/position, so keyboard and screen-reader users receive
 * the same information. Nothing here depends on hover to be perceivable.
 */
export function Industries() {
  return (
    <Section id="industries" tone="mist" labelledBy="industries-heading">
      <Container size="wide">
        <SectionHeading
          index="02"
          eyebrow="Industry expertise"
          id="industries-heading"
          align="center"
          title="We clean buildings that get inspected."
          lead="Different facilities fail for different reasons. Our scopes, training and documentation are built around what your particular building is actually held accountable for."
        />

        <ul className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.id} as="li" delay={stagger(i, 0.05)} className="flex">
              <article className="group sweep flex w-full flex-col rounded-card bg-white p-5 ring-1 ring-mist-200 shadow-soft transition-[box-shadow,transform,--tw-ring-color] duration-300 ease-out-expo hover:shadow-card hover:ring-brand-200 motion-safe:hover:-translate-y-1 sm:p-6">
                <span
                  aria-hidden="true"
                  className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-600/10 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"
                >
                  <industry.Icon className="size-5" />
                </span>

                <h3 className="mt-5 font-display text-[0.9375rem] font-semibold leading-snug text-ink-950 sm:text-base">
                  {industry.name}
                </h3>

                <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-600">
                  {industry.pain}
                </p>

                <p className="mt-auto pt-4 text-[0.6875rem] font-medium leading-snug text-signal-700 transition-transform duration-300 ease-out-expo motion-safe:translate-y-1 motion-safe:group-hover:translate-y-0">
                  <span
                    aria-hidden="true"
                    className="mr-1.5 inline-block size-1.5 shrink-0 rounded-full bg-signal-500 align-middle"
                  />
                  {industry.proof}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.14}>
          <p className="mt-10 text-center text-sm text-mist-500">
            Multi-site portfolio? We consolidate every building onto one scope,
            one supervisor and one invoice.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
