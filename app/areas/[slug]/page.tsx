import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingSteps, CTABanner, ServiceCard } from "@/components/Blocks";
import { PinIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PriceCalculator } from "@/components/PriceCalculator";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { areas, getArea } from "@/content/areas";
import { services } from "@/content/services";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: `Sump & Tank Cleaning in ${area.name}, Bengaluru`,
    description: `Sump and tank cleaning in ${area.name}, Bengaluru: sludge removal, disinfection, pressure wash and drying. Fixed prices from ₹500. Book on WhatsApp.`,
    path: `/areas/${slug}`,
    image: `/areas/${slug}/opengraph-image`,
  });
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const path = `/areas/${slug}`;
  const nearby = area.nearby.map(getArea).filter((a) => a !== undefined);

  return (
    <>
      <PageHero
        image="/images/tank-cleaning.jpg"
        eyebrow={`Serving ${area.name}`}
        title={`Sump & tank cleaning in ${area.name}`}
        titleKn={area.nameKn}
        intro={area.intro}
      />

      <section className="bg-surface py-20 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading
              eyebrow={`In ${area.name}`}
              title={`Clean, safe water for homes in ${area.name}`}
              intro={`Our team comes to your home or building in ${area.name} with a sludge pump, wet/dry vacuum and pressure washer. We clean the sump or tank in 4 steps (sludge removal, anti-bacterial spray, pressure wash and drying) at the same fixed prices across our service area.`}
            />
            <div className="mt-10">
              <BookingSteps />
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <PriceCalculator />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Services" title={`Our services in ${area.name}`} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} featured={i < 2} />
            ))}
          </div>
        </Container>
      </section>

      {nearby.length > 0 && (
        <section className="pb-4">
          <Container>
            <h2 className="font-display text-2xl font-extrabold text-ink">Nearby areas we serve</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {nearby.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 font-semibold text-ink ring-1 ring-slate-200 hover:bg-water-light hover:text-brand"
                  >
                    <PinIcon className="h-4 w-4 text-alert" />
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="flex items-center rounded-full px-4 py-2 font-semibold text-brand hover:underline">
                  All areas →
                </Link>
              </li>
            </ul>
          </Container>
        </section>
      )}

      <CTABanner />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Areas", path: "/areas" },
          { name: area.name, path },
        ])}
      />
    </>
  );
}
