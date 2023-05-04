import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router/routes';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/servisces';

const AppRouter: FC = () => {
	const { isAuth } = useTypedSelector(selectUser);
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
