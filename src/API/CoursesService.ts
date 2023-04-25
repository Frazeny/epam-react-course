import axios from 'axios';
import { ICourse, ILoginForm, IUser } from '../types/types';

export default class CoursesService {
	static async getAllCourses() {
		const response = await axios.get('http://localhost:4000/courses/all');
		return response;
	}

	static async getAllAuthors() {
		const response = await axios.get('http://localhost:4000/authors/all');
		return response;
	}

	static async postRegisterNewUser(user: IUser) {
		const response = await axios.post('http://localhost:4000/register', user);
		return response;
	}

	static async postLoginUser(user: ILoginForm) {
		const response = await axios.post('http://localhost:4000/login', user);
		return response;
	}

	static async getCourseInfo(id: string) {
		const response = await axios.get(`http://localhost:4000/courses/${id}`);
		return response;
	}

	static async getAuthorByID(id: string) {
		const response = await axios.get(`http://localhost:4000/authors/${id}`);
		return response;
	}

	static async postAddCourse(course: ICourse, accessToken: string) {
		const response = await axios.post(
			'http://localhost:4000/courses/add',
			course,
			{
				headers: {
					Authorization: `${accessToken}`,
				},
			}
		);
		return response;
	}
}
