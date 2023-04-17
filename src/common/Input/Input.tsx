import React from 'react';
import styles from './Input.module.css';

type InputProps = {
	id: string;
	name: string;
	type: string;
	labelText?: string;
	placeholderText: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
};

const Input: React.FC<InputProps> = ({
	id,
	name,
	type,
	labelText,
	placeholderText,
	onChange,
	...props
}) => {
	return (
		<div>
			<label className={styles.label}>
				{labelText}
				<input
					className={styles.input}
					id={id}
					name={name}
					type={type}
					placeholder={placeholderText}
					onChange={onChange}
					{...props}
				/>
			</label>
		</div>
	);
};

export default Input;
