import { mockedCoursesList } from '../../constants';
import { CoursesAction, CoursesActionTypes, CoursesState } from './actionTypes';

const initialState: CoursesState = {
	courses: mockedCoursesList,
	isCoursesLoading: false,
	coursesError: null,
};

export const useReducer = (
	state = initialState,
	action: CoursesAction
): CoursesState => {
	switch (action.type) {
		case CoursesActionTypes.FETCH_COURSES:
			return {
				...state,
				isCoursesLoading: true,
				coursesError: null,
			};
		case CoursesActionTypes.FETCH_COURSES_SUCCESS:
			return {
				...state,
				isCoursesLoading: false,
				courses: [
					...state.courses,
					...action.payload.filter((course) => {
						return !state.courses.find(
							(existingCourse) => existingCourse.id === course.id
						);
					}),
				],
			};
		case CoursesActionTypes.FETCH_COURSES_ERROR:
			return {
				...state,
				isCoursesLoading: false,
				coursesError: action.payload,
			};
		case CoursesActionTypes.ADD_COURSE:
			return {
				...state,
				isCoursesLoading: true,
				coursesError: null,
			};
		case CoursesActionTypes.ADD_COURSE_SUCCESS:
			return {
				...state,
				isCoursesLoading: false,
				courses: [...state.courses, action.payload],
			};
		case CoursesActionTypes.ADD_COURSE_ERROR:
			return {
				...state,
				isCoursesLoading: false,
				coursesError: action.payload,
			};
		case CoursesActionTypes.DELETE_COURSE:
			return {
				...state,
				isCoursesLoading: true,
				coursesError: null,
			};
		case CoursesActionTypes.DELETE_COURSE_SUCCESS:
			return {
				...state,
				isCoursesLoading: false,
				courses: [
					...state.courses.filter((course) => course.id !== action.payload.id),
				],
			};
		case CoursesActionTypes.DELETE_COURSE_ERROR:
			return {
				...state,
				isCoursesLoading: false,
				coursesError: action.payload,
			};
		case CoursesActionTypes.UPDATE_COURSE:
			return {
				...state,
				isCoursesLoading: true,
				coursesError: null,
			};
		case CoursesActionTypes.UPDATE_COURSE_SUCCESS:
			return {
				...state,
				isCoursesLoading: false,
				courses: [
					...state.courses.filter(
						(course) => course.id !== action.payload.id,
						action.payload
					),
				],
			};
		case CoursesActionTypes.UPDATE_COURSE_ERROR:
			return {
				...state,
				isCoursesLoading: false,
				coursesError: action.payload,
			};
		default:
			return state;
	}
};
