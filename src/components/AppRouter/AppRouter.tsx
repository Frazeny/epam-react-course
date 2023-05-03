import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router/routes';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AppRouter: FC = () => {
	const { isAuth } = useTypedSelector((state) => state.user);
	return (
		<Routes>
			{isAuth
				? privateRoutes.map((route) => {
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
