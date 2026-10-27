import { areas } from "./areas";
import { images } from "./images";

// Business details used across the whole site. Edit here to update everywhere.
// Values marked "placeholder" / "default" are awaiting confirmation from the client.

// The site's main address, matching the logo badge. Vercel redirects the bare
// spbcivilworks.com here (Vercel → Project → Settings → Domains).
export const domain = "www.spbcivilworks.com";

// NEXT_PUBLIC_SITE_URL wins if set. Production uses the custom domain; Vercel preview
// deployments use their own address; local development uses localhost.
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production") return `https://${domain}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "SPB Civil Work Cleaning Service",
  shortName: "SPB Cleaning",
  nameKn: "ಎಸ್ ಪಿ ಬಿ ಸಿವಿಲ್ ವರ್ಕ್ ಕ್ಲೀನಿಂಗ್ ಸರ್ವೀಸ್",
  tagline: "Water sump & tank cleaning in Bengaluru",
  taglineKn: "ನೀರಿನ ಸಂಪ್ ಮತ್ತು ಟ್ಯಾಂಕ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ",
  description:
    "Professional water sump and overhead tank cleaning, pipe acid wash, waterproof grouting, waterproof paint and toilet cleaning in Varthur and nearby areas of Bengaluru.",
  // Absolute site address for the sitemap, canonical tags and share previews.
  url: siteUrl(),

  contact: {
    phones: ["9148298431", "9707045806"],
    // Number that receives WhatsApp booking requests (default: first number).
    whatsapp: "9148298431",
    email: "", // placeholder: add when the client confirms one
    address: [
      "C/o Maruthi Building, Opp. BSNL Exchange",
      "Muthsandra Village, Via Varthur",
      "Bengaluru – 560087",
    ],
    addressKn:
      "C/o ಮಾರುತಿ ಬಿಲ್ಡಿಂಗ್ ಎದುರು, BSNL ಎಕ್ಸ್‌ಚೇಂಜ್, ಮುತ್ಸಂದ್ರ ಗ್ರಾಮ, ವರ್ತೂರ್ ಮೂಲಕ, ಬೆಂಗಳೂರು - 87",
    hours: "Mon – Sun, 8:00 am – 7:00 pm", // placeholder
    // Same hours in machine-readable form for Google (keep in sync with `hours`).
    opens: "08:00",
    closes: "19:00",
    mapQuery: "Muthsandra, Varthur, Bengaluru 560087",
  },

  // "Write a review" link from the client's Google Business Profile
  // (Profile → Ask for reviews → copy link). Leave null until the profile exists.
  googleReviewUrl: null as string | null,

  // Names of the areas we serve (details in content/areas.ts).
  serviceAreas: areas.map((a) => a.name),

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Prices", href: "/pricing" },
    { label: "Our Work", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const phoneHref = (phone: string) => `tel:+91${phone}`;

export function formatPhone(phone: string) {
  return `${phone.slice(0, 5)} ${phone.slice(5)}`;
}

// "How booking works" steps shown on the home and contact pages.
export const bookingSteps = [
  {
    title: "Message or call us",
    text: "Share your location, sump/tank size and preferred date & time.",
  },
  {
    title: "We confirm the slot",
    text: "We reply with the price and confirm a time that suits you.",
  },
  {
    title: "We clean, you relax",
    text: "Our team arrives with all equipment and leaves your water clean.",
  },
];

// Full-width photo behind the home hero. Set to null for a plain dark background.
export const heroImage: string | null = images.hero.home;

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.contact.mapQuery,
)}`;

// Short reasons to trust us, shown in the strip under the home hero.
export const trustPoints = [
  { title: "Fixed prices", text: "Know the cost upfront" },
  { title: "Professional equipment", text: "Pumps, vacuums, pressure washers" },
  { title: "Homes to commercial", text: "Any size of sump or tank" },
  { title: "Local team", text: "Varthur & east Bengaluru" },
];

// Who we work for ("For every space" section on the home page).
export const audiences = [
  { title: "Independent homes", text: "Sumps, overhead tanks, bathrooms and terraces." },
  { title: "Apartments", text: "Large sumps and multiple tanks, scheduled to suit residents." },
  { title: "Shops & offices", text: "Clean water and leak-free buildings with minimal disruption." },
  { title: "New construction", text: "Pre-handover cleaning of new sumps and tanks." },
];
