# SPB Civil Work Cleaning Service — Website

Marketing site for a water sump & tank cleaning business in Varthur, Bengaluru.
Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

## Pages

| Route       | Content                                                        |
| ----------- | -------------------------------------------------------------- |
| `/`         | Hero, price checker, services, 4-step process, service areas   |
| `/services` | All six services in detail, cleaning process, equipment        |
| `/pricing`  | Sump and tank price tables + price checker                     |
| `/gallery`  | Before/after photos                                            |
| `/about`    | Company story and values                                       |
| `/contact`  | Booking form (sends to WhatsApp), phone numbers, address, map  |

Bookings don't go to a server: the booking form and "Book on WhatsApp" buttons open
WhatsApp with the customer's details pre-filled, sent to `site.contact.whatsapp`.

## Editing content

All business details live in `content/`, so you rarely need to touch components:

- `content/site.ts`: name, phone numbers, WhatsApp number, address, hours, service areas, menu
- `content/services.ts`: services, the 4-step cleaning process, equipment
- `content/pricing.ts`: sump and tank price lists and notes
- `content/gallery.ts`: gallery photos and captions
- `content/faq.ts`: frequently asked questions

**Photos:** `public/images/tank-cleaning.jpg`, `waterproofing.jpg` and `deep-cleaning.jpg`
were taken from the reference site (spb-cleaning.lovable.app). They're used for the home hero
(`heroImage` in `content/site.ts`), page headers, service cards and the gallery. The drawn
before/after images in `public/images/gallery/*.svg` are placeholders; replace them with real
job photos and update `content/gallery.ts`.

**Logo:** `components/Logo.tsx` (header/footer) and `app/icon.svg` (browser tab icon).

## To confirm with the client

These are defaults, marked "placeholder" in the content files:

- [ ] Prices: OK to show publicly? Prices for sizes not on the list (e.g. 4,000–5,000 L sumps)
- [ ] Prices for pipe acid wash, waterproofing and toilet cleaning (currently "Price on inspection")
- [ ] Which number receives WhatsApp bookings (currently 9148298431)
- [ ] Service areas (currently Varthur, Whitefield, Sarjapur Road and nearby)
- [ ] Working hours (currently Mon – Sun, 8 am – 7 pm)
- [ ] Email address (none yet)
- [ ] Real job photos and the logo file; what the "UCS" logo on the flyer is
- [ ] About-page story (years in business, team)
- [ ] Kannada text reviewed by a native speaker
- [ ] Rights to use the photos from the reference site (or replace with the client's own)
- [ ] FAQ answers (job duration, what customers need to do) and the "1–3 hrs" figure on the home page
- [ ] Whether solar panel cleaning / deep cleaning (listed on the reference site) should be added

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) (free tier works).
Set `NEXT_PUBLIC_SITE_URL` to the live domain (e.g. `https://spbcleaning.in`) so the
sitemap and search metadata use the right URL.
