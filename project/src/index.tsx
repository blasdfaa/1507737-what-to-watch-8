import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import store from './redux/store';
import { checkAuthStatus } from './redux/user-process/user-process.slice';

store.dispatch(checkAuthStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
