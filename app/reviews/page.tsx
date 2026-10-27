import { CTABanner } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { ReviewForm } from "@/components/ReviewForm";
import { GoogleReviewButton, RatingSummary, ReviewCard } from "@/components/Reviews";
import { Container, PageHero, SectionHeading } from "@/components/Section";
import { images } from "@/content/images";
import { getApprovedReviews } from "@/lib/reviews";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Customer Reviews: Sump & Tank Cleaning",
  description:
    "Read what customers in Varthur, Whitefield and east Bengaluru say about our sump and tank cleaning, and share your own experience.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

  return (
    <>
      <PageHero
        image={images.hero.reviews}
        eyebrow="Reviews"
        title="What our customers say"
        titleKn="ಗ್ರಾಹಕರ ಅಭಿಪ್ರಾಯ"
        intro="Honest feedback from homes and businesses we've cleaned for. Had a cleaning done? Tell us how it went."
      />

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          {reviews.length > 0 ? (
            <>
              <RatingSummary reviews={reviews} />
              <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r) => (
                  <li key={r.id}>
                    <ReviewCard review={r} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="rounded-3xl bg-white p-8 text-center text-lg text-muted ring-1 ring-slate-200">
              No reviews yet. Be the first to share your experience below.
            </p>
          )}
        </Container>
      </section>

      <section id="write" className="scroll-mt-28 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeading
              eyebrow="Write a review"
              title="How did we do?"
              intro="Your feedback helps other families choose with confidence, and helps us improve."
            />
            <div className="mt-6">
              <GoogleReviewButton />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <ReviewForm />
          </div>
        </Container>
      </section>

      <CTABanner />
      <JsonLd data={breadcrumbSchema([{ name: "Reviews", path: "/reviews" }])} />
    </>
  );
}
