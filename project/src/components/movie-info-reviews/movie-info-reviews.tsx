import ReviewItem from '../review-item/review-item';

import type { MovieReview } from '../../types/review';

type MovieInfoReviewsProps = {
  reviews: MovieReview[] | [];
  label: string;
};

function MovieInfoReviews({ reviews, label }: MovieInfoReviewsProps): JSX.Element {
  const secondColumnStart = Math.floor(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row" data-label={label}>
      {reviews && (
        <>
          <div className="film-card__reviews-col">
            {reviews.slice(secondColumnStart).map((review) => (
              <ReviewItem {...review} key={review.id} />
            ))}
          </div>
          {/* Если отзывов больше 1, добавляется вторая колонка */}
          {secondColumnStart > 0 && (
            <div className="film-card__reviews-col">
              {reviews.slice(0, secondColumnStart).map((review) => (
                <ReviewItem {...review} key={review.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieInfoReviews;
