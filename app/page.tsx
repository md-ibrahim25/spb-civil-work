import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { AreaMarquee, Audiences, BookingSteps, CTABanner, Faq, ProcessSteps, ServiceBento, TrustStrip } from "@/components/Blocks";
import { ArrowIcon, CheckIcon, ClockIcon, DropIcon, PhoneIcon, PinIcon, ShieldIcon, SparkleIcon, WhatsAppIcon } from "@/components/Icons";
import { PriceCalculator } from "@/components/PriceCalculator";
import { JsonLd } from "@/components/JsonLd";
import { Container, DarkBackdrop, SectionHeading } from "@/components/Section";
import { faqs } from "@/content/faq";
import { beforeAfterPairs } from "@/content/gallery";
import { images } from "@/content/images";
import { included, prices } from "@/content/pricing";
import { cleaningProcess, equipment, services } from "@/content/services";
import { directionsUrl, heroImage, site, phoneHref, formatPhone } from "@/content/site";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Sump & Tank Cleaning in Varthur, Bengaluru | SPB Cleaning",
  description:
    `Sump and tank cleaning in Varthur, Whitefield & east Bengaluru: sludge removal, disinfection, pressure wash and drying. Fixed prices from ${prices.from}.`,
  path: "/",
  exactTitle: true,
});

const quickFacts = [
  { icon: SparkleIcon, value: `${cleaningProcess.length}-step`, label: "deep clean" },
  { icon: ShieldIcon, value: "Safe", label: "disinfectants" },
  { icon: ClockIcon, value: "1–3 hrs", label: "most jobs" },
];

const reasons = [
  {
    icon: ShieldIcon,
    title: "Safe for drinking water",
    text: "Potassium permanganate and chlorine kill bacteria and algae, then everything is rinsed clean.",
  },
  {
    icon: DropIcon,
    title: "Proper machines",
    text: "Pressure washer, wet/dry vacuum and sludge pump: far more thorough than buckets and brushes.",
  },
  {
    icon: ClockIcon,
    title: "Your date, your time",
    text: "Pick a slot that suits you. Most tanks are done in an hour or two.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <DarkBackdrop underHeader image={heroImage}>
        <Container className="grid items-center gap-12 pb-24 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-32 lg:pt-20">
          <div>
            {/* The h1 carries the search phrase; the big slogan below is presentational. */}
            <h1 className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-aqua ring-1 ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden />
              Sump &amp; tank cleaning in Varthur, Bengaluru
            </h1>
            <p className="mt-5 font-display text-[2.6rem] font-black leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              Clean sumps.
              <br />
              Safe tanks.
              <br />
              <span className="text-gradient">Healthy water.</span>
            </p>
            <p lang="kn" className="mt-4 font-kannada text-lg text-water">
              {site.taglineKn}
            </p>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Professional water sump and overhead tank cleaning for homes, apartments and businesses in Varthur,
              Whitefield and east Bengaluru. We remove the sludge, disinfect, pressure wash and dry, so your family
              gets clean, safe water. Fixed prices, from {prices.from}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappUrl("Hi, I'd like to book a sump/tank cleaning. My location:  Preferred date & time: ")}
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
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-semibold text-slate-200 transition hover:text-white sm:px-3"
              >
                <PinIcon className="h-5 w-5" /> Directions
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {quickFacts.map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                  <Icon className="h-5 w-5 text-aqua" />
                  <dt className="sr-only">{label}</dt>
                  <dd className="mt-2">
                    <span className="block font-display text-xl font-bold text-white">{value}</span>
                    <span className="block text-xs text-slate-400">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:animate-float">
            <PriceCalculator />
          </div>
        </Container>
      </DarkBackdrop>

      <TrustStrip />

      {/* Services */}
      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Everything for clean water and a leak-free home"
            />
            <Link
              href="/services"
              className="reveal inline-flex shrink-0 items-center gap-2 font-bold text-brand hover:gap-3 hover:underline"
            >
              All service details <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <ServiceBento services={services} />
          </div>
        </Container>
      </section>

      {/* Before / after */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal mx-auto w-full max-w-md">
            <BeforeAfter
              before={beforeAfterPairs[0].before}
              after={beforeAfterPairs[0].after}
              alt={beforeAfterPairs[0].label}
            />
            <p className="mt-3 text-center text-sm text-muted">Drag the slider to compare</p>
          </div>
          <div>
            <SectionHeading
              eyebrow="See the difference"
              title="What's hiding in your tank?"
              intro="These are real photos from our jobs. Over months, sumps and tanks collect silt, algae and bacteria that end up in the water you drink, cook and bathe with. A proper cleaning removes all of it."
            />
            <div className="reveal mt-8 rounded-3xl bg-surface p-6 ring-1 ring-slate-200">
              <h3 className="font-bold text-ink">Every cleaning includes</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-ink">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we clean"
            title={`Our ${cleaningProcess.length}-step deep clean`}
            titleKn="ನಮ್ಮ ಶುಚಿಗೊಳಿಸುವ ವಿಧಾನ"
            center
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      {/* Why us */}
      <DarkBackdrop>
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              dark
              eyebrow="Why choose us"
              title={<>Cleaned properly, <span className="text-gradient">the first time</span></>}
            />
            <ul className="reveal mt-8 flex flex-wrap gap-2">
              {equipment.map((e) => (
                <li key={e.name} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-white/15">
                  {e.name}
                </li>
              ))}
            </ul>
            <div className="reveal relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/15">
              <Image
                src={images.hero.waterproofing}
                alt="Our team applying waterproof coating on a terrace"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="reveal flex gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua to-brand text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{title}</h3>
                  <p className="mt-1 text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </DarkBackdrop>

      {/* Who we work for */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Who we help"
            title="For every home and building"
            intro="From a single overhead tank to an apartment complex's sumps."
          />
          <div className="mt-12">
            <Audiences />
          </div>
        </Container>
      </section>

      {/* How booking works */}
      <section className="bg-water-light/60 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Easy booking" title="Book in 3 simple steps" center />
          <div className="mt-12">
            <BookingSteps />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="Good to know"
              intro="Answers to what customers ask us most. Anything else? Just call or WhatsApp."
            />
            <a
              href={phoneHref(site.contact.phones[0])}
              className="reveal mt-6 inline-flex items-center gap-2 font-bold text-brand hover:underline"
            >
              <PhoneIcon className="h-5 w-5" /> {formatPhone(site.contact.phones[0])}
            </a>
          </div>
          <div className="reveal">
            <Faq />
          </div>
        </Container>
      </section>

      <div className="pt-16">
        <SectionHeading eyebrow="Service areas" title="Serving Varthur & nearby" center />
        <div className="mt-8">
          <AreaMarquee />
        </div>
      </div>

      <CTABanner />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
