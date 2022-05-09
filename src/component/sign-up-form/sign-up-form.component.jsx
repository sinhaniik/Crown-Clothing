import { useState, useContext } from 'react';

import {
	createdAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import './sign-up-form.style.scss';
import { UserContext } from '../../context/user.contex';

import Button from '../buttton/button.component';

const dafaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const SignUpform = () => {
	const [formFields, setFormFields] = useState(dafaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormField = () => {
		setFormFields(dafaultFormFields);
	};

	const { setCurrentUser } = useContext(UserContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('password do not match');
			return;
		}

		try {
			const { user } = await createdAuthUserWithEmailAndPassword(
				email,
				password
			);

			setCurrentUser(user);

			await createUserDocumentFromAuth(user, { displayName });
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
		<div className='form-input-container'>
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
		</div>
	);
};

export default SignUpform;
