import { useState } from 'react';
import {
	signInWithGooglePopup,
	signInWithFacebookPopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss';
import Button from '../buttton/button.component';

const dafaultFormFields = {
	email: '',
	password: ''
};

const SignInform = () => {
	const [formFields, setFormFields] = useState(dafaultFormFields);
	const { email, password } = formFields;

	const resetFormField = () => {
		setFormFields(dafaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const signInWithFacebook = async () => {
		await signInWithFacebookPopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);

			resetFormField();
		} catch (e) {
			switch (e.code) {
				case 'auth/wrong-password':
					alert('wrong password');
					break;

				case 'auth/user-not-found':
					alert('wrong email');
					break;

				default:
					console.log(e);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='form-input-container'>
			<h2> Already have an account ?? </h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>sign in</Button>
					<Button type='button' buttonTypes='google' onClick={signInWithGoogle}>
						google sign in
					</Button>
					<Button
						type='button'
						buttonTypes='google'
						onClick={signInWithFacebook}
					>
						facebook sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInform;
