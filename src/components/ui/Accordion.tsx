"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

/**
 * FAQ accordion.
 *
 * Built on real `<button aria-expanded>` + region semantics rather than
 * `<details>`, because we need height animation and a controlled single-open
 * behaviour. Every requirement of the WAI-ARIA disclosure pattern is met:
 * button toggles, `aria-controls` points at the panel, `aria-expanded`
 * reflects state, and the panel is removed from the tree when closed so
 * screen-reader users never encounter hidden answers.
 *
 * Single-open (rather than multi-open) is intentional: it keeps the section
 * height stable, so a user opening question six does not send question one
 * off-screen.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <div className="divide-y divide-mist-200 border-y border-mist-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 py-5 text-left",
                  "transition-colors duration-200 hover:text-brand-700",
                  isOpen ? "text-brand-700" : "text-ink-950",
                )}
              >
                <span className="font-display text-base font-semibold sm:text-lg">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ring-1 transition-all duration-300 ease-out-expo",
                    isOpen
                      ? "rotate-45 bg-brand-600 text-white ring-brand-600"
                      : "bg-white text-mist-500 ring-mist-200",
                  )}
                >
                  <HiPlus className="size-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pr-10 text-[0.9375rem] leading-relaxed text-mist-600">
                    {item.a}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
