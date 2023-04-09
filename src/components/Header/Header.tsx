import React from 'react';

import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import { HEADER_BUTTON_TEXT } from '../../constants';

import styles from './Header.module.css';

interface HeaderProps {
	userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.header__user}>
				<span className={styles.userName}>{userName}</span>
				<Button children={HEADER_BUTTON_TEXT} />
			</div>
		</header>
	);
};
export default Header;
