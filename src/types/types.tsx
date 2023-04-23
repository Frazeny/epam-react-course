export interface IUser {
	name: string;
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
