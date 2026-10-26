import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CTABanner } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { beforeAfterPairs, gallery } from "@/content/gallery";
import { images } from "@/content/images";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work: Sump & Tank Cleaning Photos",
  description:
    "Real before and after photos of water sump and overhead tank cleaning jobs in Varthur and east Bengaluru.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image={images.hero.deepCleaning}
        eyebrow="Our work"
        title="See the difference"
        titleKn="ನಮ್ಮ ಕೆಲಸ"
        intro="Real photos from our sump and tank cleaning jobs. Drag the sliders to compare before and after."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {beforeAfterPairs.map((pair, i) => (
              <li key={pair.before} className="reveal">
                <BeforeAfter before={pair.before} after={pair.after} alt={pair.label} eager={i < 3} />
                <p className="mt-3 text-center font-semibold text-ink">{pair.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Gallery" title="More from our jobs" />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {gallery.map((g) => (
              <li key={g.src} className="reveal">
                <figure className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 1024px) 280px, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${
                        g.stage === "Before" ? "bg-night/80 backdrop-blur" : "bg-whatsapp"
                      }`}
                    >
                      {g.stage}
                    </span>
                  </div>
                  <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
                    <span className="text-sm font-semibold text-ink">{g.caption}</span>
                    <span className="hidden rounded-full bg-water-light px-2.5 py-0.5 text-xs font-bold text-brand sm:inline">
                      {g.category}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner />
      <JsonLd data={breadcrumbSchema([{ name: "Our Work", path: "/gallery" }])} />
    </>
  );
}
