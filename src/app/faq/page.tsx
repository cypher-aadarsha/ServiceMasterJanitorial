import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Faq } from "@/components/sections/Faq";
import { Certifications } from "@/components/sections/Certifications";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "FAQ", href: ROUTES.faq }];

export const metadata: Metadata = {
  title: "Commercial Cleaning FAQ — Pricing, Contracts, Insurance",
  description:
    "How commercial cleaning quotes are calculated, whether you are locked into a contract, out-of-hours service, insurance and bonding, and what happens if something is missed.",
  alternates: { canonical: ROUTES.faq },
  openGraph: {
    title: `Frequently Asked Questions | ${SITE.name}`,
    description:
      "Straight answers on pricing, contracts, insurance and what happens when something goes wrong.",
    url: `${SITE.url}${ROUTES.faq}`,
  },
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      {/* FAQPage schema lives here and nowhere else — Google requires the
          markup to sit on the page whose visible content it describes. */}
      <FaqJsonLd />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Questions"
        title="The things buyers actually ask us."
        lead="Pricing, contracts, access, insurance and recourse — answered plainly, with commitments you can hold us to rather than reassurances you cannot check."
      />
      <Faq index="01" />
      <Certifications />
      <CtaBanner />
    </>
  );
}
