import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';
import { ROUTES } from '../../../router/routes';
import type { RootState } from '../../../store/servisces';
import Courses from '../Courses';
import { mockedState } from '../../../test-utils/mocks';

describe('Courses', () => {
	test('renders amount of CourseCard equal length of courses array', async () => {
		const { getAllByTestId } = renderWithProviders(
			renderWithRouter(<Courses />, ROUTES.COURSES),
			{
				preloadedState: mockedState,
			}
		);
		const courseCards = await getAllByTestId('course-card');
		expect(courseCards.length).toBe(mockedState.courses.courses.length);
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
