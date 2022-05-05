import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInWithFacebookPopup
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(response.user);
	};

	const logFacebookUser = async () => {
		const fbResponse = await signInWithFacebookPopup();
		console.log(fbResponse);
	};

	return (
		<div>
			<h2> hello this is sign in page </h2>;
			<button onClick={logGoogleUser}>sign in with google popup</button>
			{<button onClick={logFacebookUser}>sign in with facebook popup</button>}
		</div>
	);
};

export default SignIn;
