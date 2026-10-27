// Every image path used on the site, in one place. Files live in public/images:
//   brand/       logo and round emblem
//   hero/        wide banner photos, one per page header (no repeats)
//   services/    one photo per service card, plus the "Why choose us" photo
//   jobs/tanks   and  jobs/sumps   real before/after photos from the client's jobs
// Stock photos are openly licensed; their credits are in content/credits.ts (shown on /credits).
// Only real job photos go in the gallery and before/after sliders.
// To swap a photo, replace the file (same name) or change the path here.

export const images = {
  // Full badge (with ribbon) for larger spaces; round emblem for the header, icons and small spaces.
  // Source artwork: design/spb-civil-work-logo.pdf
  logo: "/images/brand/logo.png",
  emblem: "/images/brand/emblem.png",

  hero: {
    home: "/images/hero/home-tank-cleaning.jpg",
    services: "/images/hero/services-pressure-washing.jpg",
    pricing: "/images/hero/pricing-pressure-washer.jpg",
    gallery: "/images/hero/gallery-water-drop.jpg",
    about: "/images/hero/about-bengaluru-layout.jpg",
    contact: "/images/hero/contact-running-taps.jpg",
    areas: "/images/hero/areas-bengaluru-skyline.jpg",
    reviews: "/images/hero/reviews-glass-of-water.jpg",
  },

  services: {
    tank: "/images/services/tank-rooftop-water-tanks.jpg",
    pipe: "/images/services/pipe-water-valve.jpg",
    grout: "/images/services/grout-floor-work.jpg",
    paint: "/images/services/waterproof-paint.jpg",
    toilet: "/images/services/toilet-cleaning.jpg",
    whyUs: "/images/services/why-us-pressure-washing.jpg",
  },

  tanks: {
    blueBefore: "/images/jobs/tanks/blue-tank-before.jpg",
    blueAfter: "/images/jobs/tanks/blue-tank-after.jpg",
    blueClean: "/images/jobs/tanks/blue-tank-clean.jpg",
    greyBefore: "/images/jobs/tanks/grey-tank-before.jpg",
    greyAfter: "/images/jobs/tanks/grey-tank-after.jpg",
    whiteBefore: "/images/jobs/tanks/white-tank-before.jpg",
    whiteAfter: "/images/jobs/tanks/white-tank-after.jpg",
  },

  sumps: {
    roundBefore: "/images/jobs/sumps/round-sump-before.jpg",
    before: "/images/jobs/sumps/sump-before.jpg",
    tiledAfter: "/images/jobs/sumps/tiled-sump-after.jpg",
    after: "/images/jobs/sumps/sump-after.jpg",
  },
} as const;
