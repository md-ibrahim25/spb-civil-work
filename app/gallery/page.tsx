import type { Metadata } from "next";
import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CTABanner } from "@/components/Blocks";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Before and after photos of sump cleaning, tank cleaning and waterproofing jobs.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image="/images/deep-cleaning.jpg"
        eyebrow="Our work"
        title="See the difference"
        titleKn="ನಮ್ಮ ಕೆಲಸ"
        intro="Before and after photos from recent cleaning and waterproofing jobs."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-2">
          <div className="reveal">
            <BeforeAfter before="/images/gallery/sump-before.svg" after="/images/gallery/sump-after.svg" alt="Water sump" eager />
            <p className="mt-3 text-center font-semibold text-ink">Sump cleaning</p>
          </div>
          <div className="reveal">
            <BeforeAfter before="/images/gallery/tank-before.svg" after="/images/gallery/tank-after.svg" alt="Overhead tank" eager />
            <p className="mt-3 text-center font-semibold text-ink">Tank cleaning</p>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Gallery" title="More from our jobs" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <li key={g.src} className="reveal">
                <figure className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                  <div className="overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={800}
                      height={600}
                      className="aspect-[4/3] h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-2 px-5 py-4">
                    <span className="font-semibold text-ink">{g.caption}</span>
                    <span className="rounded-full bg-water-light px-3 py-1 text-xs font-bold text-brand">{g.category}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
