import React from 'react';
import App from './app/App';
import {Provider, store} from './app/store';

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
