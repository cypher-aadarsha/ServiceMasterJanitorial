import { HiArrowRight, HiCheck } from "react-icons/hi2";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/content/services";
import { ROUTES } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * SERVICES GRID
 *
 * UX reasoning
 * ------------
 * Six services, each written outcome-first. The failure mode of every cleaning
 * services grid is describing activities ("we vacuum, we dust, we mop") when
 * the buyer is purchasing a result ("nobody complains, we pass the audit, the
 * floor lasts another five years"). Every summary below leads with the result
 * and demotes the activity to the bullet list underneath.
 *
 * Exactly one card is emphasised — Recurring Janitorial, the offer with the
 * highest contract value and the one we most want quoted. It is distinguished
 * by inverting its surface rather than by enlarging it, which keeps the grid
 * mathematically clean at 3×2 with no orphan row at any breakpoint. Two
 * emphasised cards would be zero emphasised cards.
 *
 * Layout
 * ------
 * 3 × 2 on desktop, 2 × 3 at tablet, single column on mobile. Equal-height
 * cards via grid, with the bullet list pinned to the bottom by `mt-auto` so
 * the horizontal rhythm survives uneven copy lengths.
 *
 * Mobile
 * ------
 * Full-width stacked cards. The hover sweep is inert on touch, so each card
 * instead relies on its icon tile and heading weight for scannability — the
 * design never depends on hover to communicate.
 *
 * Animation
 * ---------
 * Staggered reveal at 70ms per card, capped at 420ms total. Cards lift 4px on
 * hover with the specular sweep crossing the surface — the site's signature
 * micro-interaction, and the one place it is used at scale.
 *
 * Accessibility
 * -------------
 * Each card is an `<article>` with an `<h3>`; icons are decorative and hidden.
 * The whole card is not a link (there are no sub-pages yet) so nothing here
 * creates a phantom tab stop — the section's single CTA sits below the grid.
 */
/**
 * `index` is a prop so this section can be renumbered when it is composed
 * onto a dedicated route alongside different siblings. The measure-rail index
 * describes position within the CURRENT page, so a hard-coded value would lie
 * on every page except the homepage.
 */
export function Services({ index = "01" }: { index?: string } = {}) {
  return (
    <Section id="services" labelledBy="services-heading">
      <Container size="wide">
        <SectionHeading
          index={index}
          eyebrow="Services"
          id="services-heading"
          title={
            <>
              Everything a facility needs, <br className="hidden sm:block" />
              under one accountable contract.
            </>
          }
          lead="Consolidate janitorial, floor care, disinfection and consumables with a single vendor — one scope, one supervisor, one invoice, and no finger-pointing when something is missed."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const featured = Boolean(service.featured);
            return (
              <Reveal key={service.id} delay={stagger(i)} className="flex">
                <article
                  className={cn(
                    "group sweep flex w-full flex-col rounded-card p-7 transition-[box-shadow,transform,--tw-ring-color] duration-300 ease-out-expo motion-safe:hover:-translate-y-1",
                    featured
                      ? "sweep-dark bg-gradient-to-br from-brand-700 to-ink-950 text-brand-100/85 shadow-lift ring-1 ring-brand-500/30"
                      : "bg-white shadow-soft ring-1 ring-mist-200 hover:shadow-lift hover:ring-brand-200",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl transition-transform duration-300 ease-out-expo group-hover:scale-105",
                      featured
                        ? "bg-white/12 text-white ring-1 ring-white/20"
                        : "bg-brand-50 text-brand-600 ring-1 ring-brand-600/10",
                    )}
                  >
                    <service.Icon className="size-6" />
                  </span>

                  <h3
                    className={cn(
                      "mt-6 font-display text-xl font-semibold",
                      featured && "text-white",
                    )}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-3 text-[0.9375rem] leading-relaxed",
                      featured ? "text-brand-100/80" : "text-mist-600",
                    )}
                  >
                    {service.summary}
                  </p>

                  <ul
                    className={cn(
                      "mt-auto flex flex-col gap-2.5 border-t pt-6 text-sm",
                      featured ? "border-white/12" : "border-mist-200",
                    )}
                  >
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <HiCheck
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            featured ? "text-signal-400" : "text-signal-600",
                          )}
                        />
                        <span className={featured ? "text-brand-100/90" : "text-mist-700"}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.9375rem] text-mist-600">
            Need something not listed here?
            <Link
              href={ROUTES.contact}
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition-colors hover:text-brand-800 hover:decoration-brand-600"
            >
              Tell us about your building
              <HiArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
