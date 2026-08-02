import Image from "next/image";
import { BRAND } from "@/content/brand";
import { cn } from "@/lib/cn";

/**
 * BRAND LOGO
 *
 * Renders the franchisor's approved artwork when it is present, and a neutral
 * typographic placeholder when it is not. See `content/brand.ts` for how to
 * activate the official assets — it is a two-line change, no component edits.
 *
 * WHY THE PLACEHOLDER IS TYPE-ONLY
 * The previous version of this component drew a custom "sweep" symbol. That
 * was fine for an unbranded concept, but it is exactly wrong for a licensed
 * franchise: an invented symbol standing in for a registered mark is an
 * unauthorised mark, and it is what a brand audit flags first. The placeholder
 * therefore sets the licensed name in the site's display face and adds no
 * symbol at all — it is obviously provisional rather than a fake.
 *
 * Layout stability: both branches occupy the same box, so swapping the real
 * artwork in cannot shift the header. `next/image` gets explicit intrinsic
 * dimensions, and `priority` is set because the header logo is above the fold
 * on every route and would otherwise lazy-load into a visible gap.
 */
export function BrandLogo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  if (BRAND.hasOfficialAssets) {
    return (
      <Image
        src={dark ? BRAND.logo.dark : BRAND.logo.light}
        alt={BRAND.logo.alt}
        width={BRAND.logo.width}
        height={BRAND.logo.height}
        priority
        className={cn("h-9 w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1.0625rem] font-bold tracking-tight",
          dark ? "text-white" : "text-ink-950",
        )}
      >
        ServiceMaster
        <span className={dark ? "text-brand-300" : "text-brand-600"}> Clean</span>
      </span>
      <span
        className={cn(
          "mt-1.5 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.26em]",
          dark ? "text-brand-200/80" : "text-mist-500",
        )}
      >
        Janitorial
      </span>
    </span>
  );
}
