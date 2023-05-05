import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import { ROUTES } from '../../router/routes';
import styles from './Login.module.css';
import Button from '../../common/Button/Button';
import { ILoginForm } from '../../types/types';
import Loader from '../UI/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { selectUser } from '../../store/servisces';
import { loginUser } from '../../store/user/actionCreators';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isLoading, userError } = useTypedSelector(selectUser);
	const { fetchUser } = useActions();
	const navigate = useNavigate();
	const { token } = useTypedSelector(selectUser);

	const handleLogin = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const User: ILoginForm = { email, password };

			await fetchUser(User);
			await loginUser(token);
			if (!userError && !isLoading) {
				navigate(ROUTES.COURSES);
			}
		},
		[email, fetchUser, isLoading, navigate, password, token, userError]
	);

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleLogin}>
				<h1>Login</h1>
				{userError && <p>{userError}</p>}
				{isLoading && <Loader />}
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
