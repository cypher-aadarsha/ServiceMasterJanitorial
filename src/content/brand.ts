/**
 * ============================================================================
 * FRANCHISE BRAND CONFIGURATION
 * ============================================================================
 *
 * This file is the seam between the franchisor's brand assets and this site.
 *
 * ⚠️  THE OFFICIAL LOGO IS NOT BUNDLED, AND THAT IS DELIBERATE.
 *
 * "ServiceMaster Clean" and its logo are registered trademarks of the
 * franchisor. As a licensed franchisee you are entitled to display them — but
 * only using the approved artwork issued through the franchisor's brand
 * portal, and only within the usage rules in the brand book (clear space,
 * minimum size, permitted colourways, approved lockups).
 *
 * Two things this codebase therefore refuses to do:
 *
 *   1. Scrape the logo off servicemasterclean.com. Public site assets are
 *      compressed, versioned for that site, and frequently not the approved
 *      distribution artwork. They also change without notice.
 *   2. Redraw the mark from a screenshot. An approximation of a registered
 *      trademark is both visibly wrong and a brand-guideline violation — the
 *      exact thing a franchise compliance audit looks for.
 *
 * TO ACTIVATE THE OFFICIAL LOGO
 * -----------------------------
 *   1. Download the approved SVG (or high-resolution PNG) from the ServiceMaster
 *      Clean brand portal — request access from your franchise business coach
 *      if you do not have it.
 *   2. Save it as:   public/brand/servicemaster-clean.svg
 *      and the reversed / white version for dark backgrounds as:
 *                    public/brand/servicemaster-clean-reversed.svg
 *   3. Set `hasOfficialAssets` to `true` below and fill in the real intrinsic
 *      dimensions so the layout reserves the correct box (prevents CLS).
 *
 * Until then the site renders a neutral typographic placeholder that makes no
 * claim to be the mark. See `components/ui/BrandLogo.tsx`.
 */

export const BRAND = {
  /** Flip to `true` once the approved artwork is in `public/brand/`. */
  hasOfficialAssets: false,

  logo: {
    light: "/brand/servicemaster-clean.svg",
    /** Reversed / knockout version, for the deep-green footer and nav. */
    dark: "/brand/servicemaster-clean-reversed.svg",
    /** Intrinsic size of the artwork. Update to match the real file. */
    width: 220,
    height: 40,
    /**
     * The logo is the site's link to home, so its alt text must describe the
     * destination, not the picture. "ServiceMaster Clean logo" is noise to a
     * screen-reader user; the company name is what they need.
     */
    alt: "ServiceMaster Clean",
  },

  /**
   * Franchise descriptor shown beneath the mark. Most franchise agreements
   * require the licensed operator to be identified alongside the brand — check
   * the exact required wording and legal entity name in your agreement.
   */
  franchiseDescriptor: "Independently owned and operated franchise",
} as const;
