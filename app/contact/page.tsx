import { BookingForm } from "@/components/BookingForm";
import { BookingSteps } from "@/components/Blocks";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero } from "@/components/Section";
import { directionsUrl, site, phoneHref, formatPhone } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Book Sump & Tank Cleaning: Call or WhatsApp",
  description:
    "Book sump or tank cleaning in Varthur & east Bengaluru. Call 91482 98431 / 97070 45806 or WhatsApp your location and preferred date & time.",
  path: "/contact",
});

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`;

  return (
    <>
      <PageHero
        image={images.hero.contact}
        eyebrow="Book & contact"
        title="Book a cleaning"
        titleKn="ನಿಮ್ಮ ಸ್ಥಳ, ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ಹಂಚಿಕೊಳ್ಳಿ"
        intro="Share your location and preferred date & time. We'll confirm on WhatsApp or by phone."
      >
        <div className="mt-10">
          <BookingSteps dark />
        </div>
      </PageHero>

      <section className="bg-surface py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="font-display text-3xl font-extrabold text-ink">Booking form</h2>
            <p className="mt-1 mb-6 text-muted">Takes less than a minute.</p>
            <BookingForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="font-display text-xl font-extrabold text-ink">Call or WhatsApp</h2>
              <ul className="mt-4 space-y-3">
                {site.contact.phones.map((p) => (
                  <li key={p}>
                    <a href={phoneHref(p)} className="flex items-center gap-3 text-lg font-bold text-brand hover:underline">
                      <PhoneIcon className="h-5 w-5 text-alert" />
                      {formatPhone(p)}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-bold text-whatsapp hover:underline"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex gap-3 text-muted">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <address className="not-italic">
                  {site.contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span lang="kn" className="mt-2 block font-kannada text-sm">
                    {site.contact.addressKn}
                  </span>
                </address>
              </div>
              <p className="mt-4 flex items-center gap-3 text-muted">
                <ClockIcon className="h-5 w-5 shrink-0 text-brand" />
                {site.contact.hours}
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-3xl bg-night px-6 py-5 font-bold text-white transition hover:bg-brand"
            >
              <span className="flex items-center gap-3">
                <PinIcon className="h-5 w-5 text-aqua" /> Get directions
              </span>
              <ArrowIcon className="h-5 w-5" />
            </a>

            <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-slate-200">
              <iframe
                title={`Map showing ${site.name}`}
                src={mapSrc}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </Container>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
    </>
  );
}
