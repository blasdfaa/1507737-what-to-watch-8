import { getReviewPostDate } from '../../utils/dates/date';

import type { MovieReview } from '../../types/review';

function ReviewItem({ user, rating, comment, date }: MovieReview): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date.slice(0, 10)}>
            {getReviewPostDate(date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default ReviewItem;
