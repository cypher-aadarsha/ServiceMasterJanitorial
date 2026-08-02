# ServiceMaster Janitorial — Design System & Rationale

A production Next.js homepage for a commercial cleaning company whose single
business objective is **generating qualified facility-management leads**.

---

## 1. Overall design concept

### The strategic problem

Commercial cleaning is a category where every competitor makes the same
unfalsifiable claim. "Quality cleaning you can trust", "attention to detail",
"your satisfaction is our priority" — these are interchangeable, which means
they carry zero information and cannot differentiate anyone.

Worse, they answer the wrong question. The person filling in the quote form is
not the person who notices a dirty floor. They are a **facility manager,
property manager or procurement officer**, and what they actually buy is:

- **Accountability** — someone who is answerable when it goes wrong.
- **Compliance** — documentation that survives an audit or a bid review.
- **The absence of complaints** — cleaning that stops being their problem.

Their real fear is not a dirty building. It is *signing a contract that becomes
their problem*: a vendor who cannot be reached, a scope that was never written
down, an invoice that moves, an inspector asking for records nobody kept.

### The concept: **"The Standard, Measured."**

The whole site is built on one idea — **cleanliness is a measurement, not a
promise** — and it commits to that idea in the visual language, not just the
copy:

| Layer | How the idea shows up |
|---|---|
| Hero visual | A **nightly completion log**, not a stock photo of a mop. The product *is* the evidence. |
| Section headers | A **measure rail** — hairline rule + monospace index (`01 —`), borrowed from architectural drawings and spec sheets. |
| Backgrounds | A faint **blueprint grid**, the floor plan the buyer already works from. |
| Statistics | Every number carries its **denominator** ("rolling 12-month average"). A stat without one is decoration. |
| Process | Every step is **time-boxed** and ends in a **deliverable you receive**. |
| Emerald | Reserved site-wide for exactly one meaning: **verified**. Never decorative. |
| Typography | A monospace face used only for indices, timestamps and units — instrumentation, not decoration. |

### The signature micro-interaction: the Clean Sweep

One ownable motion idea, used consistently: a **specular band wipes diagonally
across a card on hover** — exactly like light crossing a freshly squeegeed
surface. It is the entire brand thesis compressed into 300ms, it costs one
pseudo-element, and no competitor has it. (`.sweep` in `globals.css`.)

### Why this beats the reference approach

The reference site converts on local-service fundamentals: phone number
prominent, form above the fold, before/after proof, reviews. **Those
fundamentals are kept** — they are why local service sites convert. What is
added on top:

| Reference pattern | What this design does instead |
|---|---|
| Stock photo hero | The deliverable itself, rendered as a live artefact |
| "Trusted • Reliable • Professional" | Claims paired with the competitor behaviour they replace |
| Industry list | Each vertical's *specific* failure mode, named |
| Static before/after pair | Draggable comparison — an active gesture, not a passive image |
| Generic FAQ | Objections ordered by what actually kills deals |
| "Get a quote" | "Book a free walkthrough" — a smaller, concrete commitment |

---

## 2. Wireframe description

Single-column scroll, 13 blocks, ordered to the buyer's decision sequence
rather than a template's:

