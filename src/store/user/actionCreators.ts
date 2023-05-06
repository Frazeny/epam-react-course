import { ILoginForm, IToken } from '../../types/types';
import { Dispatch } from 'redux';
import { UserActions, UserActionTypes } from './actionTypes';
import CoursesService from '../../API/CoursesService';
import { LOCAL_STORAGE } from '../../constants';

export const fetchUser = (loginForm: ILoginForm) => {
	return async (dispatch: Dispatch<UserActions>) => {
		try {
			dispatch({ type: UserActionTypes.FETCH_USER });
			const response = await CoursesService.postLoginUser(loginForm);
			const token = response.data.result.split(' ')[1];
			const user = response.data.user;
			localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
			localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));
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

export const loginUser = (token: IToken) => {
	return async (dispatch: Dispatch<UserActions>) => {
		try {
			dispatch({ type: UserActionTypes.LOGIN_USER });
			console.log('LOGIN_USER');
			const response = await CoursesService.getUserInfo(token);
			localStorage.setItem('test', JSON.stringify(response.data.result));
			console.log('LOGIN_USER_SUCCESS');

			dispatch({
				type: UserActionTypes.LOGIN_USER_SUCCESS,
				payload: {
					serverResponse: response.data.result,
					token: token,
				},
			});
		} catch (error) {
			console.log('LOGIN_USER_ERROR');
			if (error instanceof Error) {
				dispatch({
					type: UserActionTypes.LOGIN_USER_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: UserActionTypes.LOGIN_USER_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};

export const logoutUser = (accessToken: IToken) => {
	return async (dispatch: Dispatch<UserActions>) => {
		try {
			dispatch({
				type: UserActionTypes.LOGOUT_USER,
			});
			await CoursesService.deleteLogoutUser(accessToken);

			localStorage.removeItem(LOCAL_STORAGE.TOKEN);
			localStorage.removeItem(LOCAL_STORAGE.USER);

			dispatch({
				type: UserActionTypes.LOGOUT_USER_SUCCESS,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: UserActionTypes.LOGOUT_USER_ERROR,
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
