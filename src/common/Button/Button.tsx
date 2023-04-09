import React from 'react';

import './Button.css';

interface ButtonProps {
	onClick?: (event: React.SyntheticEvent) => void;
	children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
	return (
		<button onClick={onClick} {...props}>
			{children}
		</button>
	);
};

export default Button;
