import { async } from '@firebase/util';
import { queryAllByAltText } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDnW04MmHosJRi0iX77UaTYy_42G4f9xqg',
	authDomain: 'crown-clothing-db-c369a.firebaseapp.com',
	projectId: 'crown-clothing-db-c369a',
	storageBucket: 'crown-clothing-db-c369a.appspot.com',
	messagingSenderId: '555542619272',
	appId: '1:555542619272:web:c446279dd1398965326b3d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const fbProvider = new FacebookAuthProvider();

//google auth
provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// facebook auth
fbProvider.getCustomParameters({
	prompt: 'select_account'
});

export const signInWithFacebookPopup = () => signInWithPopup(auth, fbProvider);

//working with database
export const db = getFirestore();

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = (db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		// console.log(docSnapshot.data());
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	const userDocRef = doc(db, 'user', userAuth.uid); //takes 3 parameter

	const userSnapshot = await getDoc(userDocRef);

	//if userData does not exist
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});
		} catch (error) {
			console.log('error creating at auth', error.message);
		}
	}

	return userDocRef;
};

export const createdAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
	onAuthStateChanged(auth, callback);
