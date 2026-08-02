import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Vertical rhythm primitive.
 *
 * All section padding flows from the `--spacing-section` token, so the page's
 * breathing room scales fluidly with the viewport and can be re-tuned globally
 * from one line in `globals.css`. Generous, *consistent* vertical air is the
 * cheapest and most reliable way to make a layout read as premium — far more
 * so than any individual decorative flourish.
 *
 * `labelledBy` wires each `<section>` to its own heading, which is what turns
 * the page into a navigable landmark list for screen-reader users instead of
 * an undifferentiated wall of regions.
 */
export function Section({
  id,
  children,
  className,
  tone = "white",
  labelledBy,
  size = "default",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "ink";
  labelledBy?: string;
  size?: "default" | "compact";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        size === "default" ? "py-section" : "py-section-sm",
        tone === "white" && "bg-white",
        tone === "mist" && "bg-mist-50",
        tone === "ink" && "on-dark bg-ink-950 text-brand-100/80",
        className,
      )}
    >
      {children}
    </section>
  );
}
