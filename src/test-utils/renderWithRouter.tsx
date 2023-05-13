import { ROUTES } from '../router/routes';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../components/AppRouter/AppRouter';

export const renderWithRouter = (
	component: JSX.Element,
	initialRoute = ROUTES.ROOT
) => {
	return (
		<MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
	);
};
