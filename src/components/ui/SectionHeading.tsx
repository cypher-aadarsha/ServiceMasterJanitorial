import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { DrawRule } from "@/components/ui/DrawRule";

/**
 * MEASURE RAIL — the signature section header.
 *
 * A short brand-gradient rule, a monospace section index, then the heading.
 * Borrowed from architectural drawings and spec sheets: it tells the facility
 * buyer, before they read a word, that this company thinks in documented
 * standards. It is also nearly free to render — two divs and a pseudo-element,
 * no images, no layout shift.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  id,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  id?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      <Reveal>
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <DrawRule tone={dark ? "dark" : "light"} />
          <span
            className={cn(
              "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em]",
              dark ? "text-brand-200" : "text-brand-700",
            )}
          >
            <span aria-hidden="true">{index} — </span>
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <Tag
          id={id}
          className={cn(
            "mt-5 text-display-2 font-semibold",
            dark && "text-white",
            align === "center" && "mx-auto max-w-3xl",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-lead",
              dark ? "text-brand-100/85" : "text-mist-600",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
