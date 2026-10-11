// Services from the client's flyer. `icon` picks an illustration in components/Icons.tsx.

export type ServiceIcon = "sump" | "tank" | "pipe" | "grout" | "paint" | "toilet";

export type Service = {
  slug: string;
  title: string;
  titleKn: string;
  icon: ServiceIcon;
  category: "Cleaning" | "Waterproofing";
  // Photo shown at the top of the service card (optional).
  image?: string;
  summary: string;
  points: string[];
  // Shown on the services page. "See price list" links to /pricing.
  price: string;
};

export const services: Service[] = [
  {
    slug: "sump-cleaning",
    title: "Water Sump Cleaning",
    titleKn: "ನೀರಿನ ಸಂಪ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ",
    icon: "sump",
    category: "Cleaning",
    image: "/images/tank-cleaning.jpg",
    summary:
      "Complete cleaning of underground water sumps: sludge removal, disinfection, pressure wash and drying.",
    points: [
      "Sludge and silt removed with a submersible pump",
      "Walls and floor scrubbed and pressure washed",
      "Disinfected with potassium permanganate and chlorine",
    ],
    price: "From ₹1,000",
  },
  {
    slug: "tank-cleaning",
    title: "Overhead Tank Cleaning",
    titleKn: "ಟ್ಯಾಂಕ್ ಶುಚಿಗೊಳಿಸುವಿಕೆ",
    icon: "tank",
    category: "Cleaning",
    image: "/images/tank-cleaning.jpg",
    summary:
      "Plastic (Sintex-type) and concrete overhead tanks cleaned and disinfected, 500 L and up.",
    points: [
      "Dirt and algae removed with a wet/dry vacuum",
      "Anti-bacterial spray on all inside surfaces",
      "Rinsed and dried before refilling",
    ],
    price: "From ₹500",
  },
  {
    slug: "pipe-acid-wash",
    title: "Pipe Acid Wash",
    titleKn: "ನೀರಿನ ಪೈಪ್‌ಲೈನ್ ಆಮ್ಲ ತೊಳೆಯುವುದು",
    icon: "pipe",
    category: "Cleaning",
    summary:
      "Acid flushing of water pipelines to clear scale, rust and deposits that reduce water flow.",
    points: [
      "Improves water pressure at taps and showers",
      "Removes hard-water scale build-up",
      "Pipes flushed clean after treatment",
    ],
    price: "Price on inspection",
  },
  {
    slug: "waterproof-grouting",
    title: "Waterproof Grouting",
    titleKn: "ಜಲನಿರೋಧಕ ಗ್ರೌಟಿಂಗ್",
    icon: "grout",
    category: "Waterproofing",
    image: "/images/waterproofing.jpg",
    summary:
      "Seals cracks and joints in sumps, tanks, terraces and bathrooms to stop leaks and seepage.",
    points: [
      "Crack and joint sealing",
      "Sump and tank leak repair",
      "Quality waterproofing chemicals",
    ],
    price: "Price on inspection",
  },
  {
    slug: "waterproof-paint",
    title: "Waterproof Paint",
    titleKn: "ಜಲನಿರೋಧಕ ಬಣ್ಣ",
    icon: "paint",
    category: "Waterproofing",
    image: "/images/waterproofing.jpg",
    summary:
      "Waterproof coatings for terraces, walls, sumps and tanks to keep moisture out for years.",
    points: [
      "Terrace and roof coating",
      "Exterior wall protection",
      "Food-safe coatings for water tanks",
    ],
    price: "Price on inspection",
  },
  {
    slug: "toilet-cleaning",
    title: "Toilet Cleaning",
    titleKn: "ಶೌಚಾಲಯ ಶುಚಿಗೊಳಿಸುವಿಕೆ",
    icon: "toilet",
    category: "Cleaning",
    image: "/images/deep-cleaning.jpg",
    summary:
      "Deep cleaning of toilets and bathrooms: stain, scale and odour removal.",
    points: [
      "Hard-water stain and scale removal",
      "Tiles, fittings and floor deep-cleaned",
      "Disinfected and deodorised",
    ],
    price: "Price on inspection",
  },
];

// The 4-step cleaning procedure from the client's price list.
export const cleaningProcess = [
  {
    title: "Sludge removal",
    titleKn: "ಕೆಸರು ತೆಗೆಯುವಿಕೆ",
    text: "Water drained and all sludge, silt and debris pumped out.",
  },
  {
    title: "Anti-bacterial spray",
    titleKn: "ಬ್ಯಾಕ್ಟೀರಿಯಾ ನಿರೋಧಕ ಸ್ಪ್ರೇ",
    text: "Potassium permanganate and bleaching powder (chlorine) kill germs and algae.",
  },
  {
    title: "Pressure wash",
    titleKn: "ಪ್ರೆಶರ್ ವಾಶ್",
    text: "High-pressure water jet cleans every wall, corner and the floor.",
  },
  {
    title: "Drying",
    titleKn: "ಒಣಗಿಸುವಿಕೆ",
    text: "Excess water removed and the sump or tank left dry, ready to refill.",
  },
];

export const equipment = [
  { name: "Pressure washer", text: "High-pressure jet for walls and floors" },
  { name: "Wet & dry vacuum", text: "Removes water, dirt and fine sludge" },
  { name: "Submersible sludge pump", text: "Empties sumps quickly and completely" },
];
