import type { Metadata } from "next";
import { areas } from "@/content/areas";
import { sumpPrices, tankPrices } from "@/content/pricing";
import { services } from "@/content/services";
import { site } from "@/content/site";

// Metadata for a page: title, description, canonical URL and social share tags.
// The share image comes from the nearest opengraph-image file.
export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  exactTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  // Share image path; defaults to the site-wide one (app/opengraph-image.tsx).
  image?: string;
  // Skip the "| SPB Cleaning" suffix (for titles that already name the business).
  exactTitle?: boolean;
}): Metadata {
  return {
    title: exactTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

const businessId = () => absoluteUrl("/#business");

// The business itself. Rendered on every page from the root layout.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId(),
    name: site.name,
    alternateName: site.nameKn,
    description: site.description,
    url: site.url,
    image: absoluteUrl("/images/tank-cleaning.jpg"),
    logo: absoluteUrl("/icon.svg"),
    telephone: site.contact.phones.map((p) => `+91${p}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address[0]}, ${site.contact.address[1]}`,
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560087",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.contact.opens,
      closes: site.contact.closes,
    },
    areaServed: areas.map((a) => ({ "@type": "Place", name: `${a.name}, Bengaluru` })),
    priceRange: "₹500 – ₹1,400",
    currenciesAccepted: "INR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning and waterproofing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
        ...(s.slug === "sump-cleaning" || s.slug === "tank-cleaning"
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "INR",
                minPrice: Math.min(...(s.slug === "sump-cleaning" ? sumpPrices : tankPrices).map((r) => r.price)),
                maxPrice: Math.max(...(s.slug === "sump-cleaning" ? sumpPrices : tankPrices).map((r) => r.price)),
              },
            }
          : {}),
      })),
    },
  };
}

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": businessId() },
    areaServed: areas.map((a) => ({ "@type": "Place", name: `${a.name}, Bengaluru` })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
