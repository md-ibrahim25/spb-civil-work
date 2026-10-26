"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewFormState } from "@/app/reviews/actions";
import { services } from "@/content/services";
import { StarIcon } from "./Icons";

const inputClass =
  "mt-2 w-full rounded-xl border-0 bg-surface px-4 py-3.5 text-base text-ink ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand";
const labelClass = "block text-sm font-semibold text-ink";
const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 text-sm font-semibold text-alert">
      {message}
    </p>
  ) : null;
}

export function ReviewForm() {
  const [state, action, pending] = useActionState<ReviewFormState, FormData>(submitReview, { status: "idle" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const shown = hover || rating;
  const e = state.errors ?? {};
  const v = state.values;

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-whatsapp/10 p-6 text-center ring-1 ring-whatsapp/30" role="status">
        <p className="font-display text-2xl font-extrabold text-ink">Thank you! 🙏</p>
        <p className="mt-2 text-muted">{state.message ?? "Your review has been received."}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <fieldset aria-describedby={e.rating ? "rating-error" : undefined}>
        <legend className={labelClass}>Your rating</legend>
        {/* Radio buttons styled as stars: keyboard-accessible with arrow keys. */}
        <div className="mt-2 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="peer sr-only"
                aria-label={`${n} star${n > 1 ? "s" : ""}: ${labels[n]}`}
              />
              <StarIcon
                className={`h-10 w-10 rounded-md transition peer-focus-visible:ring-2 peer-focus-visible:ring-water ${
                  n <= shown ? "text-amber-400" : "text-slate-300"
                }`}
              />
            </label>
          ))}
          <span className="ml-3 text-sm font-semibold text-muted" aria-live="polite">
            {labels[shown]}
          </span>
        </div>
        <FieldError id="rating-error" message={e.rating} />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-name" className={labelClass}>Your name</label>
          <input id="r-name" name="name" defaultValue={v?.name} required maxLength={60} autoComplete="name" className={inputClass}
            aria-invalid={!!e.name} aria-describedby={e.name ? "name-error" : undefined} />
          <FieldError id="name-error" message={e.name} />
        </div>
        <div>
          <label htmlFor="r-area" className={labelClass}>
            Area <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="r-area" name="area" defaultValue={v?.area} maxLength={60} placeholder="e.g. Whitefield" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-service" className={labelClass}>Service used</label>
          <select id="r-service" name="service" key={v?.service} defaultValue={v?.service ?? services[0].slug} className={inputClass}
            aria-invalid={!!e.service} aria-describedby={e.service ? "service-error" : undefined}>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
            <option value="other">Other</option>
          </select>
          <FieldError id="service-error" message={e.service} />
        </div>
        <div>
          <label htmlFor="r-phone" className={labelClass}>
            Mobile <span className="font-normal text-muted">(optional, not shown)</span>
          </label>
          <input id="r-phone" name="phone" defaultValue={v?.phone} type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national"
            placeholder="Helps us confirm you're a customer" className={inputClass}
            aria-invalid={!!e.phone} aria-describedby={e.phone ? "phone-error" : undefined} />
          <FieldError id="phone-error" message={e.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="r-comment" className={labelClass}>Your review</label>
        <textarea id="r-comment" name="comment" defaultValue={v?.comment} rows={4} required maxLength={1000}
          placeholder="How was the cleaning? Was the team on time?" className={inputClass}
          aria-invalid={!!e.comment} aria-describedby={e.comment ? "comment-error" : undefined} />
        <FieldError id="comment-error" message={e.comment} />
      </div>

      {/* Honeypot for bots: hidden from people and screen readers. */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Submit review"}
      </button>

      <p aria-live="polite" className={`text-sm ${state.status === "error" && state.message ? "font-semibold text-alert" : "text-muted"}`}>
        {state.status === "error" && state.message
          ? state.message
          : "Reviews appear on the website after a quick check. Your mobile number is never shown."}
      </p>
    </form>
  );
}
