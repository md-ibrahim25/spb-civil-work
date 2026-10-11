import { site, phoneHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

// Call / WhatsApp buttons fixed to the bottom of the screen on phones,
// and a floating WhatsApp button on larger screens.
export function ContactBar() {
  const waHref = whatsappUrl("Hi, I'd like to book a sump/tank cleaning.");
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-2 lg:hidden">
        <a
          href={phoneHref(site.contact.phones[0])}
          className="flex items-center justify-center gap-2 rounded-lg bg-alert py-3 font-bold text-white"
        >
          <PhoneIcon className="h-5 w-5" /> Call now
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 font-bold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp
        </a>
      </div>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 lg:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
