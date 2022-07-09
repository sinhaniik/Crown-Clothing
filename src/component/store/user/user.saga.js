import { takeLatest, all, call, put } from '@redux-saga/core/effects';

import { USER_ACTION_TYPES } from './user-types';

import {
	signInSuccess,
	signInFailed,
	signUpFailed,
	signUpSuccess,
	signOutSuccess,
	signOutUser,
	signOutFailed
} from '../user/user-action';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInWithFacebookPopup,
	signInAuthUserWithEmailAndPassword,
	createdAuthUserWithEmailAndPassword,
	userSignOut
} from '../../../utils/firebase/firebase.utils';

// actual logic
export function* getUserSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapShot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);

		yield put(signInSuccess({ id: userSnapShot.id }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);

		yield call(getUserSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithFacebook() {
	try {
		const { user } = yield call(signInWithFacebookPopup);
		yield call(getUserSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getUserSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getUserSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

//SIGNUP_USER
export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			createdAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
	yield call(getUserSnapshotFromUserAuth, user, additionalDetails);
}

//SIGN_OUT_USER
export function* signOut() {
	try {
		yield call(userSignOut());
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

// entry point saga
export function* signUpEmailAndPassword() {
	yield takeLatest();
}

export function* onEmailAndPasswordSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmailAndPassword
	);
}

export function* onFacebookSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.FACEBOOK_SIGN_IN_START,
		signInWithFacebook
	);
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//SIGN_UP_ENTRY_SAGA
export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

//SIGN_OUT_ENTRY_SAGA
export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onFacebookSignInStart),
		call(onEmailAndPasswordSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart)
	]);
}
