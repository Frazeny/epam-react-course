import React from 'react';
import styles from './CardDescription.module.css';

interface CardDescriptionProps {
	title: string;
	data: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ title, data }) => {
	return (
		<p className={styles.cardDescription}>
			<strong>{title}</strong>: <span>{data}</span>
		</p>
	);
};

export default CardDescription;
