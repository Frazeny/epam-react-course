import { renderWithProviders } from '../../../../../test-utils/renderWithProviders';
import { renderWithRouter } from '../../../../../test-utils/renderWithRouter';
import CourseCard from '../CourseCard';
import { ROUTES } from '../../../../../router/routes';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { dateConverter } from '../../../../../helpers/dateGeneratop';
import { formattedDuration } from '../../../../../helpers/pipeDuration';
import { mockedState } from '../../../../../test-utils/mocks';

describe('CourseCard', () => {
	test('renders title', () => {
		renderWithProviders(
			renderWithRouter(
				<CourseCard
					course={mockedState.courses.courses[0]}
					authors={Object.values(mockedState.authors.authors)}
				/>,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);

		const title = screen.getByText(mockedState.courses.courses[0].title);
		expect(title).toBeInTheDocument();
	});

	test('renders display description', () => {
		renderWithProviders(
			renderWithRouter(
				<CourseCard
					course={mockedState.courses.courses[0]}
					authors={Object.values(mockedState.authors.authors)}
				/>,
				ROUTES.COURSES
			),
			{
				preloadedState: mockedState,
			}
		);

		const description = screen.getByText(
			mockedState.courses.courses[0].description
		);
		expect(description).toBeInTheDocument();
	});

	test('renders duration in the correct format', () => {
		const correctDurationFormat = formattedDuration(
			mockedState.courses.courses[0].duration
		);
		renderWithProviders(
			renderWithRouter(
				<CourseCard
					course={mockedState.courses.courses[0]}
					authors={Object.values(mockedState.authors.authors)}
				/>,
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
		let courseAuthorsString = mockedState.courses.courses[0].authors
			.map((authorID) => {
				const author = Object.values(mockedState.authors.authors).find(
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
				<CourseCard
					course={mockedState.courses.courses[0]}
					authors={Object.values(mockedState.authors.authors)}
				/>,
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
			new Date(mockedState.courses.courses[0].creationDate)
		);
		renderWithProviders(
			renderWithRouter(
				<CourseCard
					course={mockedState.courses.courses[0]}
					authors={Object.values(mockedState.authors.authors)}
				/>,
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
