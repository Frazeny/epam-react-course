import { mockedAuthorsList } from '../../constants';
import {
	AuthorsActions,
	AuthorsActionTypes,
	AuthorsState,
} from './actionTypes';

const initialState: AuthorsState = {
	authors: mockedAuthorsList,
	isAuthorsLoading: false,
	authorsError: null,
};

export const useReducer = (
	state = initialState,
	action: AuthorsActions
): AuthorsState => {
	switch (action.type) {
		case AuthorsActionTypes.FETCH_AUTHORS:
			return {
				...state,
				isAuthorsLoading: true,
				authorsError: null,
			};
		case AuthorsActionTypes.FETCH_AUTHORS_SUCCESS:
			return {
				...state,
				isAuthorsLoading: false,
				authors: [
					...state.authors,
					...action.payload.filter((author) => {
						return !state.authors.some(
							(existingAuthor) => existingAuthor.id === author.id
						);
					}),
				],
			};
		case AuthorsActionTypes.FETCH_AUTHORS_ERROR:
			return {
				...state,
				isAuthorsLoading: false,
				authorsError: action.payload,
			};
		case AuthorsActionTypes.ADD_AUTHOR:
			return {
				...state,
				authors: [...state.authors, action.payload],
			};
		default:
			return state;
	}
};
