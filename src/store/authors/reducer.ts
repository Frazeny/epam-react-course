import {
	AuthorLibrary,
	AuthorsActions,
	AuthorsActionTypes,
	AuthorsState,
} from './actionTypes';

const initialState: AuthorsState = {
	authors: {},
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
				authors: {
					...state.authors,
					...action.payload.reduce((acc: AuthorLibrary, author) => {
						acc[author.id] = author;
						return acc;
					}, {}),
				},
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
				isAuthorsLoading: true,
				authorsError: null,
			};
		case AuthorsActionTypes.ADD_AUTHOR_SUCCESS:
			return {
				...state,
				isAuthorsLoading: false,
				authors: {
					...state.authors,
					[action.payload.id]: action.payload,
				},
			};
		case AuthorsActionTypes.ADD_AUTHOR_ERROR:
			return {
				...state,
				isAuthorsLoading: false,
				authorsError: action.payload,
			};
		default:
			return state;
	}
};
