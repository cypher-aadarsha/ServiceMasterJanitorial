"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiCheckCircle,
  HiExclamationCircle,
  HiArrowRight,
} from "react-icons/hi2";
import { submitQuote } from "@/app/actions";
import { INITIAL_QUOTE_STATE, type QuoteState } from "@/lib/quote";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/content/industries";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * CONTACT / QUOTE REQUEST
 *
 * UX reasoning
 * ------------
 * The whole page exists to land here, so every decision is made against one
 * metric: completed submissions.
 *
 *  - SIX FIELDS, FIVE REQUIRED. Each additional field measurably depresses
 *    completion. Everything asked for is something we genuinely cannot quote
 *    without; square footage and frequency are deliberately NOT asked, because
 *    the walkthrough establishes them better than the prospect can guess, and
 *    a field the user has to think about is a field they abandon on.
 *  - THE ASK IS A WALKTHROUGH, NOT A PURCHASE. "Book a free walkthrough" is a
 *    smaller commitment than "Request a quote", which implies negotiation.
 *  - THE FORM IS NOT THE ONLY EXIT. Phone and email sit beside it. A facility
 *    manager with an urgent problem wants to talk to somebody now, and forcing
 *    them through a form loses the highest-intent lead on the page.
 *  - EXPECTATIONS ARE SET BEFORE THE BUTTON. "We'll call within one business
 *    day" removes the unknown that causes hesitation at the point of submit.
 *
 * Layout
 * ------
 * 7/5 split: the form takes the wider column, contact details and reassurance
 * the narrower. On desktop the form is on the LEFT — against the usual pattern
 * — because it is the primary action and left is where the eye lands first
 * after the section heading.
 *
 * Mobile
 * ------
 * Single column, form first, contact details after. Inputs are 48px tall with
 * 16px text — below 16px iOS Safari zooms on focus, which throws the user out
 * of the layout mid-form and is a well-documented mobile abandonment cause.
 * `inputMode` and `autoComplete` are set on every field so the right keyboard
 * appears and browser autofill can complete most of the form in one tap.
 *
 * Animation
 * ---------
 * Almost none, intentionally. Motion at the point of conversion adds latency
 * and risk. The only movement is the submit button's spinner and the arrow
 * nudge on hover.
 *
 * Accessibility
 * -------------
 *  - Every input has a real, visible `<label>` — never a placeholder as a
 *    label, which vanishes on focus and is invisible to some screen readers.
 *  - Errors are announced via `aria-live`, linked with `aria-describedby`, and
 *    flagged with `aria-invalid`. They are marked with an icon and text as
 *    well as colour.
 *  - The success message takes focus-visible prominence and is announced by
 *    the same live region.
 *  - The honeypot is `aria-hidden` and `tabIndex={-1}`, so it is invisible to
 *    assistive tech and unreachable by keyboard — a honeypot a screen-reader
 *    user can fill in is an accessibility bug that silently blocks real leads.
 */
