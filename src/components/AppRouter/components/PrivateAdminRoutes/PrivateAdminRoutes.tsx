import React, { FC } from 'react';
import { privateAdminRoutes, privateRoutes } from '../../../../router/routes';
import { Route, Routes } from 'react-router-dom';

const PrivateAdminRoutes: FC = () => {
	return (
		<Routes>
			{[...privateAdminRoutes, ...privateRoutes].map((route) => (
				<Route path={route.path} element={route.component} key={route.path} />
			))}
		</Routes>
	);
};

export default PrivateAdminRoutes;
