"use server";

import { INDUSTRIES } from "@/content/industries";
// A "use server" module may only export async functions, so the state type and
// its initial value are imported from a plain module rather than declared here.
import type { QuoteState } from "@/lib/quote";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Permissive on purpose: extensions, spaces, dots and +1 prefixes are all
 *  things real people type, and rejecting them loses leads over formatting. */
const PHONE = /^[+()\d][\d\s().extEXT+-]{6,}$/;

const VALID_FACILITIES = new Set(INDUSTRIES.map((i) => i.id));

function field(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Quote request handler.
 *
 * Runs as a Server Action so the form submits and validates with JavaScript
 * disabled — the progressive-enhancement baseline. `useActionState` on the
 * client layers pending state and inline errors on top without changing the
 * underlying mechanism.
 *
 * Validation is server-side and authoritative. Client-side `required` and
 * `type` attributes are a UX convenience only; anything trusted here is
 * re-checked, because HTML constraints are trivially bypassed.
 *
 * ⚠️  DELIVERY IS NOT WIRED UP. This action validates and returns, but does
 * not yet persist or send the lead anywhere. Before launch, replace the marked
 * block below with the real integration (transactional email, CRM webhook, or
 * both) and add the corresponding secrets as environment variables. Shipping
 * as-is means silently dropping every enquiry.
 */
export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot: a field hidden from humans that bots fill in reflexively. We
  // return a success response rather than an error so the bot has no signal
  // that it was caught and does not retune and retry.
  if (field(formData, "company_website")) {
    return { status: "success", message: "Thanks — we'll be in touch shortly.", errors: {} };
  }

  const name = field(formData, "name");
  const organization = field(formData, "organization");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const facility = field(formData, "facility");
  const details = field(formData, "details");

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  if (organization.length < 2) errors.organization = "Please enter your organisation.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid work email address.";
  if (!PHONE.test(phone)) errors.phone = "Please enter a phone number we can reach you on.";
  if (!VALID_FACILITIES.has(facility)) errors.facility = "Please choose a facility type.";
  if (details.length > 2000) errors.details = "Please keep this under 2,000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  // ---------------------------------------------------------------------
  // TODO(launch): deliver the lead. Suggested order of operations:
  //   1. POST to the CRM / inbox (Resend, Postmark, SendGrid, HubSpot…).
  //   2. Fire the server-side conversion event for ad attribution.
  //   3. On upstream failure, throw so this returns an error state rather
  //      than telling the prospect it worked when it did not.
  // ---------------------------------------------------------------------

  return {
    status: "success",
    message:
      "Thanks — your request is in. We'll call within one business day to arrange the walkthrough.",
    errors: {},
  };
}
