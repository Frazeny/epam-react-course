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
	ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS',
	ADD_COURSE_ERROR = 'ADD_COURSE_ERROR',
	DELETE_COURSE = 'DELETE_COURSE',
	DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS',
	DELETE_COURSE_ERROR = 'DELETE_COURSE_ERROR',
	UPDATE_COURSE = 'UPDATE_COURSE',
	UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS',
	UPDATE_COURSE_ERROR = 'UPDATE_COURSE_ERROR',
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

interface AddNewCourseAction {
	type: CoursesActionTypes.ADD_COURSE;
}
interface AddNewCourseSuccessAction {
	type: CoursesActionTypes.ADD_COURSE_SUCCESS;
	payload: ICourse;
}
interface AddNewCourseErrorAction {
	type: CoursesActionTypes.ADD_COURSE_ERROR;
	payload: string;
}

interface DeleteCourseAction {
	type: CoursesActionTypes.DELETE_COURSE;
}

interface DeleteCourseSuccessAction {
	type: CoursesActionTypes.DELETE_COURSE_SUCCESS;
	payload: ICourse;
}
interface DeleteCourseErrorAction {
	type: CoursesActionTypes.DELETE_COURSE_ERROR;
	payload: string;
}

interface UpdateCourseAction {
	type: CoursesActionTypes.UPDATE_COURSE;
}

interface UpdateCourseSuccessAction {
	type: CoursesActionTypes.UPDATE_COURSE_SUCCESS;
	payload: ICourse;
}
interface UpdateCourseErrorAction {
	type: CoursesActionTypes.UPDATE_COURSE_ERROR;
	payload: string;
}

export type CoursesAction =
	| FetchCoursesAction
	| FetchCoursesSuccessAction
	| FetchCoursesErrorAction
	| AddNewCourseAction
	| AddNewCourseSuccessAction
	| AddNewCourseErrorAction
	| DeleteCourseAction
	| DeleteCourseSuccessAction
	| DeleteCourseErrorAction
	| UpdateCourseAction
	| UpdateCourseSuccessAction
	| UpdateCourseErrorAction;
