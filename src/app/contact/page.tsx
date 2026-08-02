import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Contact } from "@/components/sections/Contact";
import { Certifications } from "@/components/sections/Certifications";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "Contact", href: ROUTES.contact }];

export const metadata: Metadata = {
  title: `Contact — Book a Free Walkthrough in ${SITE.address.city}`,
  description:
    `Book a free 30-minute on-site walkthrough. Written scope and fixed monthly price within two business days, no obligation. Call ${SITE.phone}.`,
  alternates: { canonical: ROUTES.contact },
  openGraph: {
    title: `Contact ${SITE.name}`,
    description:
      "Thirty minutes on site is all it takes to quote accurately. No obligation, no lock-in.",
    url: `${SITE.url}${ROUTES.contact}`,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Get in touch"
        title="Book a free walkthrough."
        lead="Thirty minutes on site is all it takes to quote your building accurately. You will have a written scope and a fixed monthly price within two business days."
      />
      {/* No CTA banner on this page — the form IS the call to action, and a
          second competing CTA below it would only pull attention off the one
          thing this route exists to achieve. */}
      <Contact index="01" />
      <Certifications />
    </>
  );
}
