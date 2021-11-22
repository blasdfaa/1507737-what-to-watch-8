type MovieReviewAuthor = {
  id: number;
  name: string;
};

export type MovieReview = {
  id: number;
  user: MovieReviewAuthor;
  rating: number;
  comment: string;
  date: string;
};

export type MovieReviewPost = {
  rating: number;
  comment: string;
};
