import { createSelector } from 'reselect';

import { InitialState } from './user-reducer';

export const selectUserReducer = (state): InitialState => state.user;

export const currentUserSelector = createSelector(
	selectUserReducer,
	(user) => user.currentUser
);
