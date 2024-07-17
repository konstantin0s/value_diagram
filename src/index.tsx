import { App } from './containers/App';
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!); // Create root
// root.render(<App />);

import { Provider } from 'react-redux';
import store from './store/store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
