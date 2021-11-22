import { createAction } from '@reduxjs/toolkit';

import { ActionType, ApiDataStatus } from '../../const';

/* Чтобы не вызывать циклическую зависимость, функцию надо вынести в отдельный файл, так-как она используется в файле movie.async.ts  */
export const changeReviewSendingStatus = createAction<ApiDataStatus>(ActionType.ChangeReviewSendingStatus);
