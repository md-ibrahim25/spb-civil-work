import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABanner, Faq, ProcessSteps } from "@/components/Blocks";
import { ArrowIcon, CheckIcon, PhoneIcon, PinIcon, ServiceIconSvg, WhatsAppIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PriceTable } from "@/components/PriceTable";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { areas } from "@/content/areas";
import { sumpPrices, tankPrices } from "@/content/pricing";
import { serviceDetails } from "@/content/service-details";
import { cleaningProcess, getService, services } from "@/content/services";
import { site, phoneHref, formatPhone } from "@/content/site";
import { breadcrumbSchema, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) return {};
  return pageMetadata({
    title: detail.seoTitle,
    description: detail.metaDescription,
    path: `/services/${slug}`,
    image: `/services/${slug}/opengraph-image`,
  });
}

const priceRows: Record<string, { rows: typeof sumpPrices; icon: "sump" | "tank"; caption: string; captionKn: string }> = {
  "sump-cleaning": { rows: sumpPrices, icon: "sump", caption: "Sump cleaning prices", captionKn: "ಸಂಪ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ ದರಗಳು" },
  "tank-cleaning": { rows: tankPrices, icon: "tank", caption: "Tank cleaning prices", captionKn: "ಟ್ಯಾಂಕ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ ದರಗಳು" },
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();

  const path = `/services/${slug}`;
  const prices = priceRows[slug];
  const isCleaning = slug === "sump-cleaning" || slug === "tank-cleaning";
  const others = services.filter((s) => s.slug !== slug);
  const enquiry = `Hi, I'd like to book ${service.title}. My location:  Preferred date & time: `;

  return (
    <>
      <PageHero
        image={service.image}
        eyebrow={service.category}
        title={detail.heading}
        titleKn={service.titleKn}
        intro={service.summary}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl(enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-whatsapp px-6 py-4 text-lg font-bold text-white shadow-lg shadow-whatsapp/30 transition hover:-translate-y-0.5 hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-6 w-6" /> Book on WhatsApp
          </a>
          <a
            href={phoneHref(site.contact.phones[0])}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/10 px-6 py-4 text-lg font-bold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
          >
            <PhoneIcon className="h-5 w-5" /> {formatPhone(site.contact.phones[0])}
          </a>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="reveal space-y-4 text-lg text-muted">
              {detail.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="reveal mt-10 font-display text-2xl font-extrabold text-ink">What&apos;s included</h2>
            <ul className="reveal mt-5 space-y-3">
              {service.points.map((p) => (
                <li key={p} className="flex gap-3 text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <h2 className="reveal mt-10 font-display text-2xl font-extrabold text-ink">When do you need it?</h2>
            <ul className="reveal mt-5 grid gap-3 sm:grid-cols-2">
              {detail.signs.map((sign) => (
                <li key={sign} className="rounded-2xl bg-surface p-4 font-semibold text-ink ring-1 ring-slate-200">
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {prices ? (
              <PriceTable caption={prices.caption} captionKn={prices.captionKn} icon={prices.icon} rows={prices.rows} />
            ) : (
              <div className="reveal rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-7 text-white shadow-xl shadow-brand/20">
                <ServiceIconSvg icon={service.icon} className="h-10 w-10 text-aqua" />
                <p className="mt-4 font-display text-2xl font-extrabold">Price on inspection</p>
                <p className="mt-2 text-slate-200">
                  Every job is different. Send a photo on WhatsApp or call and we&apos;ll give you a quote.
                </p>
                <a
                  href={whatsappUrl(`Hi, I'd like a quote for ${service.title}. My location: `)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-3.5 font-bold text-white hover:bg-whatsapp-dark"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Get a quote
                </a>
              </div>
            )}
          </aside>
        </Container>
      </section>

      {isCleaning && (
        <section className="bg-surface py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="How we clean" title={`Our ${cleaningProcess.length}-step process`} titleKn="ನಮ್ಮ ಶುಚಿಗೊಳಿಸುವ ವಿಧಾನ" center />
            <div className="mt-14">
              <ProcessSteps />
            </div>
          </Container>
        </section>
      )}

      <section className={`py-20 sm:py-24 ${isCleaning ? "" : "bg-surface"}`}>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" title={`${service.title}: FAQs`} />
          <div className="reveal">
            <Faq items={detail.faqs} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">Areas we serve</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink ring-1 ring-slate-200 hover:bg-water-light hover:text-brand"
                  >
                    <PinIcon className="h-4 w-4 text-alert" />
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">Other services</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center justify-between gap-2 rounded-2xl bg-surface px-4 py-3 font-semibold text-ink ring-1 ring-slate-200 hover:bg-water-light hover:text-brand"
                  >
                    {s.title}
                    <ArrowIcon className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABanner />
      <JsonLd
        data={[
          serviceSchema({ name: service.title, description: detail.metaDescription, path }),
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
          faqSchema(detail.faqs),
        ]}
      />
    </>
  );
}
