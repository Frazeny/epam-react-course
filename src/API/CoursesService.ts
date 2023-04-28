import axios from 'axios';
import { IAuthor, ICourse, ILoginForm, IUser } from '../types/types';
import { LOCAL_STORAGE } from '../constants';
import { useEffect, useState } from 'react';

enum ResponseBodyProps {
	SUCCESSFUL = 'successful',
	RESULT = 'result',
}
interface GetResponseProps<T> {
	successful: boolean;
	result: T;
}

interface PostResponseProps<T> {
	successful: boolean;
	result: T;
}

const getAccessToken = () => {
	return localStorage.getItem(LOCAL_STORAGE.TOKEN);
};

const useFetching = <T>(promiseFn: () => T) => {
	const [result, setResult] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = promiseFn();
				setResult(response);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError(`Unknown error: ${error}`);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [promiseFn]);

	return [result, isLoading, error] as const;
};

// type IMethod = keyof typeof AxiosRe;

// async function API(
// 	url,
// 	method: keyof typeof axios.AxiosHeaders,
// 	data,
// 	needAccessToken = false
// ) {
// 	//   Set loader true
// 	try {
// 		let config = {};
// 		if (needAccessToken) {
// 			config = {
// 				...config,
// 				headers: {
// 					Authorization: `${getAccessToken()}`,
// 				},
// 			};
// 		}
// 		const res = await axios[method](url, data, config);
// 	} catch (error) {
// 		//   set Text error
// 	} finally {
// 		//   set loader false
// 	}
// }

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
		const response = await axios.post(`${SERVER_URL}/login`, user);
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

	static async postAddCourse(course: ICourse, accessToken: string) {
		const response = await axios.post<PostResponseProps<string>>(
			`${SERVER_URL}/courses/add`,
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
