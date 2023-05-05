import React, { FC } from 'react';
import { privateRoutes } from '../../../../router/routes';
import { Route, Routes } from 'react-router-dom';

const PrivateRoutes: FC = () => {
	return (
		<Routes>
			{privateRoutes.map((route) => (
				<Route path={route.path} element={route.component} key={route.path} />
			))}
		</Routes>
	);
};

export default PrivateRoutes;
