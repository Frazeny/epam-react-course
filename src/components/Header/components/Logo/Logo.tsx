import React from 'react';

import styles from './Logo.module.css';

import logo from '../../../../assets/images/logo.png';

export const Logo = () => <img src={logo} className={styles.logo} alt='Logo' />;
