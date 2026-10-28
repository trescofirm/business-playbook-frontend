import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/content";

function Testimonials() {
  return (
    
<section className="reviews" id="reviews">
  <div className="reviews-heading">
    <p className="eyebrow">WALL OF LOVE</p>

    <h2>
      Made for people who
      <br />
      <i>want more from themselves.</i>
    </h2>

    <p>
      Real readers. Real takeaways.
      <br />
      Built for people who want practical ideas they can actually use.
    </p>
  </div>

  <div className="reviews-rows">
    {[false, true].map((reverse, rowIndex) => (
      <div
        className={`reviews-track ${reverse ? "reviews-track--reverse" : ""}`}
        key={rowIndex}
      >
        <div className="reviews-track__inner">
          {[...testimonials, ...testimonials, ...testimonials].map(
            (review, index) => (
              <article
                className="review-card"
                key={`${rowIndex}-${review.id}-${index}`}
              >
                <div className="review-card__profile">
                  <div className="review-card__avatar" aria-hidden="true">
                    {review.name.charAt(0)}
                  </div>

                  <div className="review-card__identity">
                    <strong>{review.name}</strong>
                    <span>{review.role}</span>
                  </div>

                  <span className="review-card__x" aria-hidden="true">
                    𝕏
                  </span>
                </div>

                <div
                  className="review-card__stars"
                  role="img"
                  aria-label={`${review.rating ?? 5} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = Math.max(
                      0,
                      Math.min(5, Math.round((review.rating ?? 5) * 2) / 2)
                    );
                  
                    const fill = Math.max(0, Math.min(1, rating - index));
                  
                    return (
                      <span className="review-card__star" key={index}>
                        <Star
                          className="review-card__star-empty"
                          aria-hidden="true"
                        />

                        <span
                          className="review-card__star-fill"
                          style={{ width: `${fill * 100}%` }}
                          aria-hidden="true"
                        >
                          <Star />
                        </span>
                      </span>
                    );
                  })}
                </div>


                <p className="review-card__quote">
                  “{review.quote}”
                </p>
              </article>
            )
          )}
        </div>
      </div>
    ))}
  </div>
</section>

  );
}

export default Testimonials;