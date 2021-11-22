import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../const';

import type { Movie } from '../../types/movie';

/* Чтобы не вызывать циклическую зависимость, функцию надо вынести в отдельный файл, так-как она используется в файле movie.async.ts  */
export const updateMovie = createAction<Movie>(ActionType.UpdateMovie);
