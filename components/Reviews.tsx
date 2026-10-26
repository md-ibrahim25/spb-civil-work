import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getApprovedReviews, summarize, type PublicReview } from "@/lib/reviews";
import { ArrowIcon, StarIcon } from "./Icons";
import { Container, SectionHeading } from "./Section";

export function Stars({ rating, className = "h-5 w-5" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} className={`${className} ${n <= Math.round(rating) ? "text-amber-400" : "text-slate-300"}`} />
      ))}
    </span>
  );
}

const serviceTitle = (slug: string) => services.find((s) => s.slug === slug)?.title;

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <figure className="reveal flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <Stars rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-ink">“{review.comment}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-water-light font-display font-bold text-brand"
          aria-hidden
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-bold text-ink">{review.name}</span>
          <span className="block truncate text-sm text-muted">
            {[review.area, serviceTitle(review.service), formatDate(review.createdAt)].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function RatingSummary({ reviews }: { reviews: PublicReview[] }) {
  const { count, average } = summarize(reviews);
  if (!count) return null;
  return (
    <p className="flex items-center gap-3">
      <span className="font-display text-4xl font-extrabold text-ink">{average.toFixed(1)}</span>
      <span>
        <Stars rating={average} />
        <span className="block text-sm text-muted">
          from {count} customer review{count === 1 ? "" : "s"}
        </span>
      </span>
    </p>
  );
}

export function GoogleReviewButton() {
  if (!site.googleReviewUrl) return null;
  return (
    <a
      href={site.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-ink ring-1 ring-slate-300 transition hover:-translate-y-0.5 hover:ring-brand"
    >
      <StarIcon className="h-5 w-5 text-amber-400" /> Review us on Google
    </a>
  );
}

// "What our customers say" block for the home and service pages.
// Shows the latest approved reviews (optionally only for one service); invites a review when there are none.
export async function ReviewsSection({
  service,
  limit = 3,
  hideWhenEmpty = false,
  className = "",
}: {
  service?: string;
  limit?: number;
  hideWhenEmpty?: boolean;
  className?: string;
}) {
  const all = await getApprovedReviews();
  const matching = service ? all.filter((r) => r.service === service) : all;
  const reviews = matching.slice(0, limit);
  if (hideWhenEmpty && reviews.length === 0) return null;

  return (
    <section className={`py-20 sm:py-24 ${className}`}>
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Reviews"
            title="What our customers say"
            intro={reviews.length ? undefined : "Had your sump or tank cleaned by us? We'd love to hear how it went."}
          />
          <RatingSummary reviews={matching} />
        </div>

        {reviews.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/reviews#write"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            <StarIcon className="h-5 w-5 text-amber-300" /> Leave a review
          </Link>
          {matching.length > limit && (
            <Link href="/reviews" className="inline-flex items-center gap-1.5 px-3 py-3 font-bold text-brand hover:underline">
              Read all reviews <ArrowIcon className="h-4 w-4" />
            </Link>
          )}
          <GoogleReviewButton />
        </div>
      </Container>
    </section>
  );
}
