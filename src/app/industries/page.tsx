import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Industries } from "@/components/sections/Industries";
import { Certifications } from "@/components/sections/Certifications";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "Industries", href: ROUTES.industries }];

export const metadata: Metadata = {
  title: "Industries We Clean — Medical, Schools, Warehouse, Government",
  description:
    `Commercial cleaning for offices, medical facilities, schools, retail, warehouses, government buildings and industrial plants across ${SITE.address.city}.`,
  alternates: { canonical: ROUTES.industries },
  openGraph: {
    title: `Industries We Serve | ${SITE.name}`,
    description:
      "Scopes, training and documentation built around what your particular building is held accountable for.",
    url: `${SITE.url}${ROUTES.industries}`,
  },
};

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Industry expertise"
        title="Eight industries, eight different definitions of clean."
        lead="A medical suite and a distribution centre fail inspection for completely different reasons. Our scopes, crew training and documentation are built around yours."
      />
      <Industries index="01" />
      <Certifications />
      <CtaBanner />
    </>
  );
}
