import Image from "next/image";
import { CTABanner } from "@/components/Blocks";
import { CheckIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { site } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";
import { cleaningProcess } from "@/content/services";

export const metadata = pageMetadata({
  title: "About Us: Local Sump & Tank Cleaners in Varthur",
  description:
    "SPB Civil Work Cleaning Service is a local team in Muthsandra, Varthur, cleaning water sumps and tanks and waterproofing homes across east Bengaluru.",
  path: "/about",
});

// Placeholder copy: confirm the story, years in business and team details with the client.
const values = [
  "Clean, safe drinking water for every family",
  "Honest, fixed prices with no surprises",
  "Proper equipment and safe disinfectants",
  "On time, and we leave the site tidy",
];

const signs = [
  "Water smells or tastes odd",
  "Water looks cloudy or yellowish",
  "Sludge or particles in buckets",
  "It's been 6 months since the last clean",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={images.hero.about}
        eyebrow="About us"
        title="A local team that cares about your water"
        titleKn="ನಮ್ಮ ಬಗ್ಗೆ"
        intro={site.tagline}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Who we are" title="Based in Muthsandra, serving east Bengaluru" />
            <div className="reveal mt-6 space-y-4 text-lg text-muted">
              <p>
                {site.name} serves homes, apartments and businesses across Varthur, Whitefield and nearby areas.
              </p>
              <p>
                Dirty sumps and tanks collect sludge, algae and bacteria that end up in the water you drink, cook
                and bathe with. We clean them properly, with a tested {cleaningProcess.length}-step process and professional machines,
                so your family gets clean, safe water.
              </p>
              <p>
                Besides cleaning, we also handle pipe acid wash, waterproof grouting, waterproof paint and toilet
                cleaning, so one call takes care of your water and leak problems.
              </p>
            </div>
          </div>
          <div className="space-y-8">
          <Image
            src={images.logo}
            alt="SPB Civil Work Tank & Sump Cleaning badge"
            width={800}
            height={855}
            sizes="280px"
            className="reveal mx-auto h-auto w-56 sm:w-64"
          />
          <div className="reveal rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-xl shadow-brand/20">
            <h2 className="font-display text-2xl font-bold">What we stand for</h2>
            <ul className="mt-6 space-y-4">
              {values.map((v) => (
                <li key={v} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua text-night">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Is it time?"
            title="Signs your sump or tank needs cleaning"
            intro="We recommend cleaning every 6 months. Book sooner if you notice any of these."
            center
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {signs.map((s, i) => (
              <li key={s} className="reveal rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <span className="font-display text-4xl font-bold text-water">0{i + 1}</span>
                <p className="mt-3 font-semibold text-ink">{s}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner />
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
    </>
  );
}
