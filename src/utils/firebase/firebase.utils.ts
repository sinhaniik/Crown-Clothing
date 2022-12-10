import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from '../../component/store/categories/categories.types';

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
fbProvider.getCustomParameters();

export const signInWithFacebookPopup = () => signInWithPopup(auth, fbProvider);

//working with database
export const db = getFirestore();

// this is because we dont know the what is obj to add is gonna receive
export type objectToAdd = {
	title: string;
};
// item adding to the database
// async is always  returning promise
export const addCollectionAndDocuments = async <T extends objectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
};

//fetching items from database
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export type AdditionalInformation = {
	displayName?: string;
};

// this is the value returning from the SetDeccall
export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

//getting user data from database
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
			console.log('error creating at auth', error);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createdAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		//authChange takes three argument 1. auth 2. a callback 3. optional (what if callback fails)
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
