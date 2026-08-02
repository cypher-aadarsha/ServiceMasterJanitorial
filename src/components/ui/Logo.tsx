import { cn } from "@/lib/cn";

/**
 * Original wordmark for ServiceMaster Janitorial.
 *
 * The mark is a "clean sweep" arc cutting across a solid tile: one stroke that
 * reads simultaneously as a squeegee pass, a checkmark and a rising graph.
 * Drawn as inline SVG rather than an image file so it costs no network
 * request, stays razor-sharp at any density, and inherits colour from its
 * container for the dark-section variant.
 *
 * NOTE: this is an original mark created for this build. If the business
 * operates under a ServiceMaster franchise licence, replace it with the
 * licensed brand assets supplied by the franchisor — franchise agreements
 * almost always forbid custom marks.
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-9 shrink-0"
        focusable="false"
      >
        <defs>
          <linearGradient id="sm-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3568F4" />
            <stop offset="100%" stopColor="#1B368D" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#sm-logo-grad)" />
        {/* The sweep: a single arc with a trailing highlight. */}
        <path
          d="M9.5 22.8c4.8 4.4 9.9 5.4 15.3 3.1 3.6-1.6 5.9-4.4 6.9-8.5"
          fill="none"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M27.4 10.6l4.9 6.6-8.1 1.1"
          fill="none"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.95rem] font-bold tracking-tight",
            dark ? "text-white" : "text-ink-950",
          )}
        >
          ServiceMaster
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.28em]",
            dark ? "text-brand-200" : "text-brand-700",
          )}
        >
          Janitorial
        </span>
      </span>
    </span>
  );
}
