import { cacheLife } from "next/cache";
import Link from "next/link";
import { areas } from "@/content/areas";
import { site, phoneHref, formatPhone } from "@/content/site";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/whatsapp";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

// Cached so the page can be prerendered; refreshed daily for the copyright year.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    // Extra bottom padding on mobile leaves room for the floating call/WhatsApp bar.
    <footer className="bg-night pb-24 text-slate-300 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed">{site.description}</p>
          <p lang="kn" className="mt-3 font-kannada text-sm text-water">
            {site.taglineKn}
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {site.contact.phones.map((p) => (
              <li key={p}>
                <a href={phoneHref(p)} className="flex items-center gap-2 hover:text-white">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-water" />
                  {formatPhone(p)}
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-water" />
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-2">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-water" />
              <address className="not-italic">
                {site.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 shrink-0 text-water" />
              {site.contact.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <nav aria-label="Areas we serve" className="mx-auto max-w-6xl px-4 py-5">
          <h2 className="sr-only">Areas we serve</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li className="font-semibold text-white">Sump &amp; tank cleaning in:</li>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-white">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-400">
          © {year} {site.name}. All rights reserved. ·{" "}
          <Link href="/credits" className="hover:text-white">
            Photo credits
          </Link>
        </p>
      </div>
    </footer>
  );
}
