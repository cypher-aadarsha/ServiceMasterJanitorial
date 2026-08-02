"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion contract + bundle strategy.
 *
 * REDUCED MOTION
 * `reducedMotion="user"` makes Framer Motion honour the OS-level
 * `prefers-reduced-motion` setting for every animation in the tree — transforms
 * and scale are dropped, opacity is kept. Combined with the CSS kill-switch in
 * `globals.css`, a user who has asked for less motion cannot receive any, even
 * from a component that forgot to check.
 *
 * BUNDLE SIZE
 * `LazyMotion` + the `m` component is the reason this page is not paying full
 * price for the animation library. Importing `motion.div` pulls in every
 * feature — drag, layout projection, SVG path morphing — whether or not the
 * page uses them. `m` ships a minimal component and `domAnimation` loads only
 * the feature set this site actually needs: enter/exit animations, viewport
 * detection and hover/tap gestures.
 *
 * `strict` turns the tree-shaking into a compile-time-ish guarantee: any
 * `motion.*` component rendered underneath throws instead of silently
 * re-introducing the full bundle. That is deliberate — this optimisation
 * regresses the moment one component imports the wrong symbol, and a loud
 * failure is the only reliable way to keep it honest.
 *
 * NOTE: `domAnimation` intentionally excludes layout animations (`layout`,
 * `layoutId`) and drag. Nothing on this page uses them; the before/after
 * slider is hand-built on pointer events precisely so it does not drag in the
 * projection engine for one control.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
