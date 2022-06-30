import { USER_ACTION_TYPES } from './user-types';

const INITIAL_STATE = {
	currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
	// inm action we already know that this action have 2 thing
	// 1. type 2. payload - it is store value which er r gonna update

	const { type, payload } = action;

	// a case being what you expect , the value of what you pass me to be
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				// take previous state
				...state,
				// change specifically what uh need to change
				currentUser: payload
			};

		default:
			return state;
	}
};
