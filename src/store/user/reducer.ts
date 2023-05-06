import { UserActions, UserActionTypes, UserState } from './actionTypes';
import { UserRoles } from '../../types/types';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	isLoading: false,
	userError: null,
	role: UserRoles.USER,
};

export const userReducer = (
	state = initialState,
	action: UserActions
): UserState => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER:
			return {
				...state,
				isLoading: true,
				userError: '',
				isAuth: false,
			};
		case UserActionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.token,
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				...state,
				isLoading: false,
				userError: action.payload,
			};
		case UserActionTypes.LOGIN_USER:
			return {
				...state,
				isLoading: true,
				userError: null,
			};
		case UserActionTypes.LOGIN_USER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				isAuth: true,
				name: action.payload.serverResponse.name,
				email: action.payload.serverResponse.email,
				role: action.payload.serverResponse.role,
				token: action.payload.token,
			};
		}

		case UserActionTypes.LOGIN_USER_ERROR:
			return {
				...state,
				isLoading: false,
				userError: action.payload,
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				userError: null,
				isLoading: false,
			};
		default:
			return state;
	}
};
