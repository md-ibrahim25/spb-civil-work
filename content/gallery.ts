// Photos for the "Our Work" page. These are placeholders: drop real photos into
// public/images/gallery/ and update `src` (JPG/PNG work too).

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: "Sump" | "Tank" | "Waterproofing" | "Cleaning" | "Equipment";
};

export const gallery: GalleryItem[] = [
  { src: "/images/tank-cleaning.jpg", alt: "Worker pressure-washing the inside of a large water tank", caption: "Tank pressure wash", category: "Tank" },
  { src: "/images/waterproofing.jpg", alt: "Worker applying waterproof coating to a terrace", caption: "Terrace waterproofing", category: "Waterproofing" },
  { src: "/images/deep-cleaning.jpg", alt: "Bathroom before and after deep cleaning", caption: "Bathroom deep clean", category: "Cleaning" },
  { src: "/images/gallery/sump-before.svg", alt: "Dirty water sump before cleaning", caption: "Sump before cleaning", category: "Sump" },
  { src: "/images/gallery/sump-after.svg", alt: "Clean water sump after cleaning", caption: "Sump after cleaning", category: "Sump" },
  { src: "/images/gallery/tank-before.svg", alt: "Overhead tank with sludge before cleaning", caption: "Tank before cleaning", category: "Tank" },
  { src: "/images/gallery/tank-after.svg", alt: "Overhead tank after cleaning", caption: "Tank after cleaning", category: "Tank" },
  { src: "/images/gallery/equipment.svg", alt: "Pressure washer, vacuum and sludge pump", caption: "Our cleaning equipment", category: "Equipment" },
];
