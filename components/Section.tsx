import Image from "next/image";
import type { ReactNode } from "react";

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${
        dark ? "bg-white/10 text-aqua ring-1 ring-white/15" : "bg-water-light text-brand"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-aqua" : "bg-alert"}`} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleKn,
  intro,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  titleKn?: string;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`reveal ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 font-display text-3xl font-extrabold leading-[1.08] sm:text-5xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {titleKn && (
        <p lang="kn" className={`mt-3 font-kannada text-lg font-semibold ${dark ? "text-water" : "text-brand"}`}>
          {titleKn}
        </p>
      )}
      {intro && <p className={`mt-4 text-lg ${dark ? "text-slate-300" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

// Dark backdrop for heroes and dark sections. With `underHeader`, it slides up under the
// floating header (78px tall) so the glass header sits over the dark background.
// With `image`, a full-width photo sits behind a dark overlay that keeps the text readable.
export function DarkBackdrop({
  children,
  underHeader = false,
  image,
}: {
  children: ReactNode;
  underHeader?: boolean;
  image?: string | null;
}) {
  return (
    <section className={`relative overflow-hidden bg-night text-white ${underHeader ? "-mt-[78px] pt-[78px]" : ""}`}>
      {image && (
        <>
          <Image src={image} alt="" fill preload loading="eager" sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" aria-hidden />
        </>
      )}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-10 h-[28rem] w-[28rem] rounded-full bg-aqua/20 blur-3xl"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </section>
  );
}

// Banner at the top of inner pages.
export function PageHero({
  eyebrow,
  title,
  titleKn,
  intro,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  titleKn?: string;
  intro?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <DarkBackdrop underHeader image={image}>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-20 sm:pt-20">
        {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 font-display text-4xl font-black leading-[1.02] sm:text-6xl">{title}</h1>
        {titleKn && (
          <p lang="kn" className="mt-4 font-kannada text-xl text-water">
            {titleKn}
          </p>
        )}
        {intro && <p className="mt-5 max-w-2xl text-lg text-slate-300">{intro}</p>}
        {children}
      </div>
    </DarkBackdrop>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}
