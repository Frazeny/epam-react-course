import CoursesService from '../../API/CoursesService';
import { CoursesAction, CoursesActionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import { ICourse } from '../../types/types';

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

export const addCourse = (course: ICourse): CoursesAction => {
	return {
		type: CoursesActionTypes.ADD_COURSE,
		payload: course,
	};
};

export const deleteCourse = (course: ICourse) => {
	return {
		type: CoursesActionTypes.DELETE_COURSE,
		payload: course,
	};
};