```
┌──────────────────────────────────────────────────────────┐
│ ▸ UTILITY STRIP   service area · hours · phone           │ collapses on scroll
│ ▸ STICKY NAV      logo | links | phone | [Get a quote]   │ glass on scroll
├──────────────────────────────────────────────────────────┤
│   HERO                        7 cols │ 5 cols            │
│   trust chips                        │ ┌──────────────┐  │
│   H1 (city inline)                   │ │ COMPLETION   │  │
│   lead paragraph                     │ │ LOG artefact │  │
│   [Book walkthrough] [Call]          │ │ ✓ ✓ ✓ ✓ ✓    │  │
│   reassurance line                   │ └─ 98.6/100 ───┘  │
├──────────────────────────────────────────────────────────┤
│   CLIENT LOGOS      ← infinite marquee, sector labels →  │
├──────────────────────────────────────────────────────────┤
│   STATS (dark)   1,200+ │ 99.2% │ 4hr │ $2M              │ counters
├──────────────────────────────────────────────────────────┤
│   SERVICES   01   3 × 2 grid, one inverted "featured"    │
├──────────────────────────────────────────────────────────┤
│   INDUSTRIES 02   4 × 2 tiles, pain → proof (mist)       │
├──────────────────────────────────────────────────────────┤
│   WHY US     03   heading 5 cols │ 2×2 contrast cards    │
├──────────────────────────────────────────────────────────┤
│   PROCESS    04 (dark)  sticky heading │ scroll-lit rail │
├──────────────────────────────────────────────────────────┤
│   BEFORE/AFTER 05   ◄──── draggable divider ────►        │
├──────────────────────────────────────────────────────────┤
│   TESTIMONIALS 06   3 quotes, metric-first (mist)        │
├──────────────────────────────────────────────────────────┤
│   CERTIFICATIONS    compact 3 × 2 compliance band        │
├──────────────────────────────────────────────────────────┤
│   FAQ        07   sticky heading │ single-open accordion │
├──────────────────────────────────────────────────────────┤
│   CTA BANNER (brand gradient) — the page's full stop     │
├──────────────────────────────────────────────────────────┤
│   CONTACT    08   form 7 cols │ phone/email/area 5 cols  │
├──────────────────────────────────────────────────────────┤
│   FOOTER (dark)   NAP · services · industries · areas    │
└──────────────────────────────────────────────────────────┘
```

**Surface rhythm:** `white → mist → ink` alternates down the page, so section
boundaries are felt without decorative dividers. The CTA banner is the only
saturated surface on the entire page, which is what lets it read as a full stop.

---

## 3. Visual direction

### Colour system

A four-family scale. Every value is a CSS custom property in `@theme`, so
re-skinning for a franchise territory is a single-file edit.

| Family | Role | Notes |
|---|---|---|
| `brand` 50–950 | ServiceMaster blue, 217° | `600` is the interactive anchor |
| `ink` 800–950 | Deep navy surfaces + type | Never pure black — blue in the darks keeps dark sections on-brand |
| `mist` 50–900 | Cool neutral ("light gray") | Carries a blue cast so it relates to brand |
| `signal` 50–700 | Emerald | **Verified only.** Never decorative |

**Contrast — measured, not assumed.** Every pairing was computed against
WCAG 2.1 before the palette was accepted:

| Pair | Ratio | Level |
|---|---|---|
| `mist-700` on white (body) | 10.35:1 | AAA |
| `mist-500` on white (meta) | 4.76:1 | AA |
| `brand-600` on white (links, buttons) | 6.70:1 | AA |
| white on `brand-600` | 6.70:1 | AA |
| white on `ink-950` | 18.34:1 | AAA |
| `brand-200` on `ink-950` | 12.16:1 | AAA |
| `signal-700` on white | 5.48:1 | AA |

> The original emerald (`#059669`) failed at **3.77:1** for body text. It was
> demoted to non-text use only (icons, dots, rules — where the 3:1 threshold
> applies) and `signal-700` `#047857` introduced for any green **text**. This is
> exactly the kind of failure that ships unnoticed when a palette is chosen by eye.

### Typography — three faces, three jobs

| Face | Role | Why |
|---|---|---|
| **Sora** 400/600/700 | Display | Geometric, low-contrast, wide apertures, faintly technical skeleton. Reads *engineered* rather than friendly — the register a compliance buyer responds to. Uncommon enough on the web that headlines feel bespoke rather than defaulted. |
| **Inter** (variable) | Body | The strongest UI text face available: tall x-height, open counters, screen-tuned hinting. This site carries dense compliance copy at 13–15px, where a display face disintegrates. Deliberately *invisible* — body type must not compete with Sora. |
| **JetBrains Mono** 500 | Spec labels | Section indices, eyebrows, timestamps, stat units only. The monospace rhythm reinforces the measured/logged metaphor, and at tiny tracked-out sizes it costs almost nothing. |

All three self-host via `next/font/google` — no render-blocking round trip to
Google's CDN, no FOUT, one fewer third-party origin on the critical path.

