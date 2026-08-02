/**
 * Shared types and constants for the quote form.
 *
 * These live OUTSIDE `app/actions.ts` for a hard technical reason: a
 * `"use server"` module may only export async functions. Every other export is
 * treated as a server reference rather than a value, so a plain object exported
 * from there arrives on the client as `undefined` — which is exactly how the
 * initial form state silently became undefined and crashed the prerender.
 *
 * Keeping the value here means both the action and the client component import
 * the same real object.
 */

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-keyed messages, rendered inline and wired up via `aria-describedby`. */
  errors: Record<string, string>;
};

export const INITIAL_QUOTE_STATE: QuoteState = {
  status: "idle",
  message: "",
  errors: {},
};
