import React, { useCallback } from 'react';

import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import { HEADER_BUTTON_TEXT } from '../../constants';

import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import CoursesService from '../../API/CoursesService';
import { selectUser } from '../../store/servisces';

const Header = () => {
	const navigate = useNavigate();
	const { isAuth, name } = useTypedSelector(selectUser);
	const { logoutUser } = useActions();

	const handleLogout = useCallback(() => {
		logoutUser();
		CoursesService.deleteLogoutUser();
		navigate(ROUTES.LOGIN);
	}, [logoutUser, navigate]);

	return (
		<header className={styles.header}>
			<Logo />
			{isAuth ? (
				<div className={styles.header__user}>
					<span className={styles.userName}>{name}</span>
					<Button children={HEADER_BUTTON_TEXT} onClick={handleLogout} />
				</div>
			) : null}
		</header>
	);
};
export default Header;
