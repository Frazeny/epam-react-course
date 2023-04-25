export interface IUser {
	email: string;
	name: string;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IAuthor {
	id: string;
	name: string;
}

export interface ICourse {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface IMockedData {
	mockedCoursesList: ICourse[];
	mockedAuthorsList: IAuthor[];
}
