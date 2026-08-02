import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { DrawRule } from "@/components/ui/DrawRule";
import { ROUTES, SITE } from "@/content/site";

export type Crumb = { label: string; href: string };

/**
 * PAGE HERO — the shared masthead for every route except the homepage.
 *
 * UX reasoning
 * ------------
 * A visitor landing on `/industries` from a search result has none of the
 * context a homepage visitor has. This block does three jobs in one screen:
 * tells them where they are (breadcrumb), what the page covers (H1 + lead),
 * and that the company is credible (the stat strip), before they decide
 * whether to scroll.
 *
 * The breadcrumb is not decoration. On a multi-page lead-gen site it is the
 * cheapest orientation device available, it gives Google an explicit hierarchy
 * signal via `BreadcrumbList`, and it earns the breadcrumb rich result that
 * replaces the raw URL in the SERP — which measurably improves click-through
 * on deep pages.
 *
 * Layout
 * ------
 * Shorter than the homepage hero on purpose. This is a signpost, not a pitch:
 * the page's real content should begin within the first scroll.
 *
 * Mobile
 * ------
 * The breadcrumb stays on one line and truncates the middle rather than
 * wrapping to two, which would push the H1 below the fold on a 390px screen.
 *
 * Accessibility
 * -------------
 * The breadcrumb is a labelled `<nav>` containing an ordered list, with the
 * current page marked `aria-current="page"` and rendered as plain text rather
 * than a link to itself. Separators are `aria-hidden`.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-mist-200 bg-mist-50 pt-28 pb-section-sm lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-blueprint absolute inset-0" />
        <div className="absolute -right-24 -top-20 size-[26rem] rounded-full bg-brand-200/35 blur-3xl motion-safe:animate-float-slow" />
      </div>

      <Container size="wide" className="relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mist-500">
            <li>
              <Link
                href={ROUTES.home}
                className="rounded transition-colors hover:text-brand-700"
              >
                Home
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-2">
                  <HiChevronRight aria-hidden="true" className="size-3.5 text-mist-300" />
                  {last ? (
                    <span aria-current="page" className="font-medium text-ink-950">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="rounded transition-colors hover:text-brand-700"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-8 flex items-center gap-3">
          <DrawRule />
          <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-brand-700">
            {eyebrow}
          </span>
        </div>

        <h1 className="mt-5 max-w-3xl text-display-2 font-bold text-ink-950">{title}</h1>
        <p className="mt-5 max-w-2xl text-lead text-mist-600">{lead}</p>

        <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mist-500">
          Serving {SITE.serviceAreas.slice(0, 4).join(" · ")} + {SITE.serviceAreas.length - 4} more
        </p>
      </Container>
    </section>
  );
}
