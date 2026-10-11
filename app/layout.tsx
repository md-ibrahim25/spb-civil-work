import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_Kannada, Plus_Jakarta_Sans } from "next/font/google";
import { ContactBar } from "@/components/ContactBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import { site } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--ff-jakarta",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--ff-archivo",
  subsets: ["latin"],
});

const kannada = Noto_Sans_Kannada({
  variable: "--ff-kannada",
  subsets: ["kannada"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Sump & Tank Cleaning in Bengaluru`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "sump cleaning Bengaluru",
    "water tank cleaning Bangalore",
    "sump cleaning Varthur",
    "tank cleaning Whitefield",
    "pipe acid wash",
    "waterproofing Bengaluru",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} | Sump & Tank Cleaning in Bengaluru`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#06142b",
};

// Structured data so search engines can show the business in local results.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phones.map((p) => `+91${p}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.contact.address[0]}, ${site.contact.address[1]}`,
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560087",
    addressCountry: "IN",
  },
  areaServed: site.serviceAreas,
  priceRange: "₹500 – ₹1,400",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${archivo.variable} ${kannada.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ContactBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