**Fluid scale.** Display sizes use `clamp()` so there are no breakpoint-specific
font classes and no layout jumps. The H1 was explicitly tuned to land at ~37px
on a 390px phone — the earlier 44px minimum pushed the primary CTA below the
fold, which is a direct conversion cost.

### Spacing

4px base unit (Tailwind default). The one thing worth *naming* is section
rhythm, because vertical air is the main carrier of "premium":

```css
--spacing-section:    clamp(4.5rem, 3rem + 7vw, 9rem);
--spacing-section-sm: clamp(3rem, 2rem + 4vw, 5.5rem);
--spacing-gutter:     clamp(1.25rem, 0.75rem + 2vw, 2.5rem);
```

### Elevation, radii, motion curves

- **Shadows** are two-part (tight contact + wide ambient) and tinted with ink
  rather than black, so cards read as *lit* rather than dirty.
- **Radii**: one soft family (`card` 20px, `panel` 28px, `pill`). No mixed
  corner languages.
- **Easing**: expo-out `cubic-bezier(0.16, 1, 0.3, 1)` is the house curve —
  fast departure, long settle. Reads engineered, not bouncy.

**The card treatment** is applied per-section rather than through a shared
`Card` component, because each grid needs a genuinely different variant (the
inverted featured service, the dark-surface timeline, the quote figure). Three
rules hold across all of them:

1. A 1px **`ring`, never a `border`** — rings paint outside the box model, so a
   card can gain a visible edge on hover without shifting its neighbours by a pixel.
2. **Elevation changes on hover, never scale.** Scaling text re-rasterises it and
   looks soft; lifting the shadow reads as expensive and stays crisp.
3. `.sweep` adds the specular wipe — the one flourish the motion budget is spent on.

### Glassmorphism — used exactly twice

Only where there is genuinely content behind the panel to justify a backdrop
filter: the **scrolled header** and the hero's **floating score badge**. There
is a `@supports` fallback to opaque, because unreadable text over a busy
background is worse than a flat panel.

---

## 4. Component library

```
src/
├── app/
│   ├── layout.tsx          fonts, metadata, skip link, providers
│   ├── page.tsx            section composition
│   ├── actions.ts          "use server" — quote submission
│   ├── globals.css         ALL design tokens + signature treatments
│   ├── icon.svg  robots.ts  sitemap.ts
├── components/
│   ├── layout/             Header (sticky+mobile nav), Footer
│   ├── motion/             MotionProvider (LazyMotion + reduced-motion)
│   ├── seo/                JsonLd
│   ├── sections/           13 homepage sections, one file each
│   └── ui/                 Button Chip Container Counter Logo
│                           Reveal Section SectionHeading Accordion
├── content/                site · services · industries · process · proof
└── lib/                    cn · stagger · quote
```

**Content is fully separated from presentation.** Every service, industry, FAQ,
stat and testimonial lives in `src/content/*.ts`. The business can edit copy,
add a service or change the phone number without touching a component — and the
footer's internal links, the JSON-LD `hasOfferCatalog`, the form's facility
dropdown and the FAQ schema all regenerate from those same arrays.

### Primitives

| Component | Responsibility | Key decision |
|---|---|---|
| `Container` | Horizontal rhythm | `narrow` caps prose at ~68ch |
| `Section` | Vertical rhythm + landmark | `aria-labelledby` wires each section to its heading |
| `SectionHeading` | The measure rail | Index + eyebrow + H2 + lead, one component |
| `Button` | CTA | Renders `<a>` with `href`, `<button>` without |
| `Chip` | Verification badge | Emerald's single sanctioned use |
| `Reveal` | Scroll entrance | The only reveal primitive; `once: true` |
| `Counter` | Animated statistic | SSRs the final value; zero React re-renders while tweening |
| `Accordion` | FAQ disclosure | Full WAI-ARIA pattern, single-open |

---

## 5. Homepage structure — per-section detail

> Full UX reasoning, layout, mobile behaviour, animation and accessibility notes
> live as a documentation block at the top of **every** section component. What
> follows is the summary; the code comments are the authoritative version.

