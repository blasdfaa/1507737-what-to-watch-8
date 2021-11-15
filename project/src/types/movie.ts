import { genresNames } from '../const';

export type Movie = {
  id: number;
  title: string;
  previewImage: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  releasedYear: number;
  isFavorite: boolean;
};

export type MovieCard = {
  id: number;
  title: string;
  previewImage: string;
};

export type PromoMovie = {
  id: number;
  title: string;
  posterImage: string;
  backgroundImage: string;
  genre: string;
  releasedYear: number;
};

export type MovieGenre = typeof genresNames[number];
