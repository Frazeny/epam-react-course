import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { UserRoles } from '../../../types/types';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';
import { ROUTES } from '../../../router/routes';
import type { RootState } from '../../../store/servisces';
import { mockedAuthorsList, mockedCoursesList } from '../../../constants';
import { AuthorLibrary } from '../../../store/authors/actionTypes';
import Courses from '../Courses';

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
		courses: mockedCoursesList,
		isCoursesLoading: false,
		coursesError: null,
	},
	authors: {
		authors: mockedAuthorsList.reduce((acc: AuthorLibrary, author) => {
			acc[author.id] = author;
			return acc;
		}, {}),
		isAuthorsLoading: false,
		authorsError: null,
	},
};

describe('Courses', () => {
	test('renders amount of CourseCard equal length of courses array', async () => {
		const { getAllByTestId } = renderWithProviders(
			renderWithRouter(<Courses />, ROUTES.COURSES),
			{
				preloadedState: mockedState,
			}
		);
		const courseCards = await getAllByTestId('course-card');
		expect(courseCards.length).toBe(mockedCoursesList.length);
	});

	test('renders empty container if courses array length is 0', async () => {
		const mockedSt: RootState = {
			...mockedState,
			courses: {
				coursesError: null,
				isCoursesLoading: false,
				courses: [],
			},
		};
		renderWithProviders(renderWithRouter(<Courses />, ROUTES.COURSES), {
			preloadedState: mockedSt,
		});

		const courseCards = await screen.queryAllByTestId('course-card');
		expect(courseCards.length).toBe(0);
	});
});
