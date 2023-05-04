import { UserActions, UserActionTypes, UserState } from './actionTypes';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	isLoading: false,
	userError: null,
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
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.token,
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
