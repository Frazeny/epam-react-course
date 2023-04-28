import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CoursesService from '../../API/CoursesService';
import Input from '../../common/Input/Input';
import { LOCAL_STORAGE } from '../../constants';
import { ROUTES } from '../../router/routes';
import styles from './Login.module.css';
import Button from '../../common/Button/Button';
import { AuthContext } from '../../AuthContext/AuthCountext';
import { ILoginForm } from '../../types/types';
import Loader from '../UI/Loader';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { setIsAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setIsLoadingUser(true);
			const User: ILoginForm = { email, password };
			const response = await CoursesService.postLoginUser(User);
			const token = response.data.result;
			localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
			const user = response.data.user;
			localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));
			setIsAuth(true);
			navigate(ROUTES.COURSES);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError(`Unexpected error ${error}`);
			}
		} finally {
			setIsLoadingUser(false);
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleLogin}>
				<h1>Login</h1>
				{error && <p>{error}</p>}
				{isLoadingUser && <Loader />}
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
