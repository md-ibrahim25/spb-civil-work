// Service areas, each with its own page (/areas/<slug>). Every page needs some text of
// its own, or Google treats them as duplicates. Confirm coverage with the client.

export type Area = {
  slug: string;
  name: string;
  nameKn: string;
  intro: string;
  // Slugs of neighbouring areas, linked at the bottom of the page.
  nearby: string[];
};

export const areas: Area[] = [
  {
    slug: "varthur",
    name: "Varthur",
    nameKn: "ವರ್ತೂರು",
    intro:
      "Varthur is our home area. With a mix of independent houses, new layouts and apartments, most homes here rely on sumps and overhead tanks, and many use borewell water that leaves sludge and scale behind.",
    nearby: ["muthsandra", "gunjur", "whitefield", "sarjapur-road"],
  },
  {
    slug: "muthsandra",
    name: "Muthsandra",
    nameKn: "ಮುತ್ಸಂದ್ರ",
    intro:
      "Our base is in Muthsandra, so homes here get the quickest scheduling. Independent houses with underground sumps are common in the village and surrounding layouts.",
    nearby: ["varthur", "gunjur", "hoskote"],
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    nameKn: "ವೈಟ್‌ಫೀಲ್ಡ್",
    intro:
      "Whitefield's apartments and gated communities have large shared sumps and multiple overhead tanks, while its older neighbourhoods have independent homes. We handle both, from a single tank to a full apartment complex.",
    nearby: ["varthur", "marathahalli", "hoskote"],
  },
  {
    slug: "gunjur",
    name: "Gunjur",
    nameKn: "ಗುಂಜೂರು",
    intro:
      "Gunjur sits right next to Varthur, with fast-growing residential layouts and villa communities. New homes here benefit from a cleaning before first use and every 6 months after.",
    nearby: ["varthur", "muthsandra", "sarjapur-road"],
  },
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    nameKn: "ಸರ್ಜಾಪುರ ರಸ್ತೆ",
    intro:
      "The Sarjapur Road corridor is full of new apartments and villas. Many depend on tanker and borewell water, which brings more silt into sumps and tanks.",
    nearby: ["bellandur", "gunjur", "varthur"],
  },
  {
    slug: "hoskote",
    name: "Hoskote",
    nameKn: "ಹೊಸಕೋಟೆ",
    intro:
      "We serve homes, shops and new construction in and around Hoskote, including pre-handover cleaning of new sumps and tanks.",
    nearby: ["whitefield", "muthsandra"],
  },
  {
    slug: "marathahalli",
    name: "Marathahalli",
    nameKn: "ಮಾರತ್ತಹಳ್ಳಿ",
    intro:
      "Marathahalli's dense mix of apartments, PG accommodations and commercial buildings means sumps and tanks are in heavy use and need regular cleaning to keep water safe.",
    nearby: ["bellandur", "whitefield"],
  },
  {
    slug: "bellandur",
    name: "Bellandur",
    nameKn: "ಬೆಳ್ಳಂದೂರು",
    intro:
      "Bellandur's apartment complexes and offices have large sumps and many tanks. We schedule work to suit residents and keep disruption to a minimum.",
    nearby: ["sarjapur-road", "marathahalli", "varthur"],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
