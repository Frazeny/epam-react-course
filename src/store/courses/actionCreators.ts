import CoursesService from '../../API/CoursesService';
import { CoursesAction, CoursesActionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import { ICourse, IToken } from '../../types/types';

export const fetchCourses = () => {
	return async (dispatch: Dispatch<CoursesAction>) => {
		try {
			dispatch({ type: CoursesActionTypes.FETCH_COURSES });
			const response = await CoursesService.getAllCourses();
			dispatch({
				type: CoursesActionTypes.FETCH_COURSES_SUCCESS,
				payload: response,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: CoursesActionTypes.FETCH_COURSES_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: CoursesActionTypes.FETCH_COURSES_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};

export const addCourse = (course: ICourse, token: IToken) => {
	return async (dispatch: Dispatch<CoursesAction>) => {
		try {
			dispatch({ type: CoursesActionTypes.ADD_COURSE });
			const response = await CoursesService.postAddCourse(course, token);
			dispatch({
				type: CoursesActionTypes.ADD_COURSE_SUCCESS,
				payload: response.data.result,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: CoursesActionTypes.ADD_COURSE_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: CoursesActionTypes.ADD_COURSE_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};

export const deleteCourse = (course: ICourse, accessToken: IToken) => {
	return async (dispatch: Dispatch<CoursesAction>) => {
		try {
			dispatch({
				type: CoursesActionTypes.DELETE_COURSE,
			});
			await CoursesService.deleteCourse(course, accessToken);
			dispatch({
				type: CoursesActionTypes.DELETE_COURSE_SUCCESS,
				payload: course,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: CoursesActionTypes.DELETE_COURSE_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: CoursesActionTypes.DELETE_COURSE_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};

export const updateCourse = (course: ICourse, accessToken: IToken) => {
	return async (dispatch: Dispatch<CoursesAction>) => {
		try {
			dispatch({
				type: CoursesActionTypes.UPDATE_COURSE,
			});
			await CoursesService.putUpdatedCourse(course, accessToken);
			dispatch({
				type: CoursesActionTypes.UPDATE_COURSE_SUCCESS,
				payload: course,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: CoursesActionTypes.UPDATE_COURSE_ERROR,
					payload: error.message,
				});
			} else {
				dispatch({
					type: CoursesActionTypes.UPDATE_COURSE_ERROR,
					payload: `Unexpected error ${error}`,
				});
			}
		}
	};
};
