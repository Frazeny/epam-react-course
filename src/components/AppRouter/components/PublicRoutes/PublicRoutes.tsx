import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../../../../router/routes';

const PublicRoutes: FC = () => {
	return (
		<Routes>
			{publicRoutes.map((route) => (
				<Route path={route.path} element={route.component} key={route.path} />
			))}
		</Routes>
	);
};

export default PublicRoutes;
