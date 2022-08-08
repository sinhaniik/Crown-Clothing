import { AnyAction } from 'redux';
import { UserType } from './user-types';

import {
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signInFailed,
	signUpFailed
} from './user-action';

export type InitialState = {
	readonly currentUser: UserType | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: InitialState = {
	currentUser: null,
	isLoading: false,
	error: null
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: action.payload
		};
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signInFailed.match(action) ||
		signUpFailed.match(action) ||
		signOutFailed.match(action)
	) {
		return {
			...state,
			error: action.payload
		};
	}

	return state;
};
