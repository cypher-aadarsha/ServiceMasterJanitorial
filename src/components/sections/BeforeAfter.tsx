"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MIN = 0;
const MAX = 100;

/**
 * BEFORE & AFTER SHOWCASE
 *
 * UX reasoning
 * ------------
 * Cleaning is one of the few services where the outcome is genuinely visual,
 * so a comparison is the single most persuasive asset available. But a static
 * side-by-side pair is passive and gets skimmed.
 *
 * Making the user drag the divider does three things a static pair cannot:
 * it converts a passive scroll into an active gesture (which measurably
 * increases recall and time-on-section), it hands them control so the result
 * feels discovered rather than asserted, and it proves both frames are the
 * same viewpoint — the standard suspicion with before/after marketing is that
 * the two photos are of different places.
 *
 * The caption states the scope and the elapsed time. "Before/after" without a
 * timeframe invites the reader to assume it took a week.
 *
 * Layout
 * ------
 * Wide single panel at a fixed 4:3 aspect ratio, so the frame is reserved in
 * layout before either image decodes — zero CLS regardless of network speed.
 * Result chips sit below rather than overlaying, keeping the image clean.
 *
 * Mobile
 * ------
 * Full-bleed within the gutter. `touch-action: pan-y` on the panel means a
 * vertical swipe still scrolls the page while a horizontal drag moves the
 * divider — without it, the control hijacks scrolling and the user is trapped.
 * The handle is 44px, meeting the WCAG 2.5.8 target-size minimum.
 *
 * Animation
 * ---------
 * The divider tracks the pointer with no easing — a lagging handle feels
 * broken on a direct-manipulation control. All other motion in the section is
 * the standard reveal.
 *
 * Accessibility
 * -------------
 * This is a real `role="slider"` with `aria-valuenow`/`min`/`max` and full
 * keyboard support: arrows move 2%, Page keys 10%, Home/End jump to the ends.
 * Both images carry descriptive alt text and are readable independently of the
 * slider position, so nothing is locked behind the gesture.
 */
/**
 * `index` is a prop so this section can be renumbered when it is composed
 * onto a dedicated route alongside different siblings. The measure-rail index
 * describes position within the CURRENT page, so a hard-coded value would lie
 * on every page except the homepage.
 */
export function BeforeAfter({ index = "05" }: { index?: string } = {}) {
  const [pos, setPos] = useState(52);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(MAX, Math.max(MIN, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "PageUp" || e.key === "PageDown" ? 10 : 2;
    let next: number | null = null;

    if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageDown") next = pos - step;
    if (e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "PageUp") next = pos + step;
    if (e.key === "Home") next = MIN;
    if (e.key === "End") next = MAX;

    if (next === null) return;
    e.preventDefault();
    setPos(Math.min(MAX, Math.max(MIN, next)));
  };

  return (
    <Section id="results" labelledBy="results-heading">
      <Container size="wide">
        <SectionHeading
          index={index}
          eyebrow="Before & after"
          id="results-heading"
          align="center"
          title="The difference a restoration cycle makes."
          lead="Drag the handle to compare a lobby floor before and after a strip-and-seal restoration cycle — the same viewpoint, one overnight service apart."
        />

        <Reveal delay={0.1}>
          <figure className="mt-14">
            <div
              ref={frameRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-panel bg-mist-100 shadow-lift ring-1 ring-mist-200 sm:aspect-[16/9]"
            >
              {/* AFTER — the base layer, fully painted. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/showcase/lobby-after.svg"
                alt="The same lobby floor after service: the finish is restored, tile lines are crisp and the ceiling light reflects cleanly off the surface."
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 size-full object-cover"
              />

              {/* BEFORE — clipped to the divider position. `clip-path` is
                  composited on the GPU, so dragging stays at 60fps where a
                  width-animated wrapper would trigger layout on every frame. */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/showcase/lobby-before.svg"
                  alt="The lobby floor before service: the finish is dull and flat, with a worn traffic lane, staining and dried mop streaks."
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>

              {/* Corner labels */}
              <span className="pointer-events-none absolute left-4 top-4 rounded-pill bg-ink-950/75 px-3 py-1.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                Before
              </span>
              <span className="pointer-events-none absolute right-4 top-4 rounded-pill bg-brand-600/90 px-3 py-1.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                After
              </span>

              {/* Divider + handle */}
              <div
                role="slider"
                tabIndex={0}
                aria-label="Reveal more of the before or after image"
                aria-valuemin={MIN}
                aria-valuemax={MAX}
                aria-valuenow={Math.round(pos)}
                aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
                onKeyDown={onKeyDown}
                className="group absolute inset-y-0 z-10 -ml-6 w-12 cursor-ew-resize touch-pan-y focus-visible:outline-none"
                style={{ left: `${pos}%` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(8_20_43/0.12)]"
                />
                <span
                  aria-hidden="true"
                  // The outline is suppressed on the wide invisible hit-area
                  // and re-expressed here as a ring on the visible handle, so
                  // keyboard focus is clearly indicated on the control the
                  // user actually sees rather than on a 48px transparent strip.
                  className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-lift ring-1 ring-mist-200 transition-[transform,box-shadow] duration-200 ease-out-expo group-focus-visible:ring-4 group-focus-visible:ring-brand-600 motion-safe:group-active:scale-95"
                >
                  <HiOutlineArrowsRightLeft className="size-5" />
                </span>
              </div>
            </div>

            <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-mist-500">
              <span className="font-medium text-ink-950">
                Strip, seal and burnish — 4,200 sq ft
              </span>
              <span aria-hidden="true" className="text-mist-300">
                ·
              </span>
              <span>Completed overnight, open for business at 8am</span>
              <span aria-hidden="true" className="text-mist-300">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-mist-400">
                Illustrative render
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
