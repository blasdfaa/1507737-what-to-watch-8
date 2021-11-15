import { Middleware } from 'redux';

import { ActionType } from '../../const';
import browserHistory from '../../services/browser-history';
import { RootReducer } from '../rootReducer';

export const redirect: Middleware<unknown, RootReducer> = (_store) => (next) => (action) => {
  const history = browserHistory;

  if (action.type === ActionType.RedirectToRoute) {
    history.push(action.payload);
  }

  return next(action);
};
