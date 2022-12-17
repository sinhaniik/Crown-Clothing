import { takeLatest, all, call, put } from 'typed-redux-saga/macro'; // /marcro actually allows us to leverage macro bable plugin

// what is the baable macro plugin

import { USER_ACTION_TYPES } from './user-types';

import { User } from 'firebase/auth';
import {
	signInSuccess,
	signInFailed,
	signUpFailed,
	signUpSuccess,
	signOutSuccess,
	signOutFailed,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess
} from './user-action';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInWithFacebookPopup,
	signInAuthUserWithEmailAndPassword,
	createdAuthUserWithEmailAndPassword,
	userSignOut,
	AdditionalInformation
} from '../../../utils/firebase/firebase.utils';

// actual logic
export function* getUserSnapshotFromUserAuth(
	userAuth: User,
	additionalDetails?: AdditionalInformation
) {
	try {
		const userSnapShot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		if (userSnapShot) {
			yield* put(
				signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
			);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signInWithEmailAndPassword({
	payload: { email, password }
}: EmailSignInStart) {
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential;
			yield* call(getUserSnapshotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signInWithFacebook() {
	try {
		const { user } = yield* call(signInWithFacebookPopup);
		yield* call(getUserSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getUserSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getUserSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

//SIGNUP_USER
export function* signUp({
	payload: { email, password, displayName }
}: SignUpStart) {
	try {
		const userCredential = yield* call(
			createdAuthUserWithEmailAndPassword,
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalDetails }
}: SignUpSuccess) {
	yield* call(getUserSnapshotFromUserAuth, user, additionalDetails);
}

//SIGN_OUT_USER
export function* signOut() {
	try {
		yield* call(userSignOut);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
}

// entry point saga
// export function* signUpEmailAndPassword() {
// 	yield* takeLatest();
// }

export function* onEmailAndPasswordSignInStart() {
	yield* takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmailAndPassword
	);
}

export function* onFacebookSignInStart() {
	yield* takeLatest(
		USER_ACTION_TYPES.FACEBOOK_SIGN_IN_START,
		signInWithFacebook
	);
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//SIGN_UP_ENTRY_SAGA
export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

//SIGN_OUT_ENTRY_SAGA
export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onFacebookSignInStart),
		call(onEmailAndPasswordSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart)
	]);
}
