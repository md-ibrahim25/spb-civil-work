import Link from "next/link";
import { CTABanner } from "@/components/Blocks";
import { ArrowIcon, PinIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero } from "@/components/Section";
import { areas } from "@/content/areas";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Areas We Serve in East Bengaluru",
  description:
    "Sump and tank cleaning across Varthur, Muthsandra, Whitefield, Gunjur, Sarjapur Road, Hoskote, Marathahalli and Bellandur in east Bengaluru.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        image={images.hero.areas}
        eyebrow="Service areas"
        title="Areas we serve"
        titleKn="ನಾವು ಸೇವೆ ನೀಡುವ ಪ್ರದೇಶಗಳು"
        intro="Based in Muthsandra near Varthur, we cover homes, apartments and businesses across east Bengaluru."
      />

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((a) => (
              <li key={a.slug} className="reveal">
                <Link
                  href={`/areas/${a.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <PinIcon className="h-6 w-6 text-alert" />
                  <h2 className="mt-4 font-display text-xl font-extrabold text-ink">{a.name}</h2>
                  <p lang="kn" className="font-kannada text-sm text-brand">
                    {a.nameKn}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 font-bold text-brand transition-all group-hover:gap-2.5">
                    Sump &amp; tank cleaning <ArrowIcon className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-muted">Not on the list? Call us. We may still cover your area.</p>
        </Container>
      </section>

      <CTABanner />
      <JsonLd data={breadcrumbSchema([{ name: "Areas", path: "/areas" }])} />
    </>
  );
}
