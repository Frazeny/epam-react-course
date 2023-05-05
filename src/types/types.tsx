export interface IUser {
	email: string;
	name: string;
}

export interface IUserCredentials extends IUser {
	role: UserRoles.USER | UserRoles.ADMIN;
}

export interface IServerUserInfo extends IUserCredentials {
	password: string;
	id: string;
}

export enum UserRoles {
	USER = 'user',
	ADMIN = 'admin',
}

export type IToken = string;
export interface ILoginForm {
	email: string;
	password: string;
}

export type IAuthor = {
	id: string;
	name: string;
};

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
