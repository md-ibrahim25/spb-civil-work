import type { Metadata, Viewport } from "next";
import { ContactBar } from "@/components/ContactBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { localBusinessSchema } from "@/lib/seo";
// Fonts are bundled with the site (not fetched from Google at build time).
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/archivo";
import "@fontsource-variable/noto-sans-kannada";
import "./globals.css";
import { prices } from "@/content/pricing";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sump & Tank Cleaning in Varthur, Bengaluru | SPB Cleaning",
    template: `%s | ${site.shortName}`,
  },
  description:
    `Sump and tank cleaning in Varthur, Whitefield & east Bengaluru: sludge removal, disinfection, pressure wash and drying. Fixed prices from ${prices.from}.`,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console HTML-tag verification (optional; DNS verification needs no code).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#06142b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
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
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
