import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
	type: T;
	payload: P;
};

export type Action<T> = {
	type: T;
};

export function createAction<T extends string, P>(
	type: T,
	payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
	type: T,
	payload: void
): Action<T>;

// FUNCTION TO RETURN TYPE AND A PAYLOAD
// JUST WE GIVE T A TYPE WHICH IS STRING
// TYPE OF P IS ANY
export function createAction<T extends string, P>(type: T, payload: P) {
	return { type, payload };
}
