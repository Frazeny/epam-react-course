import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/servisces';
import { UserRoles } from '../../types/types';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import PrivateAdminRoutes from './components/PrivateAdminRoutes/PrivateAdminRoutes';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import { Route, Routes } from 'react-router-dom';
import {
	privateAdminRoutes,
	privateRoutes,
	publicRoutes,
} from '../../router/routes';

const AppRouter: FC = () => {
	const { isAuth, role } = useTypedSelector(selectUser);
	return (
		<Routes>
			{isAuth
				? [...privateAdminRoutes, ...privateRoutes].map((route) => {
						return (
							<Route
								path={route.path}
								element={route.component}
								key={route.path}
							/>
						);
				  })
				: publicRoutes.map((route) => {
						return (
							<Route
								path={route.path}
								element={route.component}
								key={route.path}
							/>
						);
				  })}
		</Routes>
	);
};

export default AppRouter;
