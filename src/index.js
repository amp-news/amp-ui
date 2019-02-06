import 'typeface-roboto';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Config from './config/reduxConfig';
import Loader from './common/components/progress/loader';
import registerServiceWorker from './config/serviceWorkers';
import App from './App';

const { history, store, persistor } = Config;

render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
