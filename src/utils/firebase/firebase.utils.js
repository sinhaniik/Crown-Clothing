import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'user', userAuth.uid); //takes 3 parameter

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
};
