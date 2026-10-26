// Cleaning prices from the client's rate chart (₹, per sump/tank).
// Everything else on the site ("from ₹…", price ranges) is worked out from these lists,
// so a price change only needs editing here.

export type PriceRow = { id: string; label: string; price: number };

export const sumpPrices: PriceRow[] = [
  { id: "sump-3000-4000", label: "3,000 – 4,000 L", price: 1100 },
  { id: "sump-5000-6000", label: "5,000 – 6,000 L", price: 1200 },
  { id: "sump-7000-8000", label: "7,000 – 8,000 L", price: 1300 },
  { id: "sump-9000-10000", label: "9,000 – 10,000 L", price: 1400 },
  { id: "sump-11000-12000", label: "11,000 – 12,000 L", price: 1500 },
  { id: "sump-14000-18000", label: "14,000 – 18,000 L", price: 1600 },
];

export const tankPrices: PriceRow[] = [
  { id: "tank-500", label: "500 L", price: 400 },
  { id: "tank-750", label: "750 L", price: 450 },
  { id: "tank-1000", label: "1,000 L", price: 600 },
  { id: "tank-1500", label: "1,500 L", price: 700 },
  { id: "tank-2000", label: "2,000 L", price: 800 },
  { id: "tank-3000", label: "3,000 L", price: 900 },
  { id: "tank-5000", label: "5,000 L", price: 1000 },
];

export function formatRupees(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const lowest = (rows: PriceRow[]) => Math.min(...rows.map((r) => r.price));
const highest = (rows: PriceRow[]) => Math.max(...rows.map((r) => r.price));

// Derived figures used in headings, descriptions and structured data.
export const prices = {
  sumpFrom: formatRupees(lowest(sumpPrices)),
  tankFrom: formatRupees(lowest(tankPrices)),
  from: formatRupees(Math.min(lowest(sumpPrices), lowest(tankPrices))),
  min: Math.min(lowest(sumpPrices), lowest(tankPrices)),
  max: Math.max(highest(sumpPrices), highest(tankPrices)),
  largestSump: sumpPrices[sumpPrices.length - 1].label.split("–").pop()!.trim(),
  largestTank: tankPrices[tankPrices.length - 1].label,
};

// "₹1,100 for 3,000 – 4,000 L, ₹1,200 for …" for FAQ answers.
export function priceSentence(rows: PriceRow[]) {
  return rows.map((r) => `${formatRupees(r.price)} for ${r.label}`).join(", ");
}

export const pricingNotes = [
  "Prices are per sump or tank and include every cleaning step: de-watering, sludge removal, disinfection, pressure wash, vacuum cleaning and drying.",
  `Other sizes, sumps above ${prices.largestSump} and tanks above ${prices.largestTank}: call for price.`,
  "Tiled sumps: we confirm the price over the phone.",
  "Pipe acid wash, waterproofing and toilet cleaning are priced after inspection.",
];

// Shown next to prices so customers know exactly what they're paying for.
export const included = [
  "De-watering",
  "Sludge & silt removal",
  "Anti-bacterial disinfection",
  "High-pressure wash",
  "Vacuum cleaning",
  "Drying before refilling",
];

export const sizeHelp =
  "Not sure of the size? Check the capacity printed on the tank, or send us a photo on WhatsApp.";
