import CoursesService from '../../API/CoursesService';
import { AuthorsActions, AuthorsActionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import { IAuthor, IToken } from '../../types/types';

export const fetchAuthors = () => {
	return async (dispatch: Dispatch<AuthorsActions>) => {
		try {
			dispatch({ type: AuthorsActionTypes.FETCH_AUTHORS });
			const response = await CoursesService.getAllAuthors();
			dispatch({
				type: AuthorsActionTypes.FETCH_AUTHORS_SUCCESS,
				payload: response,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: AuthorsActionTypes.FETCH_AUTHORS_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: AuthorsActionTypes.FETCH_AUTHORS_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};

export const addAuthor = (author: IAuthor, token: IToken) => {
	return async (dispatch: Dispatch<AuthorsActions>) => {
		try {
			dispatch({
				type: AuthorsActionTypes.ADD_AUTHOR,
			});
			const response = await CoursesService.postAddNewAuthor(author, token);
			dispatch({
				type: AuthorsActionTypes.ADD_AUTHOR_SUCCESS,
				payload: response.data.result,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: AuthorsActionTypes.ADD_AUTHOR_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: AuthorsActionTypes.ADD_AUTHOR_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};
