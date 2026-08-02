import type { Metadata } from "next";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ROUTES, SITE } from "@/content/site";

const CRUMBS: Crumb[] = [{ label: "Process", href: ROUTES.process }];

export const metadata: Metadata = {
  title: "Our Process — From Walkthrough to Steady State in Two Weeks",
  description:
    "Five time-boxed steps: on-site walkthrough, fixed-price scope, crew onboarding, nightly logging and quarterly scored inspections. No lock-in contract.",
  alternates: { canonical: ROUTES.process },
  openGraph: {
    title: `How We Work | ${SITE.name}`,
    description:
      "Every step is time-boxed and ends in something you receive. Nothing starts until the scope is signed.",
    url: `${SITE.url}${ROUTES.process}`,
  },
};

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={CRUMBS} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="How it works"
        title="Exactly what happens after you get in touch."
        lead="No pressure, no lock-in, and nothing begins until you have signed a scope you have read. Here is the whole path, step by step."
      />
      <ProcessTimeline index="01" />
      {/* The FAQ is repeated here deliberately: process anxiety and contract
          questions are the same objection, and answering them on the page
          where the commitment is being explained closes the loop rather than
          sending the reader off to another route mid-doubt. */}
      <Faq index="02" />
      <CtaBanner />
    </>
  );
}
