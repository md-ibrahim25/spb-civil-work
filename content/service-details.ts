// Longer copy for each service's own page (/services/<slug>). Written to answer what
// customers search for; keep it accurate and confirm details with the client.

export type ServiceDetail = {
  // <title> and meta description, aimed at local searches.
  seoTitle: string;
  metaDescription: string;
  // Main heading on the page.
  heading: string;
  intro: string[];
  // "When do you need this?" signs.
  signs: string[];
  faqs: { q: string; a: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "sump-cleaning": {
    seoTitle: "Sump Cleaning in Varthur, Bengaluru | From ₹1,000",
    metaDescription:
      "Underground sump cleaning in Varthur, Whitefield & east Bengaluru: sludge removal, disinfection, pressure wash & drying. Fixed prices from ₹1,000.",
    heading: "Water sump cleaning in Bengaluru",
    intro: [
      "Your underground sump stores the water your family drinks, cooks and bathes with. Over time silt settles at the bottom, algae grows on the walls and bacteria build up, especially after the monsoon.",
      "We drain the sump, pump out every bit of sludge with a submersible pump, disinfect the walls and floor with potassium permanganate and bleaching powder, pressure wash every surface and leave it dry and ready to refill.",
    ],
    signs: [
      "Water smells musty or stale",
      "Cloudy, yellow or brown water at the taps",
      "Silt or particles collecting in buckets",
      "More than 6 months since the last cleaning",
    ],
    faqs: [
      {
        q: "How much does sump cleaning cost?",
        a: "₹1,000 for 2,000–4,000 L, ₹1,200 for 5,000–6,000 L, ₹1,300 for 7,000–9,000 L and ₹1,400 for 10,000–12,000 L. Larger sumps: call for a price.",
      },
      {
        q: "How long does sump cleaning take?",
        a: "Most sumps take 2–3 hours, depending on the size and how much sludge has built up.",
      },
    ],
  },
  "tank-cleaning": {
    seoTitle: "Water Tank Cleaning in Bengaluru | From ₹500",
    metaDescription:
      "Overhead water tank cleaning in Varthur, Whitefield & east Bengaluru for 500 L to 3,000 L tanks. Sludge removal, anti-bacterial spray, pressure wash. From ₹500.",
    heading: "Overhead water tank cleaning in Bengaluru",
    intro: [
      "Rooftop tanks heat up in the sun, which helps algae and bacteria grow, and dust and leaves find their way in. Even a closed plastic tank collects a layer of sludge at the bottom within months.",
      "We clean plastic (Sintex-type) and concrete overhead tanks from 500 L upwards: draining, vacuuming out the dirt, spraying an anti-bacterial solution on every inside surface, rinsing and drying before refilling.",
    ],
    signs: [
      "Green or slimy inside walls",
      "Dirt or worms coming from the taps",
      "Odd taste or smell in the water",
      "Low flow from a clogged outlet",
    ],
    faqs: [
      {
        q: "How much does tank cleaning cost?",
        a: "₹500 for 500 L, ₹550 for 750 L, ₹600 for 1,000 L, ₹700 for 1,500 L, ₹800 for 2,000 L and ₹1,000 for 3,000 L.",
      },
      {
        q: "Can you clean several tanks in one visit?",
        a: "Yes. Tell us how many tanks and their sizes when you book and we'll plan the visit.",
      },
    ],
  },
  "pipe-acid-wash": {
    seoTitle: "Water Pipe Acid Wash in Bengaluru",
    metaDescription:
      "Acid wash for water pipelines in Varthur & east Bengaluru. Removes hard-water scale and rust to bring back water pressure. Price after inspection. Call or WhatsApp.",
    heading: "Water pipeline acid wash",
    intro: [
      "Bengaluru's borewell water is often hard. Over the years, scale and rust coat the inside of pipes, narrowing them until taps and showers only trickle.",
      "An acid wash flushes a descaling solution through the pipeline to dissolve these deposits, followed by a thorough rinse so only clean water flows.",
    ],
    signs: ["Low pressure at taps and showers", "White scale on fittings", "Rusty or discoloured water", "Pipes over 5 years old with hard water"],
    faqs: [
      {
        q: "How much does a pipe acid wash cost?",
        a: "It depends on the length and layout of the pipeline, so we quote after a quick inspection.",
      },
    ],
  },
  "waterproof-grouting": {
    seoTitle: "Waterproof Grouting in Bengaluru: Stop Leaks",
    metaDescription:
      "Waterproof grouting in Varthur & east Bengaluru to seal cracks and joints in sumps, tanks, terraces and bathrooms. Stop leaks and seepage. Price after inspection.",
    heading: "Waterproof grouting",
    intro: [
      "Small cracks and open joints let water seep out of sumps and tanks, and into walls and ceilings below terraces and bathrooms. Left alone, seepage leads to damp patches, peeling paint and weakened concrete.",
      "We clean out the cracks and joints and fill them with waterproof grout to seal the leak at the source.",
    ],
    signs: ["Damp patches on walls or ceilings", "Sump water level dropping on its own", "Cracks in sump, tank or terrace", "Leaks below bathrooms"],
    faqs: [
      {
        q: "Can you fix a leaking sump?",
        a: "Yes. We inspect the sump, locate the cracks and joints that leak, and seal them with waterproof grouting.",
      },
    ],
  },
  "waterproof-paint": {
    seoTitle: "Terrace & Wall Waterproofing Paint, Bengaluru",
    metaDescription:
      "Waterproof coatings for terraces, roofs, exterior walls, sumps and tanks in Varthur & east Bengaluru. Keep monsoon rain out. Price after inspection.",
    heading: "Waterproof painting",
    intro: [
      "Terraces and exterior walls take the full force of Bengaluru's monsoon. Once water gets into the concrete it causes leaks, damp and peeling paint inside the house.",
      "We apply waterproof coatings on terraces, roofs and walls, and food-safe coatings inside water tanks and sumps, to keep moisture out.",
    ],
    signs: ["Leaks from the ceiling during rain", "Damp or peeling interior walls", "Water pooling on the terrace", "Before the monsoon season"],
    faqs: [
      {
        q: "When is the best time for terrace waterproofing?",
        a: "Before the monsoon, on a dry surface. Book early so the coating has time to cure before the rains.",
      },
    ],
  },
  "toilet-cleaning": {
    seoTitle: "Bathroom & Toilet Deep Cleaning, Bengaluru",
    metaDescription:
      "Toilet and bathroom deep cleaning in Varthur & east Bengaluru: hard-water stains, scale and odour removed, tiles and fittings cleaned, disinfected. Price after inspection.",
    heading: "Toilet & bathroom deep cleaning",
    intro: [
      "Hard water leaves stubborn white and yellow stains on tiles, taps and toilets that normal cleaning can't shift.",
      "Our deep clean removes scale and stains from tiles, fittings and floors, and disinfects and deodorises the whole bathroom.",
    ],
    signs: ["Hard-water stains on tiles and taps", "Persistent odour", "Moving into a new or rented home", "Before guests or a function"],
    faqs: [
      {
        q: "Do you bring your own cleaning materials?",
        a: "Yes, our team brings the equipment and cleaning materials needed for the job.",
      },
    ],
  },
};
