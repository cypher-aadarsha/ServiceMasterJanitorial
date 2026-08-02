"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiBars3, HiOutlinePhone, HiXMark, HiArrowRight } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SITE } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * STICKY NAVIGATION
 *
 * UX reasoning
 * ------------
 * A facility manager arrives mid-consideration and leaves the moment they
 * cannot find a way to talk to a human. So the header carries exactly two
 * conversion affordances at all times — a tap-to-call number and a quote CTA —
 * and never lets them scroll away.
 *
 * The utility strip above the nav (phone, hours, coverage) collapses once the
 * user scrolls past ~80px. It has done its job by then: it front-loads the
 * "are you real, near me, and reachable?" question that every local-service
 * visitor asks first, then gets out of the way to give content the viewport.
 *
 * On scroll the bar switches from transparent to glass. This is one of only
 * two places glassmorphism is used, and it earns it: there is genuine content
 * passing underneath, so the blur communicates depth rather than decorating.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    // `passive` keeps the scroll thread free — a non-passive scroll listener on
    // a sticky header is a classic INP regression.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile panel: lock background scroll, close on Escape, and keep Tab inside
  // the panel. Without the trap, keyboard focus walks behind the overlay and
  // the user is stranded on invisible controls.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip — collapses on scroll, hidden below `lg` where the
          viewport is too precious to spend on secondary contact detail. */}
      <div
        className={cn(
          "hidden overflow-hidden bg-ink-950 text-white transition-[height,opacity] duration-500 ease-out-expo lg:block",
          scrolled ? "h-0 opacity-0" : "h-10 opacity-100",
        )}
        aria-hidden={scrolled}
      >
        <Container size="wide" className="flex h-10 items-center justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-brand-200">
            Serving {SITE.serviceAreas.slice(0, 3).join(" · ")} + {SITE.serviceAreas.length - 3} more
          </p>
          <div className="flex items-center gap-6 text-xs text-mist-300">
            <span>{SITE.hours}</span>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-brand-200"
              tabIndex={scrolled ? -1 : 0}
            >
              <HiOutlinePhone aria-hidden="true" className="size-3.5" />
              {SITE.phone}
            </a>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-all duration-300 ease-out-expo",
          scrolled ? "glass border-b border-mist-200/70 shadow-soft" : "bg-transparent",
        )}
      >
        <Container size="wide">
          <nav aria-label="Main" className="flex h-18 items-center justify-between gap-6">
            <a
              href="#top"
              className="rounded-lg py-1"
              aria-label={`${SITE.name} — back to top`}
            >
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-lg px-4 py-2 text-sm font-medium text-mist-700 transition-colors hover:text-brand-700",
                      // Underline grows from the centre on hover — a 200ms
                      // micro-interaction that makes the nav feel responsive
                      // without moving any layout.
                      "after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-brand-600 after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={SITE.phoneHref}
                className="hidden items-center gap-2 rounded-pill px-3 py-2 text-sm font-semibold text-ink-950 transition-colors hover:text-brand-700 md:inline-flex"
              >
                <HiOutlinePhone aria-hidden="true" className="size-4 text-brand-600" />
                <span className="sr-only">Call us at </span>
                {SITE.phone}
              </a>

              {/* Visibility lives on the wrapper, not on the Button — see the
                  note in `Button.tsx` about `.inline-flex` beating `.hidden`. */}
              <div className="hidden sm:flex">
                <Button href="#quote" size="md">
                  Get a free quote
                  <HiArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </Button>
              </div>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="grid size-11 place-items-center rounded-xl bg-white text-ink-950 ring-1 ring-mist-200 shadow-soft transition-colors hover:ring-brand-300 lg:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                {open ? (
                  <HiXMark aria-hidden="true" className="size-5" />
                ) : (
                  <HiBars3 aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Mobile panel. Rendered only when open so its links never sit in the
          tab order or the accessibility tree while hidden. */}
      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="glass absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-mist-200 shadow-lift lg:hidden"
        >
          <Container size="wide" className="py-6">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-mist-200/80 last:border-0">
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 font-display text-lg font-semibold text-ink-950"
                  >
                    {link.label}
                    <HiArrowRight aria-hidden="true" className="size-4 text-brand-600" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Button href="#quote" onClick={close} className="w-full">
                Get a free quote
              </Button>
              <Button href={SITE.phoneHref} variant="secondary" className="w-full">
                <HiOutlinePhone aria-hidden="true" className="size-4 text-brand-600" />
                {SITE.phone}
              </Button>
            </div>

            <p className="mt-5 text-center text-xs text-mist-500">{SITE.hours}</p>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
