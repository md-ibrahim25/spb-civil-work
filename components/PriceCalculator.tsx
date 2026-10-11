"use client";

import { useId, useState } from "react";
import { formatRupees, sizeHelp, sumpPrices, tankPrices } from "@/content/pricing";
import { whatsappUrl } from "@/lib/whatsapp";
import { ServiceIconSvg, WhatsAppIcon } from "./Icons";

const OTHER = "other";

const kinds = {
  sump: { label: "Sump", hint: "Underground", icon: "sump", rows: sumpPrices, otherLabel: "Other size / above 12,000 L" },
  tank: { label: "Tank", hint: "Overhead", icon: "tank", rows: tankPrices, otherLabel: "Other size / above 3,000 L" },
} as const;

type Kind = keyof typeof kinds;

export function PriceCalculator() {
  const sizeId = useId();
  const helpId = useId();
  const [kind, setKind] = useState<Kind>("sump");
  const [size, setSize] = useState<string>(kinds.sump.rows[0].id);

  const { rows, otherLabel } = kinds[kind];
  const row = rows.find((r) => r.id === size);
  const sizeLabel = row?.label ?? "other size";
  const message = `Hi, I'd like to book ${kind} cleaning (${sizeLabel}). ${
    row ? `Price shown on website: ${formatRupees(row.price)}. ` : ""
  }My location:  Preferred date & time: `;

  function selectKind(next: Kind) {
    setKind(next);
    setSize(kinds[next].rows[0].id);
  }

  return (
    <div className="relative rounded-[1.75rem] bg-white p-6 text-ink shadow-2xl shadow-slate-900/25 ring-1 ring-slate-200 sm:p-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl font-bold">Check your price</h3>
        <span className="rounded-full bg-whatsapp/10 px-3 py-1 text-xs font-bold text-whatsapp">Fixed prices</span>
      </div>

      <div role="radiogroup" aria-label="What needs cleaning?" className="mt-5 grid grid-cols-2 gap-3">
        {(Object.keys(kinds) as Kind[]).map((k) => {
          const active = kind === k;
          return (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => selectKind(k)}
              className={`flex items-center gap-3 rounded-2xl p-3 text-left ring-2 transition ${
                active ? "bg-water-light ring-brand" : "bg-white ring-slate-200 hover:ring-slate-300"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  active ? "bg-brand text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                <ServiceIconSvg icon={kinds[k].icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold">{kinds[k].label}</span>
                <span className="block text-xs text-muted">{kinds[k].hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      <label htmlFor={sizeId} className="mt-5 block text-sm font-semibold">
        Capacity (litres)
      </label>
      <select
        id={sizeId}
        value={size}
        aria-describedby={helpId}
        onChange={(e) => setSize(e.target.value)}
        className="mt-2 w-full rounded-xl border-0 bg-surface px-4 py-3.5 text-base font-semibold ring-1 ring-slate-200 focus:ring-2 focus:ring-brand"
      >
        {rows.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
        <option value={OTHER}>{otherLabel}</option>
      </select>
      <p id={helpId} className="mt-2 text-xs text-muted">
        {sizeHelp}
      </p>

      <div
        className="mt-5 flex items-end justify-between gap-4 rounded-2xl bg-gradient-to-br from-night to-brand p-5 text-white"
        aria-live="polite"
      >
        {row ? (
          <>
            <div>
              <p className="text-sm text-slate-300">Your price</p>
              <p className="font-display text-5xl font-bold leading-none">{formatRupees(row.price)}</p>
            </div>
            <p className="max-w-[9rem] text-right text-xs text-slate-300">All 4 cleaning steps included</p>
          </>
        ) : (
          <div>
            <p className="font-display text-3xl font-bold">Call for price</p>
            <p className="mt-1 text-sm text-slate-300">Send the size or a photo and we&apos;ll quote quickly.</p>
          </div>
        )}
      </div>

      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-4 text-lg font-bold text-white shadow-lg shadow-whatsapp/25 transition hover:-translate-y-0.5 hover:bg-whatsapp-dark"
      >
        <WhatsAppIcon className="h-6 w-6" />
        Book on WhatsApp
      </a>
    </div>
  );
}
