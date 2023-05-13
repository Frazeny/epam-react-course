import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserRoles } from '../../../types/types';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';
import { ROUTES } from '../../../router/routes';
import Header from '../Header';
import type { RootState } from '../../../store/servisces';

describe('Header', () => {
	const mockUserName = 'John Doe';
	const mockedState: RootState = {
		user: {
			isAuth: true,
			name: mockUserName,
			email: '',
			token: '',
			role: UserRoles.USER,
			userError: null,
			isLoading: false,
		},
		courses: {
			courses: [],
			isCoursesLoading: false,
			coursesError: null,
		},
		authors: {
			authors: {},
			isAuthorsLoading: false,
			authorsError: null,
		},
	};

	test('renders logo', () => {
		renderWithProviders(renderWithRouter(<Header />, ROUTES.ROOT), {
			preloadedState: mockedState,
		});
		const logoElement = screen.getByRole('img', { name: /Logo/i });
		expect(logoElement).toBeInTheDocument();
	});

	test('renders user name when authorized', () => {
		renderWithProviders(renderWithRouter(<Header />, ROUTES.ROOT), {
			preloadedState: mockedState,
		});
		const nameElement = screen.getByText(mockUserName);
		expect(nameElement).toBeInTheDocument();
	});
});
