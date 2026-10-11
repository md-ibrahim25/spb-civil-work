// Cleaning prices from the client's price list (₹, per sump/tank).
// Sizes outside these rows are shown as "Call for price".

export type PriceRow = { id: string; label: string; price: number };

export const sumpPrices: PriceRow[] = [
  { id: "sump-2000-4000", label: "2,000 – 4,000 L", price: 1000 },
  { id: "sump-5000-6000", label: "5,000 – 6,000 L", price: 1200 },
  { id: "sump-7000-9000", label: "7,000 – 9,000 L", price: 1300 },
  { id: "sump-10000-12000", label: "10,000 – 12,000 L", price: 1400 },
];

export const tankPrices: PriceRow[] = [
  { id: "tank-500", label: "500 L", price: 500 },
  { id: "tank-750", label: "750 L", price: 550 },
  { id: "tank-1000", label: "1,000 L", price: 600 },
  { id: "tank-1500", label: "1,500 L", price: 700 },
  { id: "tank-2000", label: "2,000 L", price: 800 },
  { id: "tank-3000", label: "3,000 L", price: 1000 },
];

export const pricingNotes = [
  "Prices are per sump or tank and include sludge removal, disinfection, pressure wash and drying.",
  "Other sizes, and sumps above 12,000 L or tanks above 3,000 L: call for price.",
  "Pipe acid wash, waterproofing and toilet cleaning are priced after inspection.",
];

export function formatRupees(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

// Shown next to prices so customers know exactly what they're paying for.
export const included = [
  "Sludge & silt removal",
  "Anti-bacterial disinfection",
  "High-pressure wash",
  "Drying before refilling",
  "Site left clean and tidy",
];

export const sizeHelp =
  "Not sure of the size? Check the capacity printed on the tank, or send us a photo on WhatsApp.";