export function Contact() {
  const [state, formAction] = useActionState<QuoteState, FormData>(
    submitQuote,
    INITIAL_QUOTE_STATE,
  );

  return (
    <Section id="quote" labelledBy="quote-heading" className="scroll-mt-24">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------ Form */}
          <div className="lg:col-span-7">
            <SectionHeading
              index="08"
              eyebrow="Request a walkthrough"
              id="quote-heading"
              title="Tell us about your building."
              lead="Thirty minutes on site is all it takes to quote accurately. You'll get a written scope and a fixed monthly price within two business days — with no obligation to proceed."
            />

            <form action={formAction} className="mt-10" noValidate>
              {/* Honeypot — hidden from humans and from assistive tech.
                  Uses the clip-based `sr-only` technique rather than the
                  conventional `left:-9999px`: a far-off-screen element widens
                  the document box, and mobile Chrome grows the layout viewport
                  to contain it, which silently gives the WHOLE page a
                  horizontal scrollbar. Clipping hides it with zero layout
                  footprint. */}
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="company_website">Do not fill this in</label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Your name"
                  autoComplete="name"
                  error={state.errors.name}
                  required
                />
                <Field
                  name="organization"
                  label="Organisation"
                  autoComplete="organization"
                  error={state.errors.organization}
                  required
                />
                <Field
                  name="email"
                  label="Work email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  error={state.errors.email}
                  required
                />
                <Field
                  name="phone"
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  error={state.errors.phone}
                  required
                />

                <div className="sm:col-span-2">
                  <FieldShell name="facility" label="Facility type" error={state.errors.facility} required>
                    <select
                      id="facility"
                      name="facility"
                      required
                      defaultValue=""
                      aria-invalid={Boolean(state.errors.facility)}
                      aria-describedby={state.errors.facility ? "facility-error" : undefined}
                      className={cn(INPUT, "appearance-none bg-[length:1.25rem] pr-10")}
                    >
                      <option value="" disabled>
                        Select the closest match…
                      </option>
                      {INDUSTRIES.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.name}
                        </option>
                      ))}
                    </select>
                  </FieldShell>
                </div>

                <div className="sm:col-span-2">
                  <FieldShell
                    name="details"
                    label="Anything we should know?"
                    optional
                    error={state.errors.details}
                  >
                    <textarea
                      id="details"
                      name="details"
                      rows={4}
                      maxLength={2000}
                      placeholder="Approximate size, current frequency, what is going wrong today…"
                      aria-invalid={Boolean(state.errors.details)}
                      aria-describedby={state.errors.details ? "details-error" : undefined}
                      className={cn(INPUT, "resize-y py-3")}
                    />
                  </FieldShell>
                </div>
              </div>

              {/* Status region: one live region for both outcomes, so a screen
                  reader announces exactly once per submission. */}
              <div aria-live="polite" className="mt-6 empty:mt-0">
                {state.status === "success" ? (
                  <p className="flex items-start gap-3 rounded-card bg-signal-50 p-4 text-sm text-signal-700 ring-1 ring-signal-500/25">
                    <HiCheckCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                    {state.message}
                  </p>
                ) : null}
                {state.status === "error" ? (
                  <p className="flex items-start gap-3 rounded-card bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-500/25">
                    <HiExclamationCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                    {state.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <SubmitButton />
                <p className="text-xs leading-relaxed text-mist-500">
                  We&apos;ll call within one business day. No obligation, and we
                  never share your details.
                </p>
              </div>
            </form>
          </div>

          {/* --------------------------------------------------- Details */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="rounded-panel bg-mist-50 p-7 ring-1 ring-mist-200 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-ink-950">
                  Prefer to talk it through?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">
                  Reach the team directly. If it&apos;s urgent — a failed
                  inspection, a vendor who has walked off site — say so and
                  we&apos;ll prioritise the callback.
                </p>

                <ul className="mt-7 space-y-5">
                  <ContactRow icon={HiOutlinePhone} label="Call">
                    <a
                      href={SITE.phoneHref}
                      className="font-display text-lg font-semibold text-ink-950 transition-colors hover:text-brand-700"
                    >
                      {SITE.phone}
                    </a>
                    <span className="mt-0.5 block text-xs text-mist-500">{SITE.hours}</span>
                  </ContactRow>

                  <ContactRow icon={HiOutlineEnvelope} label="Email">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="break-all font-medium text-ink-950 transition-colors hover:text-brand-700"
                    >
                      {SITE.email}
                    </a>
                    <span className="mt-0.5 block text-xs text-mist-500">
                      Bid packets and RFPs welcome
                    </span>
                  </ContactRow>

                  <ContactRow icon={HiOutlineMapPin} label="Visit">
                    <span className="font-medium text-ink-950">{SITE.address.street}</span>
                    <span className="mt-0.5 block text-xs text-mist-500">
                      {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                    </span>
                  </ContactRow>
                </ul>

                <div className="mt-8 border-t border-mist-200 pt-6">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mist-500">
                    Service area
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist-600">
                    {SITE.serviceAreas.join(" · ")} and the surrounding counties.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

const INPUT =
  "w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-ink-950 shadow-soft ring-1 ring-mist-300 " +
  "placeholder:text-mist-400 transition-shadow duration-200 " +
  "focus:ring-2 focus:ring-brand-600 focus:outline-none " +
  "aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600 " +
  // 48px min height and 16px text: below 16px, iOS Safari zooms the viewport
  // on focus and knocks the user out of the layout.
  "min-h-12";

function FieldShell({
  name,
  label,
  error,
  required,
  optional,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-baseline gap-2 text-sm font-medium text-ink-950">
        {label}
        {required ? (
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        ) : null}
        {optional ? <span className="text-xs font-normal text-mist-400">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-2 flex items-center gap-1.5 text-xs text-red-700">
          <HiExclamationCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  inputMode,
  autoComplete,
  error,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <FieldShell name={name} label={label} error={error} required={required}>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={INPUT}
      />
    </FieldShell>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-mist-200"
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <span className="sr-only">{label}: </span>
        {children}
      </div>
    </li>
  );
}

/**
 * Split out so `useFormStatus` can read the pending state of the enclosing
 * form. The button is disabled while in flight to prevent double submission,
 * and the label changes rather than only the spinner — a spinner alone is
 * invisible to screen-reader users.
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-brand-600 px-7 py-3.5",
        "text-base font-medium text-white shadow-brand transition-all duration-200 ease-out-expo",
        "hover:bg-brand-700 hover:shadow-lift motion-safe:hover:-translate-y-0.5",
        "disabled:pointer-events-none disabled:opacity-70",
      )}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
          Sending…
        </>
      ) : (
        <>
          Book my free walkthrough
          <HiArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
}
