import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CoursesService from '../../API/CoursesService';
import Input from '../../common/Input/Input';
import { LOCAL_STORAGE } from '../../constants';
import { ROUTES } from '../../router/routes';
import styles from './Login.module.css';
import Button from '../../common/Button/Button';
import { AuthContext } from '../../AuthContext/AuthCountext';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { setIsAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const User = { email, password };
			const response = await CoursesService.postLoginUser(User);
			const token = response.data.result;
			localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
			const user = response.data.user;
			localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));
			setIsAuth(true);
			navigate(ROUTES.COURSES);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				setError(error.message);
			}
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleLogin}>
				<h1>Login</h1>
				{error && <p>{error}</p>}
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
				<Button children='Login' />
				<p>
					If you not have an account you can{' '}
					<Link to={ROUTES.REGISTRATION}>Registration</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