### 1 · Sticky navigation `layout/Header.tsx`
- **UX** — Two conversion affordances are always on screen: tap-to-call and the
  quote CTA. The utility strip (area, hours, phone) front-loads "are you real,
  near me, reachable?", then collapses past 80px to give content the viewport.
- **Copy** — `Get a free quote` · `Serving Springfield · Chatham · Sherman + 5 more`
- **Mobile** — Full-screen panel with **focus trap, Escape-to-close, body scroll
  lock, and focus returned to the toggle**. Rendered only when open, so its links
  never sit in the tab order while hidden.
- **Animation** — Transparent → glass on scroll; nav underline grows from centre.
- **A11y** — `aria-expanded` / `aria-controls`; scroll listener is `passive`
  (a non-passive listener on a sticky header is a classic INP regression).

### 2 · Hero `sections/Hero.tsx` + `CompletionLogCard.tsx`
- **UX** — Answers "can I hand this building to you?" with the *product*: a
  nightly completion log. Showing the deliverable beats describing it, and no
  competitor's stock photography can imitate it.
- **Copy** — H1 `Commercial cleaning in Springfield, documented down to the shift.`
- **Layout** — Asymmetric 7/5. Wider text column keeps the headline to 2–3 lines.
- **Mobile** — Single column, text first, artefact after the CTAs — every pixel
  above the primary button is conversion tax.
- **Animation** — Log rows tick in on a 90ms stagger (*the animation is the
  argument*); ±5° pointer-driven tilt, mouse-only, springs not tweens.
- **Performance** — The `<h1>` has **no entrance animation**. It is the LCP
  element; starting it at `opacity: 0` would defer the LCP timestamp.

### 3 · Animated statistics `sections/Stats.tsx`
- **UX** — First dark band. A stat on white is a detail; on deep navy it is a
  statement. Each carries its denominator.
