import { renderWithProviders } from '../../../../../test-utils/renderWithProviders';
import { renderWithRouter } from '../../../../../test-utils/renderWithRouter';
import CourseCard from '../CourseCard';
import { ROUTES } from '../../../../../router/routes';
import { mockedAuthorsList, mockedCoursesList } from '../../../../../constants';
import { RootState } from '../../../../../store/servisces';
import { screen } from '@testing-library/react';
import { UserRoles } from '../../../../../types/types';
import '@testing-library/jest-dom';
import { dateConverter } from '../../../../../helpers/dateGeneratop';
import { formattedDuration } from '../../../../../helpers/pipeDuration';

const mockedCourse = mockedCoursesList[0];
const mockUserName = 'John Doe';
const mockedUserState = {
	isAuth: true,
	name: mockUserName,
	email: '',
	token: '',
	role: UserRoles.USER,
	userError: null,
	isLoading: false,
};
const mockedState: RootState = {
	user: mockedUserState,
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

describe('CourseCard', () => {
	// TODO: напевно винести рендер в beforeAll()?
	test('renders title', () => {
		renderWithProviders(
			renderWithRouter(
				<CourseCard course={mockedCourse} authors={mockedAuthorsList} />,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);

		const title = screen.getByText(mockedCourse.title);
		expect(title).toBeInTheDocument();
	});

	test('renders display description', () => {
		renderWithProviders(
			renderWithRouter(
				<CourseCard course={mockedCourse} authors={mockedAuthorsList} />,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);

		const description = screen.getByText(mockedCourse.description);
		expect(description).toBeInTheDocument();
	});

	test('renders duration in the correct format', () => {
		const correctDurationFormat = formattedDuration(mockedCourse.duration);
		renderWithProviders(
			renderWithRouter(
				<CourseCard course={mockedCourse} authors={mockedAuthorsList} />,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);
		const duration = screen.queryByText(correctDurationFormat);
		expect(duration).toBeInTheDocument();
	});

	test('renders authors list', () => {
		// TODO: refactor courseAuthorsString: винести це з компонента CourseCard і тут в хелпери
		let courseAuthorsString = mockedCourse.authors
			.map((authorID) => {
				const author = mockedAuthorsList.find(
					(author) => author.id === authorID
				);
				return author ? author.name : '';
			})
			.join(', ');

		courseAuthorsString =
			courseAuthorsString.length < 60
				? courseAuthorsString
				: courseAuthorsString.slice(0, 60) + '...';

		renderWithProviders(
			renderWithRouter(
				<CourseCard course={mockedCourse} authors={mockedAuthorsList} />,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);
		const authorsList = screen.queryByText(courseAuthorsString);
		expect(authorsList).toBeInTheDocument();
	});

	test('renders created date in the correct format', () => {
		const correctCreatedDateFormat = dateConverter(
			new Date(mockedCourse.creationDate)
		);
		renderWithProviders(
			renderWithRouter(
				<CourseCard course={mockedCourse} authors={mockedAuthorsList} />,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);
		const creationDate = screen.queryByText(correctCreatedDateFormat);
		expect(creationDate).toBeInTheDocument();
	});
});
