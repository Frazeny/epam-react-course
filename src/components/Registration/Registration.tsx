import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CoursesService from '../../API/CoursesService';
import { ROUTES } from '../../router/routes';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import styles from './Registration.module.css';
import { useFetching } from '../../hooks/useFetching';
import Loader from '../UI/Loader';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [postNewUser, isNewUserPosting, postNewUserError] = useFetching(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const newUser = { name, email, password };
			await CoursesService.postRegisterNewUser(newUser);
			navigate(ROUTES.LOGIN);
		}
	);

	return (
		<div className={styles.container}>
			<h1>Registration</h1>
			{postNewUserError && <p>{postNewUserError}</p>}
			{isNewUserPosting && <Loader />}
			<form className={styles.form} onSubmit={postNewUser}>
				<Input
					id='name'
					name='name'
					type='text'
					placeholderText='Enter name'
					labelText='Name'
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<Input
					id='email'
					name='email'
					type='email'
					placeholderText='Enter email'
					labelText='Email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<Input
					id='password'
					name='password'
					type='password'
					placeholderText='Enter password'
					labelText='Password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button children={'Registration'} />
				<p>
					If you have an account you can <Link to={ROUTES.LOGIN}>Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Registration;
