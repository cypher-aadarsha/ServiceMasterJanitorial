import type { ReactNode } from "react";
import { HiCheck } from "react-icons/hi2";
import { cn } from "@/lib/cn";

/**
 * Verification chip.
 *
 * Emerald is reserved site-wide for one meaning only: *this has been verified*.
 * Because the colour never appears decoratively, the eye learns it in one
 * scroll and every subsequent green mark carries trust for free. Text uses
 * `signal-700` (5.48:1 on white) — `signal-500` is for the icon and rules only,
 * where the 3:1 non-text threshold applies.
 */
export function Chip({
  children,
  tone = "verified",
  className,
}: {
  children: ReactNode;
  tone?: "verified" | "brand" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium",
        tone === "verified" && "bg-signal-50 text-signal-700 ring-1 ring-signal-500/25",
        tone === "brand" && "bg-brand-50 text-brand-700 ring-1 ring-brand-600/15",
        tone === "onDark" && "bg-white/10 text-brand-100 ring-1 ring-white/15",
        className,
      )}
    >
      {tone === "verified" ? (
        <HiCheck aria-hidden="true" className="size-3.5 shrink-0 text-signal-600" />
      ) : null}
      {children}
    </span>
  );
}
