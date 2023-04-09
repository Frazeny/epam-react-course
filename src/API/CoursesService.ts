import { mockedAuthorsList, mockedCoursesList } from '../constants';
import { IAuthor, ICourse } from '../types/types';

export default class CoursesService {
	static async getAllCourses() {
		const response: ICourse[] = mockedCoursesList;
		return response;
	}

	static async getAllAuthors() {
		const response: IAuthor[] = mockedAuthorsList;
		return response;
	}
}
