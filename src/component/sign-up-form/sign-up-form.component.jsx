import { useState } from 'react';

import {
	createdAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const dafaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const SignUpform = () => {
	const [formFields, setFormFields] = useState(dafaultFormFields);

	const { displayName, email, password, confirmPassword } = formFields;

	console.log(formFields);

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
			const { user } = await createdAuthUserWithEmailAndPassword(
				email,
				password
			);
			// console.log(response);

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
		<div>
			<h1>sign in with an email and password</h1>
			<form onSubmit={handleSubmit}>
				<label>Display Name</label>
				<input
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

				<label>Email</label>
				<input
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<label>Password</label>
				<input
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<label>Confirm Password</label>
				<input
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<button type='submit'>Sign up</button>
			</form>
		</div>
	);
};

export default SignUpform;
