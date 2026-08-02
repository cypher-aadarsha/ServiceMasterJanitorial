# ServiceMaster Janitorial

Marketing homepage for a commercial cleaning company. Built to generate
qualified facility-management leads.

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion**

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (fully static) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Where things live

```
src/app/         layout, page, globals.css (all design tokens), server action, robots/sitemap
src/components/  layout · sections · ui · motion · seo
src/content/     ← edit copy here, not in components
src/lib/         small shared helpers
public/showcase/ before/after imagery
```

**To change copy, prices, services, industries, FAQs or contact details, edit
`src/content/*.ts`.** Those arrays drive the rendered sections, the footer's
internal links, the quote form's dropdown and the JSON-LD structured data, so
everything stays in sync automatically.

## Design rationale

[`DESIGN.md`](./DESIGN.md) documents the design concept, colour and type
systems with measured WCAG contrast ratios, per-section UX reasoning, the
animation specification, SEO and local-SEO strategy, conversion decisions,
performance results and the verification that was run.

Each section component also carries its full reasoning as a documentation block
at the top of the file.

## Routes

Every navigation item is its own page: `/`, `/services`, `/industries`,
`/about`, `/process`, `/results`, `/faq`, `/contact`. All are statically
prerendered with their own title, meta description, canonical, `<h1>` and
`BreadcrumbList` schema.

`ROUTES` in `src/content/site.ts` is the single source of truth — it drives the
header, mobile menu, footer and sitemap, so adding a page cannot leave a stale
link behind.

## ⚠️ Before deploying

1. **Add the official ServiceMaster Clean logo** — see
   [`public/brand/README.md`](./public/brand/README.md). The trademark is
   deliberately not bundled and was not redrawn; the site shows a typographic
   placeholder until the approved artwork is added.
2. **Verify the brand colours** in `src/app/globals.css` against the franchisor
   brand book, then re-run the contrast check. The green ramp is an unverified
   approximation.
3. **Replace all placeholder proof** in `src/content/proof.ts` and the NAP data
   in `src/content/site.ts` — statistics, client names, testimonials and
   certifications are illustrative only.
4. **Wire up lead delivery** — `src/app/actions.ts` validates submissions but
   does not yet send them anywhere (see the `TODO(launch)` block). As shipped,
   enquiries are silently dropped.

See the full pre-launch checklist in [`DESIGN.md`](./DESIGN.md#12--before-this-goes-live).