- **Layout** — Hairline rules, not cards — one instrument panel, not four brags.
- **Mobile** — 2×2, not 1×4: preserves the dashboard gestalt, halves the scroll.
- **A11y** — Ticking digits `aria-hidden`; AT gets one settled announcement.
  (Screen readers reciting "one… forty… two hundred…" is this pattern's classic failure.)

### 4 · Client logos `sections/ClientLogos.tsx`
- **UX** — Borrowed credibility placed *before* judgement forms. The **sector
  label** does the real work: a medical FM is scanning for *someone like me*.
- **Animation** — CSS-only marquee on a duplicated track, compositor-driven.
- **A11y** — Pauses on hover **and keyboard focus** (WCAG 2.2.2); duplicate half
  is `aria-hidden` so each client is announced once.

### 5 · Services grid `sections/Services.tsx`
- **UX** — Outcome-first copy. The category failure is describing activities
  ("we vacuum, we dust") when the buyer is purchasing a result.
- **Emphasis** — Exactly one card inverted (highest contract value). Emphasis by
  *inverting* not enlarging keeps the grid clean at 3×2 with no orphan row.
  Two emphasised cards would be zero emphasised cards.
- **Animation** — 70ms stagger capped at 420ms; hover lift + clean sweep.

### 6 · Industry expertise `sections/Industries.tsx`
- **UX** — The highest-leverage section for a multi-vertical firm. Each tile
  names that vertical's *specific* judgement criterion ("Every surface has to
  survive an infection-control audit"). Articulating a buyer's problem better
  than they can is stronger proof of expertise than asserting the expertise.
- **Mobile** — 2-up to 390px: four scroll-rows instead of eight.
- **A11y** — The hover-revealed proof line is always in the DOM; only opacity
  and position transition. Nothing depends on hover to be perceivable.

### 7 · Why choose us `sections/WhyUs.tsx`
- **UX** — Built as explicit **contrast**. Each claim is paired with the
  competitor behaviour it replaces ("Instead of a ticket number and a 48-hour
  callback"). Contrast is what makes a differentiator legible.
- **A11y** — ✗/✓ marks are decorative; the words "Instead of" carry the meaning,
  so the contrast is never encoded in icon or colour alone.

### 8 · Interactive process timeline `sections/ProcessTimeline.tsx`
- **UX** — The real objection is **process anxiety**, not price. Every step is
  time-boxed and ends in something you receive. Making the commitment legible
  is what shrinks it.
- **Interaction** — `useScroll` drives a spring-smoothed gradient fill; each step
  lights as it enters view. The page walks the user through the process while
  they read it — rewarding scrolling rather than demanding a click.
- **Reduced motion** — Rail renders fully filled, every step active. No partial
  or ambiguous state.
- **A11y** — `<ol>`, so the sequence survives styles-off and is announced "1 of 5".

### 9 · Before & after `sections/BeforeAfter.tsx`
- **UX** — Dragging converts a passive scroll into an active gesture, hands the
  user control, and *proves both frames share a viewpoint* — the standard
  suspicion with before/after marketing.
- **Layout** — Fixed aspect ratio reserves the frame before decode → zero CLS.
- **Mobile** — `touch-action: pan-y` so vertical swipe still scrolls the page;
  44px handle (WCAG 2.5.8).
- **Performance** — `clip-path` (GPU-composited), not an animated width.
- **A11y** — Real `role="slider"` with `aria-valuenow`/`min`/`max`/`valuetext`
  and full keyboard support (arrows 2%, Page 10%, Home/End). The focus ring is
  re-expressed on the visible handle rather than the invisible hit area.

### 10 · Testimonials `sections/Testimonials.tsx`
- **UX** — Quotes are accounts of a *problem being solved*, topped by the
  quantified outcome. The metric sits **above** the quote because readers scan
  proof blocks by jumping between bold fragments.
- **No carousel** — carousels hide two-thirds of your social proof behind an
  interaction most users never perform. Three visible quotes beat nine hidden.
- **A11y** — Real `<blockquote>`/`<figcaption>`; decorative quote glyph hidden.

### 11 · Certifications `sections/Certifications.tsx`
- **UX** — Placed where the reader flips from "do I like them?" to "can I get
  them through procurement?". These are not persuasion, they are **permission**.
  Each credential is paired with its practical consequence.
- **Layout** — Low visual volume (dividers, not cards) — high informational value.

### 12 · FAQ `sections/Faq.tsx`
- **UX** — Ordered by what kills deals: pricing → lock-in → disruption →
  insurance → recourse → logistics. Answers concede the concern, then supply a
  **falsifiable** commitment ("month-to-month after 90 days, 30 days' notice").
- **First item open** — an all-closed accordion reads as a wall of buttons.
- **SEO** — Same `FAQS` array feeds the rendered accordion *and* the `FAQPage`
  JSON-LD, so structured data can never drift from visible text.

### 13 · CTA banner `sections/CtaBanner.tsx`
- **UX** — A deliberate interruption that catches the already-convinced. Two
  CTAs split by **urgency** (form for planners, phone for people with a problem
  today). Three friction removers sit directly under the click target.

### 14 · Contact / quote `sections/Contact.tsx` + `app/actions.ts`
- **UX** — Six fields, five required. Square footage and frequency are
  deliberately **not** asked — the walkthrough establishes them better than the
  prospect can guess, and a field requiring thought is a field they abandon on.
  The ask is a *walkthrough*, not a purchase. Phone and email sit beside the
  form, because the highest-intent lead wants to talk now.
- **Mobile** — 48px inputs at 16px text (below 16px, iOS Safari zooms on focus
  and throws the user out of the layout); `inputMode` + `autoComplete` on every
  field so autofill can complete most of it in one tap.
- **A11y** — Real visible labels (never placeholder-as-label); `aria-live`
  status; `aria-describedby` + `aria-invalid` on errors; errors marked by icon
  **and** text, not colour alone. The honeypot is `aria-hidden` + `tabIndex={-1}`
  — a honeypot a screen-reader user can fill in silently blocks real leads.
- **Progressive enhancement** — A Server Action, so the form submits and
  validates **with JavaScript disabled**. Validation is server-authoritative.

### 15 · Footer `layout/Footer.tsx`
- Local-SEO NAP block in real `<address>` semantics; service-area chips as an
  explicit geographic signal; three separately-labelled `<nav>` groups that
  generate from the content arrays, ready to repoint at `/services/*` pages.

---

## 6. Responsive behaviour

Mobile-first, verified at **320 / 360 / 390 / 414 / 768 / 1024 / 1280 / 1440 /
1920** — zero horizontal overflow at every width.

| Breakpoint | Behaviour |
|---|---|
| `< 640` | Single column; 2-up only for stats and industry tiles; mobile nav panel; full-width CTAs |
| `640–1023` | 2-up service/testimonial grids; utility strip still hidden |
| `≥ 1024` | Full 12-column layouts; sticky section headings; utility strip; desktop nav |

Two responsive bugs found and fixed during verification, both of a class that
routinely ships unnoticed:

1. **`left: -9999px` honeypot.** A far-off-screen element widens the document
   box, and mobile Chrome grows the *layout viewport* to contain it — silently
   giving the whole page a horizontal scrollbar. Replaced with clip-based
   `sr-only`.
2. **`hidden sm:inline-flex` on a `Button`.** `Button`'s base class already sets
   `inline-flex`, and Tailwind emits `.inline-flex` *after* `.hidden`. Equal
   specificity → source order wins → the button never hid and overflowed narrow
   viewports. Visibility now lives on a wrapper, and `Button` documents the trap.

Also hardened: every grid carries an explicit `grid-cols-1` base. An implicit
auto track floors at **min-content**, so one `truncate`d child (which sets
`white-space: nowrap`) can widen the track past the viewport.

---

## 7. Animation specification

| Effect | Implementation | Timing |
|---|---|---|
| Scroll reveal | `Reveal`, `whileInView` `once` | 650ms expo-out, 14px travel |
| Card stagger | `stagger(i, 0.07)` | capped at 420ms total |
| Number counters | `animate()` → `textContent` | 1.6s, fires at 50% in view |
| Logo marquee | CSS transform, duplicated track | 46s linear, pauses on hover/focus |
| Process rail | `useScroll` → `useSpring` → `scaleY` | spring, stiffness 90 |
| Card sweep | CSS pseudo-element | 1.1s expo-out |
| Card hover | Elevation + 4px lift | 300ms |
| Hero tilt | `useSpring` on pointer position | ±5°, mouse only |
| Accordion | Height auto + opacity | 340ms |
| Floating orbs | CSS keyframes | 9s ease-in-out |

**Deliberate constraints**

- `once: true` everywhere. Re-animating on every scroll-past reads as cheap and
  punishes re-reading.
- **14px of travel, never more.** Long entrances hurt perceived stability.
- Reveals fire *slightly before* centre, so motion has resolved by the time the
  eye arrives. Animation the user waits on reads as slowness, not polish.
- No motion at the point of conversion — the form animates almost nothing.

**Reduced motion is enforced in three independent layers**, so a component that
forgets to check still cannot leak movement:

1. `MotionConfig reducedMotion="user"` — Framer Motion honours the OS setting.
2. A global CSS kill-switch collapsing all durations to 0.01ms.
3. Per-component `useReducedMotion()` branches that render resolved states
   (timeline fully filled, all steps active — never a dim or partial state).

---

## 8. SEO

**Title** (61 chars) — `Commercial Cleaning Springfield IL | ServiceMaster Janitorial`
**Description** (148 chars) — `Commercial cleaning for offices, medical, schools and warehouses in Springfield. Written scopes, vetted crews, nightly completion logs. Free walkthrough.`

### Heading structure — verified in rendered HTML

```
H1  Commercial cleaning in Springfield, documented down to the shift.   (exactly one)
H2  Trusted across the facilities our crews clean nightly
H2  The numbers we are held to
H2  Everything a facility needs, under one accountable contract.
    H3  Recurring Janitorial … (×6 services)
H2  We clean buildings that get inspected.
    H3  Corporate Offices … (×8 industries)
H2  Most cleaning problems are accountability problems.
    H3  A named supervisor, not a call centre … (×4)
H2  From first call to steady state in about two weeks.
    H3  On-site walkthrough … (×5 steps)
H2  The difference a restoration cycle makes.
H2  What changes after the first ninety days.
H2  Cleared for procurement before we quote.
H2  The things buyers actually ask us.
    H3  How is a commercial cleaning quote calculated? … (×8 FAQs)
H2  Stop chasing your cleaning vendor.
H2  Tell us about your building.
```

No skipped levels; every `<section>` is `aria-labelledby` its own heading.

### Schema.org (`components/seo/JsonLd.tsx`)

Three graphs: `LocalBusiness`/`ProfessionalService` (NAP, geo, opening hours,
8 × `areaServed`, `hasOfferCatalog` of 6 services), `WebSite`, and `FAQPage`
(8 questions generated from the same array the accordion renders).

> **`aggregateRating` and `review` are deliberately omitted.** Both are eligible
> for rich-result stars and both are a manual-action risk unless the ratings are
> real, first-party and verifiably collected. Marking up invented ratings is the
> most common cause of structured-data penalties for local businesses. Add them
> when genuine reviews exist.

### Local SEO recommendations

1. **NAP consistency is the highest-leverage single fix.** The phone, address
   and business name in `content/site.ts` must match the Google Business Profile
   **character for character**, including suite formatting.
2. Claim and fully complete the GBP: primary category *Commercial Cleaning
   Service*, secondaries *Janitorial Service* / *Building Restoration Service*;
   service area set to the same eight municipalities listed in `serviceAreas`.
3. Keep `serviceAreas` **honest and tight**. Padding it with unserviceable
   cities dilutes topical relevance and generates unqualified leads.
4. Build **city + service landing pages** (`/commercial-cleaning/springfield`,
   `/medical-facility-cleaning`) — not doorway duplicates, but pages with
   genuinely local content: named buildings, local compliance, local references.
5. Citations: BBB, Chamber of Commerce, ISSA, Yelp, Apple Business Connect.
6. Solicit GBP reviews that **name the service and the city** in the review body.

### Internal linking strategy

Footer service and industry links currently point at on-page anchors and are
**generated from the content arrays**. When `/services/*` and `/industries/*`
ship, only the `href` values change and the entire link graph updates — every
page inherits it automatically. Planned hub-and-spoke:

```
Homepage (hub)
 ├── /services/{janitorial, disinfection, floor-care, …}   ← from SERVICES
 ├── /industries/{medical, schools, warehouse, …}          ← from INDUSTRIES
 └── /commercial-cleaning/{city}                           ← from serviceAreas
        ↑ every spoke links back to the hub and laterally to its 2 nearest siblings
```

---

## 9. Conversion optimisation

| Lever | Implementation |
|---|---|
| **Trust signals** | Insured/bonded/background-checked chip above the fold; certifications band; `$2M` liability stat; "certificates on request" in the footer |
| **Social proof** | Client marquee with sector labels; three metric-first testimonials; "references available on request" |
| **Strong CTAs** | One primary verb repeated site-wide — *Book a free walkthrough*. Never competing with a second primary action |
| **Quote optimisation** | 6 fields; walkthrough not purchase; expectation set before the button ("we'll call within one business day") |
| **Multiple exits** | Header phone, hero phone, CTA banner phone, contact panel, footer phone — 7 tap-to-call links total |
| **Friction removal** | "No obligation · No lock-in · Fixed monthly price" directly beneath every primary CTA |

### On scarcity — a deliberate refusal

The brief asks for "scarcity where appropriate". A fake counter ("3 slots left
this week") is trivially disproved by reloading the page, and losing credibility
above the fold costs more than the urgency gains — especially with a buyer whose
entire job is evaluating vendor claims.

The site instead uses **honest availability**: *"Walkthroughs typically booked
within 3 business days."* It creates real timing pressure, it is verifiable, and
it survives contact with a sceptical procurement officer. If genuine capacity
limits exist, replace it with the real number and keep it accurate.

---

## 10. Performance

Measured against the local production build (`next build && next start`):

| Metric | Result |
|---|---|
| Build output | **Fully static prerender** — all 5 routes `○ (Static)` |
| **CLS** | **0** |
| FCP | 240ms (local, unthrottled) |
| HTML (gzip) | 43 KB |
| CSS (gzip) | ~8 KB, single file |
| JS (gzip) | **209 KB** across 8 chunks |
| Fonts | 3 self-hosted woff2, `display: swap`, preloaded |
| Requests | 13 total |

**Optimisations applied**

- **`LazyMotion` + `m` + `domAnimation`, with `strict`.** Importing `motion.div`
  pulls in drag, layout projection and SVG morphing whether used or not. This
  cut JS from **246 KB → 209 KB gzip (−15%)**. `strict` makes any `motion.*`
  usage *throw*, because the optimisation silently regresses the moment one
  component imports the wrong symbol.
- LCP element (`<h1>`) is server-rendered with no entrance animation.
- Counters SSR their **final** value (crawlers and no-JS users see the real
  number) and rewind pre-paint via a layout effect; the tween writes to
  `textContent`, costing **zero React re-renders**.
- Aspect ratios reserved on all media → CLS 0.
- Marquee and sweep run as compositor-only transforms.
- `optimizePackageImports` for `react-icons`. **Not** for `framer-motion` — its
  `motion` export is a Proxy and barrel-optimising it breaks `motion[tag]`.
- Showcase imagery is hand-authored SVG: full-bleed, resolution-independent,
  ~2 KB each.
- Scroll listeners are `passive`.

### Honest caveat

209 KB of gzipped JS is respectable for an animated React page but is **not**
the floor. If Lighthouse mobile scores must clear 95 on throttled 4G, the next
step is replacing `Reveal`'s Framer usage with a ~40-line IntersectionObserver +
CSS implementation, which would let Framer Motion load only for the four
components that genuinely need it. That was not done here because the brief
specified Framer Motion as the animation layer.

I did **not** run Lighthouse itself — no Chrome-with-Lighthouse in this
environment — so the 95+ target is engineered for, not verified. Verify with
`npx lighthouse` against a deployed URL before making that claim publicly.

---

## 11. Verification performed

Automated against the production build in headless Chromium:

- **Layout** — zero horizontal overflow at 9 viewport widths (320→1920).
- **Forms** — empty submit produces the error banner, 5 `aria-invalid` fields
  and correct `aria-describedby` wiring; valid submit produces the success
  state; no JS errors through the flow.
- **Mobile nav** — opens, sets `aria-expanded`, locks body scroll, closes on
  Escape, releases the lock, **returns focus to the toggle**.
- **Accordion** — 8 toggles, first open by default, single-open enforced,
  panels carry `role="region"`.
- **Before/after** — pointer drag updates `aria-valuenow` (→22); `End`→100,
  `Home`→0.
- **Reduced motion** — no element stuck mid-fade; marquee neutralised.
- **Reveals** — 97 elements across 6 sections all resolve to full opacity
  (guards against the classic `LazyMotion` failure of content stuck invisible).
- **Semantics** — exactly one `<h1>`, no skipped heading levels, all form
  controls labelled, JSON-LD parses with 3 graph nodes.
- Type-checks clean (`tsc --noEmit`); production build succeeds.

---

## 12. ⚠️ Before this goes live

**All proof content in `src/content/proof.ts` is placeholder and marked as
such in-file.** Statistics, client names, testimonials and certifications are
illustrative. Publishing invented figures or credentials is false advertising,
and for the medical and government verticals this site targets it is
procurement-disqualifying — and actionable under FTC endorsement rules.

Required before launch:

1. Replace every `PLACEHOLDER` value: NAP, geo coordinates, service areas,
   statistics, client logos, testimonials (with written consent), certifications
   (only credentials currently held, with live expiry dates).
2. **Wire up lead delivery.** `app/actions.ts` validates but does **not** yet
   send anywhere — the `TODO(launch)` block is marked. Shipping as-is silently
   drops every enquiry.
3. Replace the before/after SVGs with real photography from the same camera
   position (the component takes image props; the caption currently reads
   "Illustrative render" and must be updated).
4. Replace the logo if operating under a **ServiceMaster franchise licence** —
   the mark here is original, and franchise agreements almost always require
   franchisor-supplied brand assets.
5. Add a privacy policy and link it from the form.
6. Run Lighthouse against the deployed URL; validate schema in Google's Rich
   Results Test.

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```
