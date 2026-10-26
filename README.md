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
| `/services/<slug>` | One page per service (e.g. `/services/sump-cleaning`)   |
| `/areas`, `/areas/<slug>` | Service areas, one page per area (e.g. `/areas/whitefield`) |

Bookings don't go to a server: the booking form and "Book on WhatsApp" buttons open
WhatsApp with the customer's details pre-filled, sent to `site.contact.whatsapp`.

## Editing content

All business details live in `content/`, so you rarely need to touch components:

- `content/site.ts`: name, phone numbers, WhatsApp number, address, hours, service areas, menu
- `content/services.ts`: services, the 4-step cleaning process, equipment
- `content/pricing.ts`: sump and tank price lists and notes
- `content/gallery.ts`: gallery photos and captions
- `content/faq.ts`: frequently asked questions
- `content/service-details.ts`: text, SEO title/description and FAQs for each service page
- `content/areas.ts`: service areas and the text on each area page

**Images** live in `public/images` and every path is listed in `content/images.ts`:

| Folder | Contents |
| --- | --- |
| `brand/` | `logo.png` (full badge), `emblem.png` (round mark for header and small spaces) |
| `hero/` | Wide banner photos behind page headers (from the reference site spb-cleaning.lovable.app) |
| `jobs/tanks/`, `jobs/sumps/` | Real before/after photos from the client's jobs |

Name files in lowercase-with-dashes (e.g. `white-tank-before.jpg`) and keep photos under ~1600px.
Before/after slider pairs are set in `content/gallery.ts`; only pair photos of the same tank or sump.

Source artwork that isn't served on the site (logo PDF, rate chart) is kept in `design/`.

**Logo & icons:** `components/Logo.tsx` (header/footer); `app/icon.png`, `app/apple-icon.png` and
`app/favicon.ico` (browser tab and phone home-screen icons, made from the round emblem).

## To confirm with the client

These are defaults, marked "placeholder" in the content files:

- [ ] Prices for sizes between the rate chart's ranges (e.g. 4,000–5,000 L or 12,000–14,000 L sumps)
- [ ] Prices for pipe acid wash, waterproofing and toilet cleaning (currently "Price on inspection")
- [ ] Which number receives WhatsApp bookings (currently 9148298431)
- [ ] Service areas (currently Varthur, Whitefield, Sarjapur Road and nearby)
- [ ] Working hours (currently Mon – Sun, 8 am – 7 pm)
- [ ] Email address (none yet)
- [ ] Real job photos and the logo file; what the "UCS" logo on the flyer is
- [ ] About-page story (years in business, team)
- [ ] Kannada text reviewed by a native speaker
- [ ] Rights to use the 3 banner photos from the reference site (`public/images/hero/`)
- [ ] "Acid wash" on the rate chart: a separate service from pipe acid wash?
- [ ] FAQ answers (job duration, what customers need to do) and the "1–3 hrs" figure on the home page
- [ ] Whether solar panel cleaning / deep cleaning (listed on the reference site) should be added

## SEO

- Every page has its own title, description, canonical URL and WhatsApp/Facebook share image
  (`lib/seo.ts`, `lib/og.tsx`, `opengraph-image.tsx` files).
- Structured data for Google: LocalBusiness with prices, hours and service areas on every page,
  plus Service, FAQ and breadcrumb data where relevant.
- `sitemap.xml` lists every page; `proxy.ts` returns a real 404 for unknown service/area URLs.
- Off-site steps (custom domain, Google Business Profile, Search Console): see
  [`docs/google-setup.md`](docs/google-setup.md).

## Deploy

Hosted on Vercel (project `spb-civil-work`). Deploy with `vercel deploy --prod`, or connect the
GitHub repo in Vercel for automatic deploys on every push to `main`.

Domain: **spbcivilworks.com** (set as `domain` in `content/site.ts`); `www.` redirects to it
(`next.config.ts`). Production builds use it for canonical URLs, the sitemap and share links.
To override, set `NEXT_PUBLIC_SITE_URL`. For Search Console's HTML-tag verification, set
`GOOGLE_SITE_VERIFICATION`.
