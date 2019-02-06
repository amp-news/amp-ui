import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createHashHistory from 'history/createHashHistory';
import rootReducer from './rootReducer';
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import API from "../common/service/api";
import authMiddleware from "../auth/middleware";
import authTransform from "../auth/authTransform";

const persistConfig = {
  transforms: [authTransform],
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'header', 'router']
};

const history = createHashHistory();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = {
  auth: authMiddleware,
  thunk: thunkMiddleware.withExtraArgument(API),
  router: routerMiddleware(history),
  logger: createLogger()
};

const store = createStore(
  connectRouter(history)(persistedReducer),
  {},
  composeWithDevTools(applyMiddleware(middleware.auth, middleware.thunk, middleware.router, middleware.logger))
);

const persistor = persistStore(store);

export default {
  history,
  store,
  persistor
};
