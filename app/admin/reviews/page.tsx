import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ConfirmSubmit } from "@/components/ConfirmSubmit";
import { Stars } from "@/components/Reviews";
import { Container } from "@/components/Section";
import { services } from "@/content/services";
import { getReviewsByStatus, reviewsEnabled, type Review, type ReviewStatus } from "@/lib/reviews";
import { changeStatus, removeReview } from "./actions";

export const metadata: Metadata = {
  title: "Manage reviews",
  robots: { index: false, follow: false },
};

const serviceTitle = (slug: string) => services.find((s) => s.slug === slug)?.title ?? "Other";
const when = (ms: number) =>
  new Date(ms).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

function ActionButton({ id, status, label, tone }: { id: string; status: ReviewStatus; label: string; tone: string }) {
  return (
    <form action={changeStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button className={`rounded-xl px-4 py-2 text-sm font-bold ${tone}`}>{label}</button>
    </form>
  );
}

function AdminReview({ review }: { review: Review }) {
  return (
    <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="text-sm text-muted">{when(review.createdAt)}</span>
      </div>
      <p className="mt-3 whitespace-pre-line text-ink">{review.comment}</p>
      <p className="mt-3 text-sm text-muted">
        <strong className="text-ink">{review.name}</strong>
        {review.area && ` · ${review.area}`} · {serviceTitle(review.service)}
        {review.phone && (
          <>
            {" · "}
            <a href={`tel:+91${review.phone}`} className="font-semibold text-brand">
              {review.phone}
            </a>
          </>
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {review.status !== "approved" && (
          <ActionButton id={review.id} status="approved" label="Approve" tone="bg-whatsapp text-white hover:bg-whatsapp-dark" />
        )}
        {review.status !== "hidden" && (
          <ActionButton id={review.id} status="hidden" label="Hide" tone="bg-slate-100 text-ink hover:bg-slate-200" />
        )}
        <form action={removeReview}>
          <input type="hidden" name="id" value={review.id} />
          <ConfirmSubmit
            message={`Delete ${review.name}'s review permanently? (Use "Hide" if you might want it back.)`}
            className="rounded-xl px-4 py-2 text-sm font-bold text-alert hover:bg-alert/10"
          >
            Delete
          </ConfirmSubmit>
        </form>
      </div>
    </li>
  );
}

async function ReviewLists() {
  await connection(); // always read fresh data, never cache this page
  if (!reviewsEnabled()) {
    return <p className="rounded-2xl bg-white p-6 text-muted ring-1 ring-slate-200">The reviews database isn&apos;t connected yet.</p>;
  }
  const [pending, approved, hidden] = await Promise.all([
    getReviewsByStatus("pending"),
    getReviewsByStatus("approved"),
    getReviewsByStatus("hidden"),
  ]);
  const groups = [
    { title: "Waiting for approval", items: pending, empty: "Nothing to approve right now." },
    { title: "Shown on the website", items: approved, empty: "No approved reviews yet." },
    { title: "Hidden", items: hidden, empty: "No hidden reviews." },
  ];
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="font-display text-2xl font-extrabold text-ink">
            {g.title} <span className="text-muted">({g.items.length})</span>
          </h2>
          {g.items.length ? (
            <ul className="mt-4 space-y-4">
              {g.items.map((r) => (
                <AdminReview key={r.id} review={r} />
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">{g.empty}</p>
          )}
        </section>
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <section className="bg-surface py-16">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-black text-ink">Manage reviews</h1>
        <p className="mt-2 text-muted">
          New reviews only appear on the website after you approve them. Mobile numbers are private and shown only here.
        </p>
        <div className="mt-10">
          <Suspense fallback={<p className="text-muted">Loading reviews…</p>}>
            <ReviewLists />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
