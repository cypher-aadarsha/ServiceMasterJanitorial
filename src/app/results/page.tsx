import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "Results", href: ROUTES.results }];

export const metadata: Metadata = {
  title: "Results — Before & After, Client Outcomes",
  description:
    "See the difference a restoration cycle makes, and what facility managers report after ninety days: fewer complaint tickets, cleaner audits, one point of contact.",
  alternates: { canonical: ROUTES.results },
  openGraph: {
    title: `Results | ${SITE.name}`,
    description:
      "Drag the comparison, read the outcomes. Proof rather than promises.",
    url: `${SITE.url}${ROUTES.results}`,
  },
};

export default function ResultsPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Proof"
        title="What the work actually looks like."
        lead="A restoration you can drag through frame by frame, the outcomes facility managers report after ninety days, and the numbers we hold ourselves to."
      />
      <BeforeAfter index="01" />
      <Testimonials index="02" />
      <Stats />
      <CtaBanner />
    </>
  );
}
