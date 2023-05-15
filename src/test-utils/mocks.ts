import { RootState } from '../store/servisces';
import { UserRoles } from '../types/types';
import { mockedAuthorsList, mockedCoursesList } from '../constants';
import { AuthorLibrary } from '../store/authors/actionTypes';

const mockUserName = 'John Doe';
export const mockedState: RootState = {
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
