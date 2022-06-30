import { useReducer } from 'react';
import { createContext, useEffect } from 'react';
import {
	onAuthStateChangedListner,
	createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils';

//as a actual value
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
});

// just for that we doesn't have to remember the types
export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
	console.log(state);
	console.log(action);
	// in action we already know that this action have 2 thing
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
			throw new Error('error');
	}
};

const INITIAL_STATE = {
	currentUser: null
};

export const UserProvider = ({ children }) => {
	// const [currentUser, setCurrentUser] = useState(null);

	// use useReducer inside component
	// useReducer takes 2 parameter
	// 2. initial_state 1. function
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	const value = { currentUser, setCurrentUser };
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListner((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);

			// console.log(user);
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
