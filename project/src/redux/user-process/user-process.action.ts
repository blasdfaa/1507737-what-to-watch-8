import { createAction } from '@reduxjs/toolkit';

import { ActionType } from '../../const';

export const redirectToRouteAction = createAction(ActionType.RedirectToRoute, (url: string) => ({
  payload: url,
}));
