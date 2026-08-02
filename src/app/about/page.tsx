import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Stats } from "@/components/sections/Stats";
import { WhyUs } from "@/components/sections/WhyUs";
import { Certifications } from "@/components/sections/Certifications";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "About", href: ROUTES.about }];

export const metadata: Metadata = {
  title: `About ${SITE.name} — Commercial Cleaning in ${SITE.address.city}`,
  description:
    `A ServiceMaster Clean franchise serving ${SITE.address.city} and the surrounding counties. Named supervisors, written scopes, vetted crews and documented results.`,
  alternates: { canonical: ROUTES.about },
  openGraph: {
    title: `About ${SITE.name}`,
    description:
      "Most cleaning problems are accountability problems. Here is how we engineered around that.",
    url: `${SITE.url}${ROUTES.about}`,
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="About us"
        title="A ServiceMaster Clean franchise, run on measurement."
        lead={`We clean buildings across ${SITE.address.city} and the surrounding counties — backed by a national brand's standards and answerable to you locally, by name.`}
      />
      <Stats />
      <WhyUs index="01" />
      <Certifications />
      <ClientLogos />
      <CtaBanner />
    </>
  );
}
