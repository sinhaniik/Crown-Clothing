import { createSelector } from 'reselect';
import { InitialState } from './user-reducer';

import { StoreType } from '../store';

export const selectUserReducer = (state: StoreType): InitialState => state.user;

export const currentUserSelector = createSelector(
	selectUserReducer,
	(user) => user.currentUser
);
