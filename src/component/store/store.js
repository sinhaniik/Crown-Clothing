import { compose, createStore, applyMiddleware } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// they catches action before they hit our reducers and they log out the state
// run before an action hits reducers
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
	Boolean
);

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, composedEnhancer);

export const persistor = persistStore(store);
