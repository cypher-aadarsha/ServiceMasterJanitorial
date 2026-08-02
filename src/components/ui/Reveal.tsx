"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The single scroll-reveal primitive for the whole site.
 *
 * Deliberate constraints:
 *  - `once: true` — content animates in one time. Elements that re-animate on
 *    every scroll-past are the fastest way to make a premium site feel cheap,
 *    and they punish anyone re-reading the page.
 *  - `amount: 0.25` with a negative bottom margin — the reveal fires slightly
 *    *before* the element is centred, so by the time the user's eye arrives
 *    the motion has already resolved. Animation the user has to wait on reads
 *    as slowness, not polish.
 *  - 14px of travel, never more. Long entrance distances cause layout-shift
 *    perception and hurt the CLS budget on slower devices.
 *  - Under `prefers-reduced-motion` the element renders statically — no
 *    opacity fade either, because a fade still animates.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  // `m` (not `motion`) — the whole tree runs under `LazyMotion strict`, which
  // throws on `motion.*` to stop the full feature bundle creeping back in.
  const MotionTag = m[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// NOTE: the `stagger()` helper deliberately lives in `@/lib/stagger`, not here.
// Every export of a "use client" module becomes a client reference across the
// RSC boundary, so a server component calling it from this file would crash at
// prerender. See that module for the full explanation.
