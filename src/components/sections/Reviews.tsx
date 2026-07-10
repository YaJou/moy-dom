import { reviewsData } from "@/data/site";
import { ReviewCard } from "@/components/cards/ReviewCard";

export function Reviews() {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <h2 className="section-title mb-8 sm:mb-10 lg:mb-12">
          Отзывы наших клиентов
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
