"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

// The client takes bookings on WhatsApp, so this form doesn't submit to a server:
// it formats the details into a message and opens WhatsApp with it pre-filled.

const timeSlots = ["Morning (8 – 11 am)", "Midday (11 am – 2 pm)", "Afternoon (2 – 5 pm)", "Evening (5 – 7 pm)"];

const inputClass =
  "mt-2 w-full rounded-xl border-0 bg-surface px-4 py-3.5 text-base text-ink ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand";
const labelClass = "block text-sm font-semibold text-ink";

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const noopSubscribe = () => () => {};

export function BookingForm() {
  const [sent, setSent] = useState(false);
  // Today's date only exists on the client; the page is prerendered at build time.
  const minDate = useSyncExternalStore(noopSubscribe, today, () => undefined);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      "New booking request (from website)",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Service: ${get("service")}`,
      get("size") && `Size: ${get("size")}`,
      `Location: ${get("location")}`,
      `Preferred date: ${formatDate(get("date"))}`,
      `Preferred time: ${get("time")}`,
      get("notes") && `Notes: ${get("notes")}`,
    ].filter(Boolean);

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Your name</label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel-national"
            pattern="[6-9][0-9]{9}"
            title="10-digit mobile number"
            placeholder="10-digit mobile"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={labelClass}>Service</label>
          <select id="service" name="service" required className={inputClass} defaultValue={services[0].title}>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size" className={labelClass}>
            Sump / tank size <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="size" name="size" placeholder="e.g. 6,000 L sump" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>Location / address</label>
        <input
          id="location"
          name="location"
          required
          autoComplete="street-address"
          placeholder="House no., street, area"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>Preferred date</label>
          <input id="date" name="date" type="date" required min={minDate} className={inputClass} />
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>Preferred time</label>
          <select id="time" name="time" required className={inputClass} defaultValue={timeSlots[0]}>
            {timeSlots.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} className={inputClass} />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-8 py-4 text-lg font-bold text-white shadow-lg shadow-whatsapp/25 transition hover:-translate-y-0.5 hover:bg-whatsapp-dark sm:w-auto"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </button>

      <p aria-live="polite" className="text-sm text-muted">
        {sent
          ? "WhatsApp has opened with your booking details. Press send there to confirm. We'll reply to fix the time."
          : "This opens WhatsApp with your details filled in. Just press send."}
      </p>
    </form>
  );
}
