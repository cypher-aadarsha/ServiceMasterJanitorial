"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { HiCheck, HiOutlineClock, HiOutlineUserCircle } from "react-icons/hi2";

/** PLACEHOLDER — illustrative log entry. Replace with a redacted sample from a
 *  real account (with the client's written permission) or with clearly
 *  generic labels. Never publish a genuine client's site data. */
const LOG = {
  site: "Level 2 — East Wing",
  date: "Completed 11:48 PM",
  score: "98.6",
  supervisor: "K. Osei",
  tasks: [
    { label: "Touchpoint disinfection — 41 points", time: "10:12p" },
    { label: "Restrooms serviced & restocked", time: "10:47p" },
    { label: "Waste & recycling removed", time: "11:05p" },
    { label: "Hard floors machine-scrubbed", time: "11:31p" },
    { label: "Entry glass & lobby detail", time: "11:46p" },
  ],
};

/**
 * HERO ARTEFACT — the nightly completion log.
 *
 * This is the design's central persuasive move. Instead of a stock photo, the
 * hero shows the thing the customer is actually buying: evidence. Every row
 * carries a timestamp, because a checklist without times is a claim while a
 * checklist with times is a record.
 *
 * Motion
 * ------
 *  - Rows tick in on a 90ms stagger, so the card "completes" in front of the
 *    user. The animation is the argument.
 *  - A ±5° pointer-driven tilt gives the card physical presence. It is capped
 *    low deliberately: beyond about 8° the text edges alias and the effect
 *    starts to feel like a gimmick rather than depth.
 *  - Springs, not tweens, on the tilt — the card should feel weighted, and a
 *    linear follow reads as sticky.
 *
 * Interaction safety
 * ------------------
 * The tilt is bound to `pointermove` and ignores coarse pointers, so it never
 * fires on touch (where it would just fight the scroll). Under
 * `prefers-reduced-motion` both the stagger and the tilt are dropped entirely
 * and the card renders in its resolved state.
 *
 * Accessibility
 * -------------
 * The card is decorative-but-informative: it is a real list, marked up as a
 * real list, readable in DOM order. It carries no interactive controls, so it
 * adds nothing to the tab order and cannot trap keyboard users.
 */
export function CompletionLogCard() {
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), spring);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="relative [perspective:1400px]">
      <m.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        // Extra bottom padding is not decorative: it reserves the area the
        // floating score badge overlaps, so the badge never lands on the
        // supervisor row. Without it the two collide at every width.
        className="rounded-panel bg-white p-6 pb-20 shadow-lift ring-1 ring-mist-200 sm:p-7 sm:pb-24"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-brand-700">
              Nightly completion log
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-ink-950">{LOG.site}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-signal-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-signal-700 ring-1 ring-signal-500/25">
            <span className="size-1.5 rounded-full bg-signal-500" aria-hidden="true" />
            Verified
          </span>
        </div>

        {/* Tasks */}
        <ul className="mt-6 space-y-1">
          {LOG.tasks.map((task, i) => (
            <m.li
              key={task.label}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 + i * 0.09 }}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-mist-50"
            >
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-full bg-signal-500/12 text-signal-600 ring-1 ring-signal-500/30"
              >
                <HiCheck className="size-3" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-mist-700">{task.label}</span>
              <span className="tabular shrink-0 font-mono text-[0.6875rem] text-mist-400">
                {task.time}
              </span>
            </m.li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-mist-200 pt-5">
          <div className="flex items-center gap-2 text-sm text-mist-600">
            <HiOutlineUserCircle aria-hidden="true" className="size-5 text-brand-600" />
            <span>
              Supervisor <span className="font-medium text-ink-950">{LOG.supervisor}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-mist-500">
            <HiOutlineClock aria-hidden="true" className="size-4" />
            <span>{LOG.date}</span>
          </div>
        </div>
      </m.div>

      {/* Floating score badge — the second and final use of glass on the site.
          Offset outside the card's corner so it reads as a separate plane. */}
      <m.div
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
        className="glass absolute -bottom-6 -left-4 rounded-2xl px-5 py-4 shadow-lift ring-1 ring-white/60 sm:-left-8"
      >
        <p className="font-mono text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-mist-500">
          Quarterly inspection
        </p>
        <p className="tabular mt-1 font-display text-2xl font-bold text-ink-950">
          {LOG.score}
          <span className="text-base text-mist-400">/100</span>
        </p>
      </m.div>
    </div>
  );
}
