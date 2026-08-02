# Official ServiceMaster Clean brand assets

**This folder is intentionally empty of logo files.**

The ServiceMaster Clean name and logo are registered trademarks of the
franchisor. As a licensed franchisee you may display them — but only using the
**approved artwork from the franchisor's brand portal**, under the rules in the
brand book (clear space, minimum size, permitted colourways, approved lockups).

The logo was deliberately **not** downloaded from `servicemasterclean.com` and
**not** redrawn by hand. Public website assets are not the approved
distribution artwork, and a hand-drawn approximation of a registered mark is a
brand-compliance violation.

## Add the real assets

1. Download the approved logo from the ServiceMaster Clean brand portal. If you
   do not have access, request it from your franchise business coach.

2. Save the files here with these exact names:

   | File | Purpose |
   |---|---|
   | `servicemaster-clean.svg` | Primary, for light backgrounds (header) |
   | `servicemaster-clean-reversed.svg` | Reversed/knockout, for dark backgrounds (footer, dark nav) |

   SVG is strongly preferred — it stays sharp at any density and is typically
   1–3 KB. If only PNG is supplied, use at least 3× the display size (≈660 × 120)
   and update the file extension in `src/content/brand.ts`.

3. In `src/content/brand.ts`:
   - set `hasOfficialAssets: true`
   - update `logo.width` / `logo.height` to the artwork's real intrinsic
     dimensions, so the layout reserves the right box and nothing shifts on load

That is the whole change. No component edits are required.

## Also verify the palette

The brand colours in `src/app/globals.css` are a **carefully-built
approximation**, not verified values — both `servicemasterclean.com` and
Brandfetch refuse automated requests, so the official hex codes could not be
confirmed.

Replace the `--color-brand-*` ramp with the brand book values. If the book
specifies Pantone or CMYK only, convert to sRGB **and re-run the contrast
check** — brand greens tuned for print regularly fail WCAG contrast on white,
and `--color-brand-600` is used for button fills and link text.
