import { CTABanner, ProcessSteps, ServiceCard } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { equipment, services } from "@/content/services";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sump, Tank Cleaning & Waterproofing in Bengaluru",
  description:
    "Water sump and overhead tank cleaning, pipe acid wash, waterproof grouting, waterproof paint and toilet cleaning in Varthur, Whitefield and east Bengaluru.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="/images/waterproofing.jpg"
        eyebrow="Our services"
        title="Cleaning, disinfection & waterproofing"
        titleKn="ನಮ್ಮ ಸೇವೆಗಳು"
        intro="For homes, apartments and commercial buildings across Varthur and east Bengaluru."
      />

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} detailed featured={i < 2} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Sump & tank cleaning"
            title="How we clean your sump or tank"
            titleKn="ನಮ್ಮ ಶುಚಿಗೊಳಿಸುವ ವಿಧಾನ"
            center
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Equipment" title="Professional machines, not just buckets" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {equipment.map((e, i) => (
              <li key={e.name} className="reveal rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                <span className="font-display text-4xl font-bold text-water">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{e.name}</h3>
                <p className="mt-1 text-muted">{e.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner />
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
    </>
  );
}
