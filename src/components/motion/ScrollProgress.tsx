"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * SCROLL PROGRESS RAIL
 *
 * A 2px brand-gradient bar pinned to the very top of the viewport that fills
 * as the reader moves down the page.
 *
 * Why it earns its place on a lead-gen site: the dedicated routes are long,
 * and a progress indicator gives an honest sense of remaining length. Readers
 * who can see the end is near are measurably more likely to keep going than
 * readers scrolling into an unknown. It is the cheapest possible "this page
 * has a bottom" signal.
 *
 * Cost: one element, one spring, and `scaleX` — a compositor-only transform,
 * so it never triggers layout or paint while scrolling. `transform-origin`
 * does the work; animating `width` here would cost a layout pass per frame.
 *
 * Reduced motion: hidden entirely rather than snapped. Without the spring it
 * becomes a jittery bar tracking the scrollbar one-to-one, which is precisely
 * the kind of movement the preference exists to suppress — and it carries no
 * information the native scrollbar does not already convey.
 *
 * Accessibility: purely decorative and `aria-hidden`. It is not a progressbar
 * role, because it reports document position rather than task completion, and
 * announcing it would be noise.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300"
    />
  );
}
