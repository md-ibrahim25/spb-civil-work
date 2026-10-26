import { images } from "./images";

// Real photos from the client's jobs (paths in content/images.ts).

// Before/after pairs: each pair MUST be the same tank or sump, or the slider misleads customers.
export const beforeAfterPairs = [
  { before: images.tanks.blueBefore, after: images.tanks.blueAfter, label: "Overhead tank (blue)" },
  { before: images.tanks.greyBefore, after: images.tanks.greyAfter, label: "Overhead tank (grey)" },
  { before: images.tanks.whiteBefore, after: images.tanks.whiteAfter, label: "Overhead tank (white)" },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  stage: "Before" | "After";
  category: "Tank" | "Sump";
};

export const gallery: GalleryItem[] = [
  { src: images.sumps.roundBefore, alt: "Round underground sump with sludge and debris before cleaning", caption: "Sump full of sludge", stage: "Before", category: "Sump" },
  { src: images.sumps.tiledAfter, alt: "Tiled underground sump after cleaning", caption: "Tiled sump, cleaned", stage: "After", category: "Sump" },
  { src: images.sumps.before, alt: "Inside of a dirty sump with algae on the walls", caption: "Algae on sump walls", stage: "Before", category: "Sump" },
  { src: images.sumps.after, alt: "Square sump after cleaning and drying", caption: "Sump cleaned and dried", stage: "After", category: "Sump" },
  { src: images.tanks.blueBefore, alt: "Blue overhead tank with dark sludge before cleaning", caption: "Blue tank, before", stage: "Before", category: "Tank" },
  { src: images.tanks.blueAfter, alt: "Blue overhead tank after cleaning", caption: "Blue tank, after", stage: "After", category: "Tank" },
  { src: images.tanks.whiteBefore, alt: "White overhead tank with brown sludge before cleaning", caption: "White tank, before", stage: "Before", category: "Tank" },
  { src: images.tanks.whiteAfter, alt: "White overhead tank after cleaning", caption: "White tank, after", stage: "After", category: "Tank" },
  { src: images.tanks.greyBefore, alt: "Grey overhead tank with dirty water before cleaning", caption: "Grey tank, before", stage: "Before", category: "Tank" },
  { src: images.tanks.greyAfter, alt: "Grey overhead tank after cleaning", caption: "Grey tank, after", stage: "After", category: "Tank" },
  { src: images.tanks.blueClean, alt: "Spotless blue water tank after cleaning", caption: "Tank, ready to refill", stage: "After", category: "Tank" },
];
