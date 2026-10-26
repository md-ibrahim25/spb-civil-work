# Google setup for SPB Civil Work Cleaning Service

The website is ready for search engines. These steps happen in a browser and need the
owner's Google account. Do them in this order.

## 1. Connect the custom domain in Vercel (do this first)

1. Vercel dashboard → project **spb-civil-work** → **Settings → Domains → Add**.
2. Enter the domain (e.g. `spbcleaning.in`) and also add `www.spbcleaning.in`, set to redirect to the main one.
3. Vercel shows DNS records (an `A` record for the root and a `CNAME` for `www`). Add them at the registrar where the domain was bought.
4. Wait until Vercel shows **Valid Configuration**, then redeploy once (Deployments → latest → Redeploy).

The site reads its address from Vercel automatically, so the sitemap, canonical tags and
WhatsApp previews switch to the custom domain on that redeploy. No code change needed.

## 2. Google Business Profile (biggest impact for local search)

This is what puts the business on Google Maps and in the "near me" results.

1. Go to <https://business.google.com> and sign in with the business owner's Google account.
2. **Add business** → name: `SPB Civil Work Cleaning Service`.
3. Category: **Water tank cleaning service**. Add secondary categories such as *Waterproofing service* and *Cleaning service*.
4. Choose **"I deliver goods and services to my customers"**. Hide the address if the office isn't open to walk-in customers, and add service areas: Varthur, Whitefield, Gunjur, Sarjapur Road, Marathahalli, Bellandur, Hoskote.
5. Phone: `91482 98431`. Website: the custom domain.
6. Verify (Google sends a code by phone, SMS, email or video; it can take a few days).
7. After verification:
   - Add **real photos**: team at work, before/after, equipment, vehicle. Aim for 10+.
   - Add each **service** with its price (same as the website's price list).
   - Set opening hours to match the website.
   - Turn on **WhatsApp chat** or messaging if offered.
8. Ask every happy customer for a **Google review** (share the review link on WhatsApp after each job). Reviews are the strongest local ranking factor.
9. Copy the review link (Profile → **Ask for reviews**) and paste it into `googleReviewUrl` in
   `content/site.ts`. The website then shows a **Review us on Google** button next to its own review form.

Keep the name, address and phone **exactly the same** everywhere (website, Google, JustDial,
Facebook). Mismatches hurt rankings.

## 3. Google Search Console

Tells Google about the site and shows which searches bring visitors.

1. Go to <https://search.google.com/search-console> → **Add property** → **Domain** → enter the domain.
2. Google gives a `TXT` record. Add it at the domain registrar and click **Verify**.
   - (Alternative: choose **URL prefix**, pick the **HTML tag** method, copy the `content` value,
     and add it in Vercel → Settings → Environment Variables as `GOOGLE_SITE_VERIFICATION`, then redeploy.)
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL inspection** → paste the home page URL → **Request indexing**. Repeat for the sump and tank cleaning service pages.
5. Check back after 1–2 weeks: *Pages* shows what's indexed, *Performance* shows search terms.

## 4. Free local listings (optional, helps)

Create listings with the same name, phone and address on: JustDial, Sulekha, UrbanCompany
(as a partner), IndiaMART, Facebook Page, Bing Places (can import from Google Business Profile).
Link each one to the website.

## What to expect

New sites usually take **4–12 weeks** to start ranking. Google Business Profile with photos and
reviews usually shows results sooner than the website alone.
