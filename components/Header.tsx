"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { site, phoneHref, formatPhone } from "@/content/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";
import { Logo } from "./Logo";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 12, () => false);
  const phone = site.contact.phones[0];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    // Floating glass bar: sits over the dark hero, then gains a solid edge once scrolled.
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          scrolled || open
            ? "border-slate-200/80 bg-white/90 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
            : "border-white/60 bg-white/75 backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-3 sm:px-4">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-slate-100/80 p-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? "bg-white text-brand shadow-sm"
                        : "text-slate-600 hover:text-brand"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={phoneHref(phone)}
              className="hidden items-center gap-2 rounded-full bg-alert px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-alert/25 transition hover:-translate-y-0.5 hover:bg-alert-dark sm:inline-flex"
            >
              <PhoneIcon className="h-4 w-4" />
              {formatPhone(phone)}
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-slate-100 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Main" className="border-t border-slate-200 lg:hidden">
            <ul className="grid gap-1 p-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-lg font-semibold ${
                      isActive(item.href) ? "bg-water-light text-brand" : "text-ink hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="sm:hidden">
                <a
                  href={phoneHref(phone)}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-alert px-4 py-3 font-bold text-white"
                >
                  <PhoneIcon className="h-5 w-5" /> Call {formatPhone(phone)}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
