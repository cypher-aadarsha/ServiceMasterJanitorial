"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** `useLayoutEffect` warns when run during SSR; fall back to a no-op there. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Count-up statistic.
 *
 * Why animate a number at all: a value that resolves in front of the user is
 * read as *measured* rather than *claimed*. It buys roughly a second of extra
 * dwell on the proof block, which is exactly where we want attention.
 *
 * SSR: the markup renders the FINAL value, so crawlers and no-JS visitors get
 * the real number. A layout effect rewinds it to zero before the first browser
 * paint — running pre-paint is what prevents a visible flash of the end value.
 *
 * Accessibility: the ticking digits are `aria-hidden` and assistive tech gets
 * one stable sentence instead. Screen readers announcing "one… forty… two
 * hundred…" is the classic failure mode of this pattern.
 *
 * Performance: the tween writes straight to `textContent`, so 1.6s of
 * animation costs zero React re-renders.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  srLabel,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  srLabel: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (reduced || done) return;
    const node = ref.current;
    if (node) node.textContent = format(0, decimals);
  }, [reduced, done, decimals]);

  useEffect(() => {
    if (!inView || reduced || done) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest, decimals);
      },
      onComplete: () => setDone(true),
    });

    return () => controls.stop();
  }, [inView, reduced, done, value, decimals]);

  const settled = `${prefix}${format(value, decimals)}${suffix}`;

  return (
    <span className="tabular">
      <span aria-hidden="true">
        {prefix}
        <span ref={ref}>{format(value, decimals)}</span>
        {suffix}
      </span>
      <span className="sr-only">
        {settled} {srLabel}
      </span>
    </span>
  );
}
