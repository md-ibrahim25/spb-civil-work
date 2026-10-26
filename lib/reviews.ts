import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { cacheLife, cacheTag } from "next/cache";

// Customer reviews, stored in Upstash Redis (provisioned through the Vercel Marketplace).
//   review:<id>        hash with the review fields
//   reviews:pending    sorted set of ids waiting for approval (score = submitted time)
//   reviews:approved   sorted set of ids shown on the site
//   reviews:hidden     sorted set of ids the client chose not to show
// New reviews are always "pending"; only the client can approve them (/admin/reviews).

export type ReviewStatus = "pending" | "approved" | "hidden";

export type Review = {
  id: string;
  name: string;
  area: string;
  service: string;
  rating: number;
  comment: string;
  // Private: shown only on the admin page, never on the public site.
  phone: string;
  createdAt: number;
  status: ReviewStatus;
};

export type PublicReview = Omit<Review, "phone" | "status">;

// Public pages read approved reviews through this tag; approving or hiding refreshes it.
export const REVIEWS_TAG = "reviews";

export function reviewsEnabled() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL);
}

let client: Redis | null = null;
function redis() {
  client ??= Redis.fromEnv();
  return client;
}

const statusKey = (s: ReviewStatus) => `reviews:${s}`;
const reviewKey = (id: string) => `review:${id}`;

function parse(raw: Record<string, unknown> | null): Review | null {
  if (!raw || !raw.id) return null;
  return {
    id: String(raw.id),
    name: String(raw.name ?? ""),
    area: String(raw.area ?? ""),
    service: String(raw.service ?? ""),
    rating: Number(raw.rating),
    comment: String(raw.comment ?? ""),
    phone: String(raw.phone ?? ""),
    createdAt: Number(raw.createdAt),
    status: String(raw.status) as ReviewStatus,
  };
}

async function load(ids: string[]): Promise<Review[]> {
  if (ids.length === 0) return [];
  const p = redis().pipeline();
  ids.forEach((id) => p.hgetall(reviewKey(id)));
  const rows = (await p.exec()) as (Record<string, unknown> | null)[];
  return rows.map(parse).filter((r): r is Review => r !== null);
}

export async function addReview(input: Omit<Review, "id" | "createdAt" | "status">) {
  const review: Review = { ...input, id: crypto.randomUUID(), createdAt: Date.now(), status: "pending" };
  await redis()
    .multi()
    .hset(reviewKey(review.id), review)
    .zadd(statusKey("pending"), { score: review.createdAt, member: review.id })
    .exec();
  return review.id;
}

// Approved reviews for the public site, newest first. Cached until the tag is updated.
export async function getApprovedReviews(): Promise<PublicReview[]> {
  "use cache";
  cacheTag(REVIEWS_TAG);
  cacheLife("hours");
  if (!reviewsEnabled()) return [];
  const ids = await redis().zrange<string[]>(statusKey("approved"), 0, -1, { rev: true });
  const reviews = await load(ids);
  // Only public fields leave this function (no phone numbers or status).
  return reviews.map((r) => ({
    id: r.id,
    name: r.name,
    area: r.area,
    service: r.service,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt,
  }));
}

export function summarize(reviews: PublicReview[]) {
  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  return { count, average: Math.round(average * 10) / 10 };
}

// Admin only (uncached).
export async function getReviewsByStatus(status: ReviewStatus): Promise<Review[]> {
  if (!reviewsEnabled()) return [];
  const ids = await redis().zrange<string[]>(statusKey(status), 0, -1, { rev: true });
  return load(ids);
}

export async function setReviewStatus(id: string, status: ReviewStatus) {
  const review = parse(await redis().hgetall(reviewKey(id)));
  if (!review) return;
  const tx = redis().multi();
  (["pending", "approved", "hidden"] as const).forEach((s) => tx.zrem(statusKey(s), id));
  tx.zadd(statusKey(status), { score: review.createdAt, member: id });
  tx.hset(reviewKey(id), { status });
  await tx.exec();
}

export async function deleteReview(id: string) {
  const tx = redis().multi();
  (["pending", "approved", "hidden"] as const).forEach((s) => tx.zrem(statusKey(s), id));
  tx.del(reviewKey(id));
  await tx.exec();
}

// Spam protection: at most 3 reviews per IP address per day.
let limiter: Ratelimit | null = null;
export async function allowSubmission(ip: string) {
  limiter ??= new Ratelimit({ redis: redis(), limiter: Ratelimit.slidingWindow(3, "1 d"), prefix: "reviews:ratelimit" });
  const { success } = await limiter.limit(ip);
  return success;
}
