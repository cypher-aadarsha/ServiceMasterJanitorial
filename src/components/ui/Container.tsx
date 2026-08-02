import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The one horizontal-rhythm primitive. Every section uses it, so line length
 * and gutters stay identical down the page — the quietest and most reliable
 * signal of a considered layout.
 *
 * `wide` is for full-bleed-ish showcases (before/after, marquees); `narrow`
 * caps prose at ~68ch, the readability ceiling for long-form copy.
 */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
