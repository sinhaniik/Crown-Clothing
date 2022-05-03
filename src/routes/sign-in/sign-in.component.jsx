import {
	signInWithGooglePopup,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		createUserDocumentFromAuth(response.user);
	};

	return (
		<div>
			<h2> hello this is sign in page </h2>;
			<button onClick={logGoogleUser}>sign in with google popup</button>
		</div>
	);
};

export default SignIn;
