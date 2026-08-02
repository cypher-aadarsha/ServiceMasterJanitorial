import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/content/site";
import "./globals.css";

/* ===========================================================================
   TYPOGRAPHY — three families, three jobs
   ---------------------------------------------------------------------------
   SORA (display). Geometric, low-contrast, with unusually wide apertures and a
   slightly technical skeleton. It reads as *engineered* rather than friendly,
   which is exactly the register a compliance-minded facilities buyer responds
   to — and it is uncommon enough on the web that the headlines feel bespoke
   instead of defaulted. Variable weight 400–700.

   INTER (body). The strongest UI text face available: tall x-height, open
   counters, and hinting tuned for screens at small sizes. This site carries
   dense compliance copy — scopes, insurance detail, FAQ answers — and Inter
   stays legible at 13–15px where a display face would fall apart. It is also
   deliberately *invisible*: body type should not compete with Sora.

   JETBRAINS MONO (spec labels). Used only for section indices, eyebrows,
   timestamps and stat units. The monospace rhythm reinforces the whole design
   metaphor — measured, logged, documented — and because it appears exclusively
   at tiny tracked-out sizes, it costs almost nothing in glyph coverage.

   All three load via `next/font/google`, which self-hosts the files at build
   time. That removes the render-blocking round-trip to Google's CDN, kills the
   FOUT, and eliminates a third-party origin from the critical path.
   `display: swap` guarantees text paints immediately in the fallback.
   =========================================================================== */

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono-spec",
  display: "swap",
});

/* ===========================================================================
   SEO
   ---------------------------------------------------------------------------
   TITLE (61 chars): leads with the head term, carries city + state for local
   intent, and closes with the brand. Google truncates on pixel width rather
   than character count (~600px); at this length the brand suffix is the only
   part at risk, which is the right thing to lose last.

   DESCRIPTION (148 chars): not a ranking factor, but the click-through pitch,
   and kept under the ~155-char truncation point so it renders whole. Names the
   verticals (so the searcher self-identifies), states the differentiator, and
   ends with a low-friction call to action.
   =========================================================================== */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Commercial Cleaning ${SITE.address.city} ${SITE.address.region} | ServiceMaster Janitorial`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Commercial cleaning for offices, medical, schools and warehouses in " +
    `${SITE.address.city}. Written scopes, vetted crews, nightly completion logs. Free walkthrough.`,
  applicationName: SITE.name,
  keywords: [
    "commercial cleaning",
    "janitorial services",
    "office cleaning",
    "medical facility cleaning",
    "school cleaning",
    "warehouse cleaning",
    "commercial cleaning company",
    `commercial cleaning ${SITE.address.city}`,
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `Commercial Cleaning in ${SITE.address.city} | ServiceMaster Janitorial`,
    description:
      "Offices, medical facilities, schools, warehouses and government buildings — cleaned to a written scope, logged every shift. Book a free walkthrough.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Commercial Cleaning in ${SITE.address.city} | ServiceMaster Janitorial`,
    description:
      "Written scopes, vetted crews, nightly completion logs. Book a free 30-minute walkthrough.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Commercial Cleaning Services",
};

export const viewport: Viewport = {
  // Never set `maximum-scale` or `user-scalable=no`: blocking pinch-zoom is a
  // WCAG 1.4.4 failure and one of the most common accessibility defects on
  // marketing sites.
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08142b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      // Suppresses the hydration warning caused by browser extensions that
      // mutate <html> before React attaches. Scoped to this element only.
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* First tab stop on every page — WCAG 2.4.1 bypass block. */}
        <a
          href="#main"
          className="skip-link rounded-pill bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-lift"
        >
          Skip to main content
        </a>

        <MotionProvider>{children}</MotionProvider>

        <JsonLd />
      </body>
    </html>
  );
}
