import ReviewItem from '../review-item/review-item';

import type { MovieReview } from '../../types/review';

type MovieInfoReviewsProps = {
  reviews: MovieReview[] | [];
};

function MovieInfoReviews({ reviews }: MovieInfoReviewsProps): JSX.Element {
  const secondColumnStart = Math.floor(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      {reviews && (
        <>
          <div className="film-card__reviews-col">
            {reviews.slice(secondColumnStart).map((review) => (
              <ReviewItem {...review} key={review.id} />
            ))}
          </div>
          <div className="film-card__reviews-col">
            {reviews.slice(0, secondColumnStart).map((review) => (
              <ReviewItem {...review} key={review.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieInfoReviews;
