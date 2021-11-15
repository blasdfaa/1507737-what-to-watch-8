import { createAction } from '@reduxjs/toolkit';

import { ActionType, AppRoutes } from '../../const';

export const redirectToRouteAction = createAction(ActionType.RedirectToRoute, (url: AppRoutes) => ({
  payload: url,
}));
