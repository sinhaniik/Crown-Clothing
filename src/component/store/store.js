import { compose, createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// they catches action before they hit our reducers and they log out the state
// run before an action hits reducers
const middleWares = [logger];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, composedEnhancer);
