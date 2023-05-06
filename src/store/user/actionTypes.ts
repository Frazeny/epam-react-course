import { IServerUserInfo, IToken, IUser, UserRoles } from '../../types/types';

export interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	isLoading: boolean;
	userError: null | string;
	role: UserRoles.ADMIN | UserRoles.USER;
}

export enum UserActionTypes {
	FETCH_USER = 'FETCH_USER',
	FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
	FETCH_USER_ERROR = 'FETCH_USER_ERROR',
	LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
	LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR',
	LOGOUT_USER = 'LOGOUT_USER',
	LOGIN_USER = 'LOGIN_USER',
	LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
	LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
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
interface LogoutUserSuccessAction {
	type: UserActionTypes.LOGOUT_USER_SUCCESS;
}
interface LogoutUserErrorAction {
	type: UserActionTypes.LOGOUT_USER_ERROR;
	payload: string;
}

interface LoginUserAction {
	type: UserActionTypes.LOGIN_USER;
}

interface LoginUserSuccessAction {
	type: UserActionTypes.LOGIN_USER_SUCCESS;
	payload: {
		serverResponse: IServerUserInfo;
		token: IToken;
	};
}

interface LoginUserErrorAction {
	type: UserActionTypes.LOGIN_USER_ERROR;
	payload: string;
}

export type UserActions =
	| FetchUserAction
	| FetchUserSuccessAction
	| FetchUserErrorAction
	| LogoutUserAction
	| LoginUserAction
	| LoginUserSuccessAction
	| LoginUserErrorAction
	| LogoutUserSuccessAction
	| LogoutUserErrorAction;
