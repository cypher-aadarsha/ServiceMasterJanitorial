import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition-[transform,box-shadow,background-color,color] duration-200 ease-out-expo " +
  "motion-safe:hover:-translate-y-0.5 active:translate-y-0 " +
  // 44px minimum hit target on every variant — WCAG 2.5.8 target size.
  "min-h-11 whitespace-nowrap disabled:pointer-events-none disabled:opacity-60";

const VARIANTS: Record<Variant, string> = {
  // `sweep` puts the site's signature specular wipe on the primary CTA. It is
  // the one control we most want to feel alive, and reusing the card
  // interaction here means the gesture is learned once and recognised
  // everywhere.
  primary:
    "sweep bg-brand-600 text-white shadow-brand hover:bg-brand-700 hover:shadow-lift",
  secondary:
    "bg-white text-ink-950 ring-1 ring-mist-200 shadow-soft hover:ring-brand-300 hover:shadow-card",
  ghost:
    "text-ink-950 hover:bg-mist-100",
  onDark:
    "bg-white text-brand-700 shadow-lift hover:bg-brand-50",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };
type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

/**
 * Renders an `<a>` when given `href` and a `<button>` otherwise, so a
 * navigation CTA is never a button and a form submit is never a link. That
 * distinction is invisible on screen and decisive for screen-reader and
 * keyboard users.
 *
 * ⚠️  DO NOT hide a Button with `hidden`/`sm:hidden` in its own `className`.
 * `BASE` already sets `inline-flex`, and Tailwind emits `.inline-flex` after
 * `.hidden` in the stylesheet — equal specificity means source order wins, so
 * the button stays visible and silently overflows narrow viewports. Wrap it in
 * a container that carries the responsive visibility instead:
 *
 *     <div className="hidden sm:flex"><Button …/></div>
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "lg", className, children, ...rest } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (typeof rest.href === "string") {
    const anchorProps = rest as ComponentPropsWithoutRef<"a">;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
