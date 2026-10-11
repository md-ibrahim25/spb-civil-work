import { site, phoneHref, formatPhone } from "@/content/site";
import { PhoneIcon, PinIcon } from "./Icons";

// Thin strip above the header: service area on the left, phone numbers on the right.
export function TopBar() {
  return (
    <div className="bg-night text-[13px] text-slate-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <p className="flex items-center gap-1.5">
          <PinIcon className="h-3.5 w-3.5 text-aqua" />
          <span>
            Serving Varthur<span className="hidden sm:inline">, Whitefield &amp; east Bengaluru</span>
          </span>
        </p>
        <ul className="flex items-center gap-4">
          {site.contact.phones.map((p, i) => (
            <li key={p} className={i > 0 ? "hidden sm:block" : undefined}>
              <a href={phoneHref(p)} className="flex items-center gap-1.5 font-semibold text-white hover:text-aqua">
                <PhoneIcon className="h-3.5 w-3.5 text-aqua" />
                {formatPhone(p)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
