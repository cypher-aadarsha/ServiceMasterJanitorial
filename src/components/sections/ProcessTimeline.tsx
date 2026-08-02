"use client";

import { m, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { HiOutlineClock, HiOutlineDocumentCheck } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS, type ProcessStep } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * INTERACTIVE PROCESS TIMELINE
 *
 * UX reasoning
 * ------------
 * The real objection blocking a commercial cleaning enquiry is not price — it
 * is process anxiety. "If I fill this in, do I get a pushy salesperson, a
 * three-year contract and six weeks of chaos?" Every step below is therefore
 * time-boxed and paired with a concrete deliverable, so the prospect can see
 * the entire path from first contact to steady state before committing to
 * anything. Making the commitment legible is what shrinks it.
 *
 * The scroll-linked progress rail is the interaction. As the user scrolls, a
 * brand gradient fills the timeline and each step lights up as it becomes
 * active — the page literally walks them through the process while they read
 * it. It rewards scrolling rather than demanding a click, which is the right
 * trade on a page whose job is to get someone to the form at the bottom.
 *
 * Layout
 * ------
 * Left rail with node markers, content offset to its right. On desktop the
 * heading sits in a sticky column beside the timeline so the section context
 * stays visible through all five steps.
 *
 * Mobile
 * ------
 * The sticky heading releases and stacks above. The rail moves flush left with
 * a tighter offset, and duration/deliverable chips wrap beneath the body copy
 * instead of sitting inline.
 *
 * Animation
 * ---------
 * `useScroll` drives the fill via a spring, so the rail eases rather than
 * tracking the scrollbar rigidly — rigid tracking feels mechanical and betrays
 * the effect. Active-state detection uses per-step `useInView` rather than
 * scroll maths, which stays correct regardless of viewport height or how much
 * each step's copy wraps.
 *
 * Reduced motion
 * --------------
 * The rail renders fully filled and every step renders in its active state.
 * There is no partial or ambiguous state — a reduced-motion user sees the
 * finished, most legible version of the graphic.
 *
 * Accessibility
 * -------------
 * Marked up as an ordered list, so the sequence survives with styles off and
 * is announced as "1 of 5" by screen readers. The rail is decorative and
 * hidden. Active state is conveyed by opacity *and* by the filled node marker,
 * never by colour alone.
 */
/**
 * `index` is a prop so this section can be renumbered when it is composed
 * onto a dedicated route alongside different siblings. The measure-rail index
 * describes position within the CURRENT page, so a hard-coded value would lie
 * on every page except the homepage.
 */
export function ProcessTimeline({ index = "04" }: { index?: string } = {}) {
  const trackRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Start filling when the list top reaches 75% down the viewport; finish
    // when its bottom passes the 55% line — keeps the fill in step with where
    // the eye actually is, rather than with the raw element bounds.
    offset: ["start 0.75", "end 0.55"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scaleY = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <Section id="process" tone="ink" labelledBy="process-heading" className="overflow-hidden">
      <div aria-hidden="true" className="bg-blueprint-dark pointer-events-none absolute inset-0" />

      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index={index}
                eyebrow="How it works"
                id="process-heading"
                tone="dark"
                title="From first call to steady state in about two weeks."
                lead="Five steps, each time-boxed, each ending in something you can hold. No pressure, no lock-in, and nothing starts until the scope is signed."
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol ref={trackRef} className="relative">
              {/* Rail: unfilled base + scroll-driven fill. */}
              <span
                aria-hidden="true"
                className="absolute left-[15px] top-2 bottom-2 w-px bg-white/12 sm:left-[19px]"
              />
              <m.span
                aria-hidden="true"
                style={{ scaleY }}
                className="measure-rule absolute left-[15px] top-2 bottom-2 w-px origin-top sm:left-[19px]"
              />

              {PROCESS_STEPS.map((step, i) => (
                <TimelineStep key={step.id} step={step} last={i === PROCESS_STEPS.length - 1} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TimelineStep({ step, last }: { step: ProcessStep; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { once: true, amount: 0.6, margin: "0px 0px -25% 0px" });

  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-12 transition-opacity duration-500 ease-out-expo sm:pl-16",
        last ? "pb-0" : "pb-12 sm:pb-14",
        // `motion-reduce` forces the resolved state, so nothing is left dim.
        active ? "opacity-100" : "opacity-45 motion-reduce:opacity-100",
      )}
    >
      {/* Node marker */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0.5 grid size-8 place-items-center rounded-full font-mono text-[0.625rem] font-semibold transition-all duration-500 ease-out-expo sm:size-10 sm:text-xs",
          active
            ? "bg-brand-600 text-white ring-4 ring-brand-600/20 motion-reduce:ring-2"
            : "bg-ink-800 text-brand-300 ring-1 ring-white/12",
        )}
      >
        {step.index}
      </span>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{step.title}</h3>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/8 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-200 ring-1 ring-white/10">
          <HiOutlineClock aria-hidden="true" className="size-3" />
          {step.duration}
        </span>
      </div>

      <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-brand-100/75">
        {step.body}
      </p>

      <p className="mt-4 inline-flex items-center gap-2 rounded-pill bg-signal-500/12 px-3 py-1.5 text-xs font-medium text-signal-300 ring-1 ring-signal-400/25">
        <HiOutlineDocumentCheck aria-hidden="true" className="size-3.5" />
        You receive: {step.deliverable}
      </p>
    </li>
  );
}
