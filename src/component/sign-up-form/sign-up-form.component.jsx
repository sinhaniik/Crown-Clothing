import { useState } from 'react';

import {
	createdAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import { FromInputContainer } from './sign-up-form.styles';

import Button from '../buttton/button.component';

//redux-sagafication
import { useDispatch } from 'react-redux';
import { signUpStart } from '../store/user/user-action';

const dafaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const SignUpform = () => {
	const [formFields, setFormFields] = useState(dafaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const dispatch = useDispatch();

	const resetFormField = () => {
		setFormFields(dafaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('password do not match');
			return;
		}

		try {
			dispatch(signUpStart(email, password, displayName));
			resetFormField();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('cannot create user email already exits');
			} else {
				console.log('error', error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<FromInputContainer>
			<h2> Don't have an account ?? </h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

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

				<FormInput
					label='Conform Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<Button type='submit'>sign up</Button>
			</form>
		</FromInputContainer>
	);
};

export default SignUpform;
