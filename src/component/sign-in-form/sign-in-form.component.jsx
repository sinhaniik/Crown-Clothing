import { useState } from 'react';
import {
	signInWithGooglePopup,
	signInWithFacebookPopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASS } from '../buttton/button.component';

import { FormInputContainer, ButtonContainer } from './sign-in-form.styles';

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
		<FormInputContainer>
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

				<ButtonContainer>
					<Button type='submit'>sign in</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASS.google}
						onClick={signInWithGoogle}
					>
						google
					</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASS.facebook}
						onClick={signInWithFacebook}
					>
						facebook
					</Button>
				</ButtonContainer>
			</form>
		</FormInputContainer>
	);
};

export default SignInform;
