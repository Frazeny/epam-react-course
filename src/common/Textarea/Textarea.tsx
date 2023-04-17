import React, { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string;
	name: string;
	labelText?: string;
	placeholderText?: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
	id,
	name,
	labelText,
	placeholderText,
	value,
	onChange,
}) => {
	return (
		<div className={styles.container}>
			<label htmlFor={id} className={styles.label}>
				{labelText}
			</label>
			<textarea
				className={styles.textArea}
				id={id}
				name={name}
				placeholder={placeholderText}
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	);
};

export default Textarea;
