import { all, call } from '@redux-saga/core/effects';
// import {categoriesSaga}

import { categoriesSaga } from './categories/categories.saga';
// generator function
export function* rootSaga() {
	yield all([call(categoriesSaga)]);
}
