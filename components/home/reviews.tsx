import { getReviews } from "@/lib/data";
import { ReviewCard } from "@/components/shared/review-card";
import { SectionHeading } from "./section-heading";

export async function Reviews() {
  const reviews = await getReviews();

  return (
    <section className="section-y bg-foreground text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px]" />
      <div className="container-px mx-auto max-w-7xl relative">
        <SectionHeading
          eyebrow="Customer Stories"
          title="What Our Customers Say"
          description="Real experiences from thousands of satisfied car buyers across Pakistan."
          className="[&_h2]:text-white [&_p]:text-white/60"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
