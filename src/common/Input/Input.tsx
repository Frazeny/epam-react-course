import React from 'react';
import styles from './Input.module.css';

type InputProps = {
	type: string;
	labelText?: string;
	placeholderText: string;
	onChange: (value: any) => void;
	value?: string;
};

const Input: React.FC<InputProps> = ({
	type,
	labelText,
	placeholderText,
	onChange,
	...props
}) => {
	return (
		<div>
			<label htmlFor='input'>
				{labelText}
				<input
					className={styles.input}
					id='input'
					type={type}
					placeholder={placeholderText}
					onChange={(e) => onChange(e.target.value)}
					{...props}
				/>
			</label>
		</div>
	);
};

export default Input;
