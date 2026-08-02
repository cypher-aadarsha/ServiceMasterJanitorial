"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * PAGE TRANSITION
 *
 * `template.tsx` rather than `layout.tsx` is the important detail: a layout
 * instance persists across navigations, so its children would never re-mount
 * and the enter animation would run exactly once. A template re-mounts on every
 * route change, which is what makes this fire per navigation.
 *
 * The transition is deliberately restrained — 8px of rise over 420ms. Now that
 * every nav item is a real route, this motion runs on every single click, and
 * anything longer or larger becomes a tax the user pays repeatedly. It exists
 * to soften the swap and signal "new page", not to perform.
 *
 * Only opacity and transform are animated, both compositor-only, so a
 * navigation costs no layout or paint work.
 *
 * Reduced motion: renders the children directly, with no wrapper and no
 * animation at all.
 *
 * Accessibility note: because content briefly starts at `opacity: 0`, the
 * animation is short and always completes — it never gates content behind an
 * interaction, and it does not delay the LCP element meaningfully at 420ms
 * with no start delay.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
