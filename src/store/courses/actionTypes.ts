import { ICourse } from '../../types/types';

export interface CoursesState {
	courses: ICourse[];
	isCoursesLoading: boolean;
	coursesError: null | string;
}

export enum CoursesActionTypes {
	FETCH_COURSES = 'FETCH_COURSES',
	FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS',
	FETCH_COURSES_ERROR = 'FETCH_COURSES_ERROR',
	ADD_COURSE = 'ADD_COURSE',
	DELETE_COURSE = 'DELETE_COURSE',
}

interface FetchCoursesAction {
	type: CoursesActionTypes.FETCH_COURSES;
}

interface FetchCoursesSuccessAction {
	type: CoursesActionTypes.FETCH_COURSES_SUCCESS;
	payload: ICourse[];
}

interface FetchCoursesErrorAction {
	type: CoursesActionTypes.FETCH_COURSES_ERROR;
	payload: string;
}

interface AddNewCourse {
	type: CoursesActionTypes.ADD_COURSE;
	payload: ICourse;
}

interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: ICourse;
}

export type CoursesAction =
	| FetchCoursesAction
	| FetchCoursesSuccessAction
	| FetchCoursesErrorAction
	| AddNewCourse
	| DeleteCourse;
