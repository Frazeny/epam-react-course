import { ILoginForm, IToken, IUser } from '../../types/types';
import { Dispatch } from 'redux';
import { UserActions, UserActionTypes } from './actionTypes';
import CoursesService from '../../API/CoursesService';

export const fetchUser = (loginForm: ILoginForm) => {
	return async (dispatch: Dispatch<UserActions>) => {
		try {
			dispatch({ type: UserActionTypes.FETCH_USER });
			const response = await CoursesService.postLoginUser(loginForm);
			const token = response.data.result;
			const user = response.data.user;
			dispatch({
				type: UserActionTypes.FETCH_USER_SUCCESS,
				payload: { user, token },
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: UserActionTypes.FETCH_USER_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: UserActionTypes.FETCH_USER_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};

interface ILoginPayload {
	user: IUser;
	token: IToken;
}
export const loginUser = (payload: ILoginPayload): UserActions => {
	return {
		type: UserActionTypes.LOGIN_USER,
		payload: payload,
	};
};

export const logoutUser = (): UserActions => {
	return {
		type: UserActionTypes.LOGOUT_USER,
	};
};
