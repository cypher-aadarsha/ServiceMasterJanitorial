"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * The measure rail's hairline, drawn top-to-bottom as the heading enters view.
 *
 * This is the site's smallest and most-repeated piece of motion, and it carries
 * the brand idea: a measuring line being struck. Because it plays once per
 * section, it gives the page a consistent rhythm without ever being the thing
 * you notice.
 *
 * Why a component rather than a CSS animation: a CSS `animation` fires on
 * mount, so every rule on the page would draw while still far below the fold
 * and be finished before anyone saw it. `whileInView` ties the draw to the
 * moment the heading actually arrives.
 *
 * `scaleY` with a top origin is compositor-only — no layout, no paint.
 */
export function DrawRule({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span
        aria-hidden="true"
        className={cn("measure-rule h-8 w-px shrink-0", tone === "dark" && "opacity-80", className)}
      />
    );
  }

  return (
    <m.span
      aria-hidden="true"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "measure-rule h-8 w-px shrink-0 origin-top",
        tone === "dark" && "opacity-80",
        className,
      )}
    />
  );
}
