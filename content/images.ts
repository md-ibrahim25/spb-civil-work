// Every image path used on the site, in one place. Files live in public/images:
//   brand/      logo
//   hero/       wide banner photos for page headers
//   jobs/tanks  and  jobs/sumps   real before/after photos from the client's jobs
// To swap a photo, replace the file (same name) or change the path here.

export const images = {
  // Full badge (with ribbon) for larger spaces; round emblem for the header, icons and small spaces.
  // Source artwork: design/spb-civil-work-logo.pdf
  logo: "/images/brand/logo.png",
  emblem: "/images/brand/emblem.png",

  hero: {
    tankCleaning: "/images/hero/tank-cleaning.jpg",
    waterproofing: "/images/hero/waterproofing.jpg",
    deepCleaning: "/images/hero/deep-cleaning.jpg",
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
