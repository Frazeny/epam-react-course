import axios from 'axios';
import {
	IAuthor,
	ICourse,
	ILoginForm,
	IServerUserInfo,
	IToken,
	IUser,
} from '../types/types';

interface GetResponseProps<T> {
	successful: boolean;
	result: T;
}

interface PostLoggingProps<T> {
	successful: boolean;
	result: T;
	user: IUser;
}

interface PostResponseProps<T> {
	successful: boolean;
	result: T;
}

const SERVER_URL = 'http://localhost:4000';

export default class CoursesService {
	static async getAllCourses() {
		const response = await axios.get<GetResponseProps<ICourse[]>>(
			`${SERVER_URL}/courses/all`
		);
		const data = response.data.result;
		return data;
	}

	static async getAllAuthors() {
		const response = await axios.get<GetResponseProps<IAuthor[]>>(
			`${SERVER_URL}/authors/all`
		);
		return response;
	}

	static async postRegisterNewUser(user: IUser) {
		const response = await axios.post(`${SERVER_URL}/register`, user);
		return response;
	}

	static async postLoginUser(user: ILoginForm) {
		const response = await axios.post<PostLoggingProps<IToken>>(
			`${SERVER_URL}/login`,
			user
		);

		return response;
	}

	static async getUserInfo(accessToken: IToken) {
		const response = await axios.get<GetResponseProps<IServerUserInfo>>(
			`${SERVER_URL}/users/me`,
			{
				headers: {
					type: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response;
	}

	static async deleteLogoutUser(accessToken: IToken) {
		const response = await axios.delete(`${SERVER_URL}/logout`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response;
	}

	static async getCourseInfo(id: string) {
		const response = await axios.get<GetResponseProps<ICourse>>(
			`${SERVER_URL}/courses/${id}`
		);
		return response;
	}

	static async getAuthorByID(id: string) {
		const response = await axios.get<GetResponseProps<IAuthor>>(
			`${SERVER_URL}/authors/${id}`
		);
		return response;
	}

	static async postAddCourse(course: ICourse, accessToken: IToken) {
		const response = await axios.post<PostResponseProps<ICourse>>(
			`${SERVER_URL}/courses/add`,
			course,
			{
				headers: {
					type: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response;
	}

	static async putUpdatedCourse(course: ICourse, accessToken: IToken) {
		const response = await axios.put(
			`${SERVER_URL}/courses/${course.id}`,
			course,
			{
				headers: {
					type: 'application/json',
					Authorization: `Bearer${accessToken}`,
				},
			}
		);
	}

	static async deleteCourse(course: ICourse, accessToken: IToken) {
		const response = await axios.delete(`${SERVER_URL}/courses/${course.id}`, {
			headers: {
				type: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response;
	}

	static async postAddNewAuthor(author: IAuthor, accessToken: IToken) {
		const response = await axios.post<PostResponseProps<IAuthor>>(
			`${SERVER_URL}/authors/add`,
			author,
			{
				headers: {
					type: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response;
	}
}
