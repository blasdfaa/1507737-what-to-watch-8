export const getMovieRatingDescription = (rating: number): string => {
  if (rating > 0 && rating <= 3) {
    return 'Bad';
  } else if (rating > 3 && rating <= 5) {
    return 'Normal';
  } else if (rating > 5 && rating <= 8) {
    return 'Good';
  } else if (rating > 8 && rating < 10) {
    return 'Very good';
  } else if (rating === 10) {
    return 'Awesome';
  } else {
    return 'Unknown rating description';
  }
};
