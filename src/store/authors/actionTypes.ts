import { IAuthor } from '../../types/types';

export interface AuthorLibrary {
	[key: string]: IAuthor;
}

export interface AuthorsState {
	authors: AuthorLibrary;
	isAuthorsLoading: boolean;
	authorsError: null | string;
}

export enum AuthorsActionTypes {
	FETCH_AUTHORS = 'FETCH_AUTHORS',
	FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS',
	FETCH_AUTHORS_ERROR = 'FETCH_AUTHORS_ERROR',
	ADD_AUTHOR = 'ADD_AUTHOR',
	ADD_AUTHOR_SUCCESS = 'ADD_AUTHOR_SUCCESS',
	ADD_AUTHOR_ERROR = 'ADD_AUTHOR_ERROR',
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
}

interface AddAuthorsSuccessAction {
	type: AuthorsActionTypes.ADD_AUTHOR_SUCCESS;
	payload: IAuthor;
}

interface AddAuthorsErrorAction {
	type: AuthorsActionTypes.ADD_AUTHOR_ERROR;
	payload: string;
}

export type AuthorsActions =
	| FetchAuthorsAction
	| FetchAuthorsSuccessAction
	| FetchAuthorsErrorAction
	| AddAuthorAction
	| AddAuthorsSuccessAction
	| AddAuthorsErrorAction;
