import { USER_ACTION_TYPES } from './user-types';
import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher
} from '../../../utils/firebase/reducer/reducer.utils';

import { UserType } from './user-types';
import { AdditionalUserInfo } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER,
	UserType
>;
//GOOGLE SIGN-IN START
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

//FACEBOOK SIGN-IN START
export type FacebookSignInStart =
	Action<USER_ACTION_TYPES.FACEBOOK_SIGN_IN_START>;

//SIGN-IN ACTION CREATER
export type EmailSignInStart = ActionWithPayload<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	UserType
>;

export type SignInFailed = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_FAILED,
	Error
>;

//SIGN UP ACTION CREATER
export type SignUpStart = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_START,
	{
		email: string;
		password: string;
		displayName: string;
	}
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{
		user: string;
		additionalDetails: AdditionalUserInfo;
	}
>;

export type SignUpFailed = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_FAILED,
	Error
>;

//SIGN-OUT ACTION CREATORS
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_OUT_FAILED,
	Error
>;

export const setCurrentUser = withMatcher(
	(user: UserType): SetCurrentUser =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

//SIGN_IN USER ACTION
export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const facebookSignInStart = withMatcher(
	(): FacebookSignInStart =>
		createAction(USER_ACTION_TYPES.FACEBOOK_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
	(user: UserType): SignInSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
	(error: Error): SignInFailed =>
		createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

//SIGN_UP USER ACTION
export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart =>
		createAction(USER_ACTION_TYPES.SIGN_UP_START, {
			email,
			password,
			displayName
		})
);

export const signUpSuccess = withMatcher(
	(user: string, additionalDetails: AdditionalUserInfo): SignUpSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
			user,
			additionalDetails
		})
);

export const signUpFailed = withMatcher(
	(error: Error): SignUpFailed =>
		createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

// SIGN_OUT USER ACTION
export const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
	(error: Error): SignOutFailed =>
		createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
