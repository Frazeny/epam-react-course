import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';
import { ROUTES } from '../../../router/routes';
import Header from '../Header';
import { mockedState } from '../../../test-utils/mocks';

describe('Header', () => {
	it('renders logo', () => {
		renderWithProviders(renderWithRouter(<Header />, ROUTES.ROOT), {
			preloadedState: mockedState,
		});
		const logoElement = screen.getByRole('img', { name: /Logo/i });
		expect(logoElement).toBeInTheDocument();
	});

	it('renders user name when authorized', () => {
		renderWithProviders(renderWithRouter(<Header />, ROUTES.ROOT), {
			preloadedState: mockedState,
		});
		const nameElement = screen.getByText(mockedState.user.name);
		expect(nameElement).toBeInTheDocument();
	});
});
