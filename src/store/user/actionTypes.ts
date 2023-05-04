import { IToken, IUser } from '../../types/types';

export interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	isLoading: boolean;
	userError: null | string;
}

export enum UserActionTypes {
	FETCH_USER = 'FETCH_USER',
	FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
	FETCH_USER_ERROR = 'FETCH_USER_ERROR',
	LOGOUT_USER = 'LOGOUT_USER',
	LOGIN_USER = 'LOGIN_USER',
}
interface FetchUserAction {
	type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
	type: UserActionTypes.FETCH_USER_SUCCESS;
	payload: {
		user: IUser;
		token: IToken;
	};
}

interface FetchUserErrorAction {
	type: UserActionTypes.FETCH_USER_ERROR;
	payload: string;
}

interface LogoutUserAction {
	type: UserActionTypes.LOGOUT_USER;
}

interface LoginUserAction {
	type: UserActionTypes.LOGIN_USER;
	payload: {
		user: IUser;
		token: IToken;
	};
}

export type UserActions =
	| FetchUserAction
	| FetchUserSuccessAction
	| FetchUserErrorAction
	| LogoutUserAction
	| LoginUserAction;
