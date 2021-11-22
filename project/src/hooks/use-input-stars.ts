import React from 'react';

type ReturnType = {
  rating: number;
  handleChangeRating: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addToStarsRefs: (input: HTMLInputElement) => void;
  resetRating: () => void;
};

const useInputStars = (starsRef: React.MutableRefObject<HTMLInputElement[] | null>): ReturnType => {
  const [rating, setRating] = React.useState<number>(0);

  const addToStarsRefs = React.useCallback(
    (input: HTMLInputElement): void => {
      if (input && starsRef.current !== null && !starsRef.current.includes(input)) {
        starsRef.current.push(input);
      }
    },
    [starsRef],
  );

  const handleChangeRating = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setRating(+e.target.value);
  }, []);

  const resetRating = (): void => {
    if (starsRef.current !== null) {
      starsRef.current.forEach((input) => {
        input.checked = false;
      });

      setRating(0);
    }
  };

  return { rating, handleChangeRating, addToStarsRefs, resetRating };
};

export default useInputStars;
