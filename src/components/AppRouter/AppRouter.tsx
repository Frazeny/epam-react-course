import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/servisces';
import { UserRoles } from '../../types/types';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import PrivateAdminRoutes from './components/PrivateAdminRoutes/PrivateAdminRoutes';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

const AppRouter: FC = () => {
	const { isAuth, role } = useTypedSelector(selectUser);
	return (
		<>
			{isAuth && role === UserRoles.ADMIN ? (
				<PrivateAdminRoutes />
			) : isAuth ? (
				<PrivateRoutes />
			) : (
				<PublicRoutes />
			)}
		</>
	);
};

export default AppRouter;
