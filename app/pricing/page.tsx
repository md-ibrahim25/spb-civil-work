import { CTABanner, Faq } from "@/components/Blocks";
import { CheckIcon } from "@/components/Icons";
import { PriceCalculator } from "@/components/PriceCalculator";
import { PriceTable } from "@/components/PriceTable";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { faqs } from "@/content/faq";
import { included, pricingNotes, sumpPrices, tankPrices } from "@/content/pricing";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sump & Tank Cleaning Prices in Bengaluru",
  description:
    "Fixed prices: sump cleaning from ₹1,000 and overhead tank cleaning from ₹500 in Varthur & east Bengaluru. All 4 cleaning steps included.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        image="/images/tank-cleaning.jpg"
        eyebrow="Prices"
        title="Simple, fixed prices"
        titleKn="ಶುಚಿಗೊಳಿಸುವಿಕೆ ದರಗಳು"
        intro="Know the price before we arrive. No hidden charges."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {included.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/15"
            >
              <CheckIcon className="h-4 w-4 text-aqua" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-surface py-20 sm:py-24">
        <Container className="grid items-start gap-6 lg:grid-cols-3">
          <PriceTable caption="Sump cleaning" captionKn="ಸಂಪ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ" icon="sump" rows={sumpPrices} />
          <PriceTable caption="Tank cleaning" captionKn="ಟ್ಯಾಂಕ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ" icon="tank" rows={tankPrices} />
          <div className="lg:sticky lg:top-28">
            <PriceCalculator />
          </div>
        </Container>
        <Container>
          <ul className="reveal mt-8 grid gap-3 rounded-3xl bg-white p-6 text-[15px] text-muted ring-1 ring-slate-200 md:grid-cols-3">
            {pricingNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" title="Good to know" />
          <div className="reveal">
            <Faq />
          </div>
        </Container>
      </section>

      <CTABanner />
      <JsonLd data={[breadcrumbSchema([{ name: "Prices", path: "/pricing" }]), faqSchema(faqs)]} />
    </>
  );
}
