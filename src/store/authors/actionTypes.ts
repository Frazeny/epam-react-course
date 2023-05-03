import { IAuthor } from '../../types/types';

export interface AuthorsState {
	authors: IAuthor[];
	isAuthorsLoading: boolean;
	authorsError: null | string;
}

export enum AuthorsActionTypes {
	FETCH_AUTHORS = 'FETCH_AUTHORS',
	FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS',
	FETCH_AUTHORS_ERROR = 'FETCH_AUTHORS_ERROR',
	ADD_AUTHOR = 'ADD_AUTHOR',
}

interface FetchAuthorsAction {
	type: AuthorsActionTypes.FETCH_AUTHORS;
}

interface FetchAuthorsSuccessAction {
	type: AuthorsActionTypes.FETCH_AUTHORS_SUCCESS;
	payload: IAuthor[];
}

interface FetchAuthorsErrorAction {
	type: AuthorsActionTypes.FETCH_AUTHORS_ERROR;
	payload: string;
}

interface AddAuthorAction {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: IAuthor;
}

export type AuthorsActions =
	| FetchAuthorsAction
	| FetchAuthorsSuccessAction
	| FetchAuthorsErrorAction
	| AddAuthorAction;
