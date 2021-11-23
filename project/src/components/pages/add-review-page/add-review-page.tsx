import React from 'react';
import { Redirect, useParams } from 'react-router';
import toast from 'react-hot-toast';

import AppHeader from '../../app-header/app-header';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import UserBlock from '../../user-block/user-block';
import { ApiDataStatus, AppRoutes, AuthorizationStatus, ErrorMessage } from '../../../const';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import useTypedSelector from '../../../hooks/use-typed-selector';
import { getAuthorizationStatus } from '../../../redux/user-process/user-process.selector';
import { fetchMovieById } from '../../../redux/movie/movie.async';
import { oneMovieSelector } from '../../../redux/movie/movie.selector';
import InputStars from '../../input-stars/input-stars';
import useInputStars from '../../../hooks/use-input-stars';
import { getReviewSendingStatus } from '../../../redux/review/review.selector';
import { sendReview } from '../../../redux/review/review.async';

const SENDING_REVIEW_MESSAGE = 'Sending...';
const SEND_SUCCESS_REVIEW_MESSAGE = 'Review sending success';

type UseParams = {
  id: string;
};

function AddReviewPage(): JSX.Element {
  const { id: movieId } = useParams<UseParams>();

  const dispatch = useTypedDispatch();

  const [reviewMessage, setReviewMessage] = React.useState<string>('');

  const movie = useTypedSelector(oneMovieSelector);
  const userAuthStatus = useTypedSelector(getAuthorizationStatus);
  const reviewSendingStatus = useTypedSelector(getReviewSendingStatus);

  const starsRef = React.useRef<HTMLInputElement[] | []>([]);

  const { rating, handleChangeRating, addToStarsRefs, resetRating } = useInputStars(starsRef);

  React.useEffect(() => {
    dispatch(fetchMovieById(+movieId));
  }, [dispatch, movieId]);

  React.useEffect(() => {
    if (reviewSendingStatus === ApiDataStatus.Success) {
      handleResetForm();
    }
  }, [reviewSendingStatus]);

  const handleChangeInputReview = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setReviewMessage(e.target.value);
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    const id = +movieId;
    const newReview = {
      movieId: id,
      review: {
        comment: reviewMessage,
        rating,
      },
    };

    const message = dispatch(sendReview(newReview)).unwrap();

    await toast.promise(message, {
      loading: SENDING_REVIEW_MESSAGE,
      success: SEND_SUCCESS_REVIEW_MESSAGE,
      error: ErrorMessage.SendReview,
    });

    await message;
  };

  const handleResetForm = (): void => {
    resetRating();
    setReviewMessage('');
  };

  const isReviewFormValid =
    reviewMessage.trim().length > 50 && reviewMessage.trim().length < 400 && Boolean(rating);
  const isReviewSending = reviewSendingStatus === ApiDataStatus.Loading;

  if (userAuthStatus === AuthorizationStatus.NoAuth) {
    return <Redirect to={AppRoutes.Login} />;
  }

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: `${movie?.backgroundColor}` }}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie?.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <AppHeader>
          {movie && <Breadcrumbs movieLink={`${AppRoutes.Movies}/${movie.id}`} movieName={movie.title} />}
          <UserBlock />
        </AppHeader>
        <div className="film-card__poster film-card__poster--small">
          <img src={movie?.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <InputStars
            onStarClick={handleChangeRating}
            inputRef={addToStarsRefs}
            isReviewSending={isReviewSending}
          />
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={reviewMessage}
              onChange={handleChangeInputReview}
              disabled={isReviewSending}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                onClick={handleSubmitReview}
                disabled={isReviewSending || !isReviewFormValid}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReviewPage;
