import React from 'react';

const reviewStars = [
  {
    value: '10',
    id: '10-star',
  },
  {
    value: '9',
    id: '9-star',
  },
  {
    value: '8',
    id: '8-star',
  },
  {
    value: '7',
    id: '7-star',
  },
  {
    value: '6',
    id: '6-star',
  },
  {
    value: '5',
    id: '5-star',
  },
  {
    value: '4',
    id: '4-star',
  },
  {
    value: '3',
    id: '3-star',
  },
  {
    value: '2',
    id: '2-star',
  },
  {
    value: '1',
    id: '1-star',
  },
];

type InputStarsProps = {
  onStarClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: (input: HTMLInputElement) => void;
  isReviewSending: boolean;
};

function InputStars({ onStarClick, inputRef, isReviewSending }: InputStarsProps): JSX.Element {
  return (
    <div className="rating">
      <div className="rating__stars">
        {reviewStars.map((star) => (
          <React.Fragment key={star.id}>
            <input
              ref={inputRef}
              className="rating__input"
              id={`star-${star.id}`}
              type="radio"
              name="rating"
              value={star.value}
              onChange={onStarClick}
              disabled={isReviewSending}
            />
            <label className="rating__label" htmlFor={`star-${star.id}`}>
              Rating {star.value}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default React.memo(InputStars);
