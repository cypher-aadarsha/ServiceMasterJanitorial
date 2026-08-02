import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Contact } from "@/components/sections/Contact";

/**
 * HOMEPAGE
 *
 * Section order follows the buyer's decision sequence, not a template's:
 *
 *   HERO            What is this, and can it solve my problem?   → the artefact
 *   CLIENT LOGOS    Do people like me use them?                  → borrowed trust
 *   STATS           Is there substance behind it?                → measurement
 *   SERVICES        Can they cover everything I need?            → scope
 *   INDUSTRIES      Do they understand MY building?              → relevance
 *   WHY US          Why them and not the incumbent?              → contrast
 *   PROCESS         What am I actually signing up for?           → de-risking
 *   BEFORE/AFTER    Show me it works.                            → evidence
 *   TESTIMONIALS    What changed for someone like me?            → outcomes
 *   CERTIFICATIONS  Will this clear procurement?                 → permission
 *   FAQ             My remaining objections.                     → closing
 *   CTA BANNER      For the already-convinced.                   → early exit
 *   CONTACT         The conversion.                              → the ask
 *
 * Trust is front-loaded (logos and hard numbers inside the first two screens)
 * because a local-service visitor decides whether a company is credible long
 * before they finish reading. Objection handling is back-loaded, because
 * objections only form once someone is interested enough to have them.
 *
 * Surface tone alternates white → mist → ink to give the scroll a rhythm and
 * to mark section boundaries without relying on decorative dividers. The only
 * saturated surface on the page is the CTA banner, so it reads as the page's
 * single visual full stop.
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <ClientLogos />
        <Stats />
        <Services />
        <Industries />
        <WhyUs />
        <ProcessTimeline />
        <BeforeAfter />
        <Testimonials />
        <Certifications />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
