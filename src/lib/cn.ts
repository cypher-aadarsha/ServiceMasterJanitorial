/**
 * Minimal class-name joiner. Deliberately not `clsx` + `tailwind-merge`: this
 * site has no runtime class conflicts to resolve, and skipping both keeps ~8KB
 * out of the client bundle for zero functional loss.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
