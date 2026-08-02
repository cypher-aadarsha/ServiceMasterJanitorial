import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Services } from "@/components/sections/Services";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "Services", href: ROUTES.services }];

export const metadata: Metadata = {
  title: `Commercial Cleaning Services in ${SITE.address.city}`,
  description:
    "Recurring janitorial, disinfection, floor care, high-access, warehouse and restroom consumables — one written scope, one supervisor, one invoice.",
  alternates: { canonical: ROUTES.services },
  openGraph: {
    title: `Commercial Cleaning Services | ${SITE.name}`,
    description:
      "Six services under one accountable contract, each delivered to a written scope and logged every shift.",
    url: `${SITE.url}${ROUTES.services}`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Services"
        title="Commercial cleaning services, delivered to a written scope."
        lead="Consolidate janitorial, floor care, disinfection and consumables with one vendor — and get documentation that proves each of them happened."
      />
      <Services index="01" />
      <ProcessTimeline index="02" />
      <CtaBanner />
    </>
  );
}
