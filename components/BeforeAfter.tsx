"use client";

import Image from "next/image";
import { useState } from "react";

// Drag the handle (or use arrow keys) to compare a before and after photo.
export function BeforeAfter({
  before,
  after,
  alt,
  eager = false,
}: {
  before: string;
  after: string;
  alt: string;
  // Set when the slider is visible on page load, so the photos aren't lazy-loaded.
  eager?: boolean;
}) {
  const loading = eager ? "eager" : undefined;
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/5] select-none overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-water">
      <Image src={after} alt={`${alt}: after cleaning`} fill loading={loading} sizes="(min-width: 1024px) 450px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}: before cleaning`} fill loading={loading} sizes="(min-width: 1024px) 450px, 100vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-night/80 px-3 py-1 text-sm font-bold text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-whatsapp px-3 py-1 text-sm font-bold text-white">
        After
      </span>

      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-xl ring-4 ring-brand/20">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after cleaning"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
