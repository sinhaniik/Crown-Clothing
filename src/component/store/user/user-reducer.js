import { USER_ACTION_TYPES } from './user-types';

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
	// inm action we already know that this action have 2 thing
	// 1. type 2. payload - it is store value which er r gonna update

	const { type, payload } = action;

	// a case being what you expect , the value of what you pass me to be
	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				// take previous state
				...state,
				// change specifically what uh need to change
				currentUser: payload
			};

		case USER_ACTION_TYPES.SIGN_OUT_FAILED:

		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, currentUser: null };

		case USER_ACTION_TYPES.SIGN_IN_FAILED:

		case USER_ACTION_TYPES.SIGN_UP_FAILED:
			return {
				...state,
				error: payload
			};

		default:
			return state;
	}
};
