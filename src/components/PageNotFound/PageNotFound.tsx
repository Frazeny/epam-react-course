import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { ROUTES } from '../../router/routes';

const PageNotFound = () => {
	const navigate = useNavigate();

	const handleGoBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	return (
		<div>
			<h2>
				<strong>404.</strong> That's an error
			</h2>
			<p>
				<strong>The requested URL was not found.</strong> That's all we know :(
			</p>
			<Button children='go back' onClick={handleGoBack} />
			<p>
				But you can always go to the <Link to={ROUTES.ROOT}>home page</Link>
			</p>
		</div>
	);
};

export default PageNotFound;
