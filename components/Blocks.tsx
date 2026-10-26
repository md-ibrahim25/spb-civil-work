import Image from "next/image";
import Link from "next/link";
import { areas } from "@/content/areas";
import { faqs } from "@/content/faq";
import { cleaningProcess, type Service } from "@/content/services";
import { audiences, bookingSteps, site, phoneHref, formatPhone, trustPoints } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowIcon, CheckIcon, PhoneIcon, PinIcon, ServiceIconSvg, WhatsAppIcon } from "./Icons";

const bookMessage = "Hi, I'd like to book a sump/tank cleaning. My location:  Preferred date & time: ";

export function ServiceCard({
  service,
  index,
  detailed = false,
  featured = false,
}: {
  service: Service;
  index: number;
  detailed?: boolean;
  featured?: boolean;
}) {
  const enquiry = `Hi, I'd like to enquire about ${service.title}. My location: `;
  return (
    <article
      id={detailed ? service.slug : undefined}
      className={`reveal group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${
        featured
          ? "bg-gradient-to-br from-brand to-brand-dark text-white shadow-xl shadow-brand/20"
          : "bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-xl hover:shadow-slate-900/5"
      }`}
    >
      {featured && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-aqua/25 blur-2xl" aria-hidden />
      )}
      {service.image && (
        <div className="relative -mx-7 -mt-7 mb-6 aspect-[16/9] overflow-hidden">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${featured ? "from-brand/90 via-brand/10" : "from-black/25"} to-transparent`}
            aria-hidden
          />
        </div>
      )}
      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            featured ? "bg-white/15 text-aqua ring-1 ring-white/20" : "bg-water-light text-brand"
          }`}
        >
          <ServiceIconSvg icon={service.icon} className="h-7 w-7" />
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-display text-sm font-bold ${featured ? "text-aqua" : "text-water"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${
              featured ? "bg-white/10 text-slate-100" : "bg-water-light text-brand"
            }`}
          >
            {service.category}
          </span>
        </div>
      </div>
      <h3 className={`relative mt-6 font-display text-2xl font-bold ${featured ? "text-white" : "text-ink"}`}>
        <Link href={`/services/${service.slug}`} className="hover:underline">
          {service.title}
        </Link>
      </h3>
      <p lang="kn" className={`relative mt-1 font-kannada text-sm ${featured ? "text-water" : "text-brand"}`}>
        {service.titleKn}
      </p>
      <p className={`relative mt-3 ${featured ? "text-slate-200" : "text-muted"}`}>{service.summary}</p>
      {detailed && (
        <ul className="relative mt-5 space-y-2.5">
          {service.points.map((p) => (
            <li key={p} className={`flex gap-2.5 text-[15px] ${featured ? "text-white" : "text-ink"}`}>
              <CheckIcon className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? "text-aqua" : "text-whatsapp"}`} />
              {p}
            </li>
          ))}
        </ul>
      )}
      {/* Spacer pushes the price row to the bottom so cards in a row line up. */}
      <div className="min-h-6 flex-1" aria-hidden />
      <div
        className={`relative flex items-center justify-between gap-3 border-t pt-5 ${
          featured ? "border-white/15" : "border-slate-100"
        }`}
      >
        <span
          className={`font-bold ${
            featured ? "text-white" : service.price.startsWith("From") ? "text-alert" : "text-slate-600"
          }`}
        >
          {service.price}
        </span>
        <a
          href={whatsappUrl(enquiry)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${service.title} on WhatsApp`}
          className={`inline-flex items-center gap-1.5 font-bold transition-all hover:gap-2.5 ${
            featured ? "text-aqua" : "text-brand"
          }`}
        >
          Enquire now <ArrowIcon className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

// Sump and tank cleaning (the main services) get highlighted cards.
export function ServiceBento({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard key={s.slug} service={s} index={i} featured={i < 2} />
      ))}
    </div>
  );
}

export function ProcessSteps() {
  return (
    <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Connecting line behind the step numbers on wide screens */}
      <div
        className="pointer-events-none absolute left-[12%] right-[12%] top-[2.6rem] hidden h-0.5 bg-gradient-to-r from-water via-brand to-aqua lg:block"
        aria-hidden
      />
      {cleaningProcess.map((step, i) => (
        <li key={step.title} className="reveal relative rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-200">
          <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-water font-display text-2xl font-bold text-white shadow-lg shadow-brand/30 ring-8 ring-white">
            {i + 1}
          </span>
          <h3 className="mt-5 font-display text-xl font-bold text-ink">{step.title}</h3>
          <p lang="kn" className="mt-1 font-kannada text-sm text-brand">
            {step.titleKn}
          </p>
          <p className="mt-3 text-[15px] text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function BookingSteps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {bookingSteps.map((step, i) => (
        <li
          key={step.title}
          className={`reveal flex gap-4 rounded-3xl p-6 ${
            dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white shadow-sm ring-1 ring-slate-200"
          }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${
              dark ? "bg-aqua text-night" : "bg-brand text-white"
            }`}
          >
            {i + 1}
          </span>
          <div>
            <h3 className={`font-bold ${dark ? "text-white" : "text-ink"}`}>{step.title}</h3>
            <p className={`mt-1 text-[15px] ${dark ? "text-slate-300" : "text-muted"}`}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-3xl bg-white px-2 shadow-sm ring-1 ring-slate-200 sm:px-4">
      {items.map((f) => (
        <details key={f.q} className="group px-3 py-1 sm:px-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-water-light text-xl text-brand transition-transform group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-10 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

// Scrolling strip of service areas (static for users who prefer reduced motion).
export function AreaMarquee() {
  const looped = [...areas, ...areas];
  return (
    <div className="relative overflow-hidden border-y border-slate-200 bg-white py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]" aria-label="Areas we serve">
        {looped.map((a, i) => {
          const duplicate = i >= areas.length;
          return (
            <li key={`${a.slug}-${i}`} aria-hidden={duplicate || undefined}>
              <Link
                href={`/areas/${a.slug}`}
                // Links scroll past constantly; don't prefetch each one as it appears.
                prefetch={false}
                tabIndex={duplicate ? -1 : undefined}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-surface px-5 py-2.5 font-semibold text-ink ring-1 ring-slate-200 transition hover:bg-water-light hover:text-brand"
              >
                <PinIcon className="h-4 w-4 text-alert" />
                {a.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CTABanner() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-night px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-brand/70 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
              Ready for <span className="text-gradient">clean, safe water?</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-slate-300">
              Send your location and a preferred date &amp; time. We&apos;ll confirm your slot quickly.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={whatsappUrl(bookMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 py-4 text-lg font-bold text-white shadow-lg shadow-whatsapp/30 transition hover:-translate-y-0.5 hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="h-6 w-6" /> Book on WhatsApp
            </a>
            <a
              href={phoneHref(site.contact.phones[0])}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-brand transition hover:-translate-y-0.5 hover:bg-water-light"
            >
              <PhoneIcon className="h-5 w-5" /> Call {formatPhone(site.contact.phones[0])}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold text-slate-200 ring-1 ring-white/25 transition hover:bg-white/10"
            >
              Or fill the booking form <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    // Overlaps the bottom of the dark hero; the lower part blends into the next (surface) section.
    <div className="relative z-10 -mt-10 bg-[linear-gradient(to_bottom,transparent_2.5rem,var(--color-surface)_2.5rem)] px-4">
      <ul className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl bg-slate-100 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((t) => (
          <li key={t.title} className="flex items-start gap-3 bg-white p-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-water-light text-brand">
              <CheckIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-bold leading-tight text-ink">{t.title}</span>
              <span className="mt-0.5 block text-sm text-muted">{t.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Audiences() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4">
      {audiences.map((a, i) => (
        <li key={a.title} className="reveal bg-white p-7">
          <span className="block h-1 w-10 rounded-full bg-gradient-to-r from-brand to-aqua" aria-hidden />
          <span className="mt-5 block font-display text-sm font-bold text-water">0{i + 1}</span>
          <h3 className="mt-1 font-display text-xl font-extrabold text-ink">{a.title}</h3>
          <p className="mt-2 text-[15px] text-muted">{a.text}</p>
        </li>
      ))}
    </ul>
  );
}
