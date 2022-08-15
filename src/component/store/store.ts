import { compose, createStore, applyMiddleware, Middleware } from 'redux';

import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

// here we use typeof keyword to get the type of root reducer
export type StoreType = ReturnType<typeof rootReducer>;

type ExpentedPersistConfig = PersistConfig<StoreType> & {
	whitelist: (keyof StoreType)[];
};

const persistConfig: ExpentedPersistConfig = {
	key: 'root',
	storage,
	whitelist: ['user']
};

const sagaMiiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// they catches action before they hit our reducers and they log out the state
// run before an action hits reducers
const middleWares = [
	process.env.NODE_ENV === 'development' && logger,
	sagaMiiddleWare
].filter((middleWare): middleWare is Middleware => Boolean(middleWare));

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, composedEnhancers);

sagaMiiddleWare.run(rootSaga);

export const persistor = persistStore(store);
