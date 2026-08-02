/**
 * Stagger delay for card grids.
 *
 * Lives in its own module — NOT in `Reveal.tsx` — because every export of a
 * `"use client"` file becomes a client reference across the RSC boundary. A
 * server component importing it from there would receive a proxy it cannot
 * invoke, and the build fails at prerender. Plain helpers shared by server and
 * client code must sit outside client modules.
 *
 * Children take `index * step` rather than a Framer variant chain, so each
 * card reveals independently. Grids reflow between one, two and three columns,
 * and a hard-coded variant order looks wrong at whichever width it was not
 * authored for.
 *
 * The delay is capped so a long list never leaves its last item waiting on an
 * entrance the user has already scrolled past.
 */
export function stagger(index: number, step = 0.07, max = 0.42): number {
  return Math.min(index * step, max);
}
