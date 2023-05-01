import React, { useCallback, useContext, useEffect, useState } from 'react';

import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import { HEADER_BUTTON_TEXT, LOCAL_STORAGE } from '../../constants';

import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { AuthContext } from '../../AuthContext/AuthCountext';
import { IUser } from '../../types/types';

const Header = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { isAuth, setIsAuth } = useContext(AuthContext);
	useEffect(() => {
		if (isAuth) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setUser(JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER)));
		}
	}, []);
	const handleLogout = useCallback(() => {
		localStorage.removeItem(LOCAL_STORAGE.TOKEN);
		localStorage.removeItem(LOCAL_STORAGE.USER);
		navigate(ROUTES.LOGIN);
		setIsAuth(false);
	}, [navigate, user]);
	console.log(isAuth, setIsAuth);

	return (
		<header className={styles.header}>
			<Logo />
			{isAuth && localStorage.getItem(LOCAL_STORAGE.USER) ? (
				<div className={styles.header__user}>
					<span className={styles.userName}>{user?.name}</span>
					<Button children={HEADER_BUTTON_TEXT} onClick={handleLogout} />
				</div>
			) : null}
		</header>
	);
};
export default Header;
