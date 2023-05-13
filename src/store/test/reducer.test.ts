import '@testing-library/jest-dom';
import { mockedCoursesList } from '../../constants';
import {
	CoursesAction,
	CoursesActionTypes,
	CoursesState,
} from '../courses/actionTypes';
import { useReducer as coursesReducer } from '../courses/reducer';
import { ICourse } from '../../types/types';

interface UnexpectedAction {
	type: string;
	payload: null;
}

const mockedError = 'Mocked Error';
const mockedCourse: ICourse = {
	id: '1',
	title: 'title',
	description: 'description',
	authors: [mockedCoursesList[0].authors[0]],
	creationDate: Date.now().toString(),
	duration: 120,
};

describe('coursesReducer', () => {
	let initialState: CoursesState;

	beforeEach(() => {
		initialState = {
			courses: mockedCoursesList,
			isCoursesLoading: false,
			coursesError: null,
		};
	});
	// TODO: Запитати як передати неіснуючий action
	it('should return initial state', () => {
		const action: UnexpectedAction = {
			type: '',
			payload: null,
		};

		expect(coursesReducer(initialState, action as CoursesAction)).toEqual(
			initialState
		);
	});

	it('should handle FETCH_COURSES', () => {
		const action: CoursesAction = { type: CoursesActionTypes.FETCH_COURSES };
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: true,
			coursesError: null,
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle FETCH_COURSES_SUCCESS', () => {
		const action: CoursesAction = {
			type: CoursesActionTypes.FETCH_COURSES_SUCCESS,
			payload: [mockedCourse],
		};
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: false,
			courses: [...initialState.courses, mockedCourse],
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle FETCH_COURSES_ERROR', () => {
		const action: CoursesAction = {
			type: CoursesActionTypes.FETCH_COURSES_ERROR,
			payload: mockedError,
		};
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: false,
			coursesError: mockedError,
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle ADD_COURSE', () => {
		const action: CoursesAction = { type: CoursesActionTypes.ADD_COURSE };
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: true,
			coursesError: null,
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle ADD_COURSE_SUCCESS', () => {
		const action: CoursesAction = {
			type: CoursesActionTypes.ADD_COURSE_SUCCESS,
			payload: mockedCourse,
		};
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: false,
			courses: [...initialState.courses, mockedCourse],
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle ADD_COURSE_ERROR', () => {
		const action: CoursesAction = {
			type: CoursesActionTypes.ADD_COURSE_ERROR,
			payload: mockedError,
		};
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: false,
			coursesError: mockedError,
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle DELETE_COURSE', () => {
		const action: CoursesAction = {
			type: CoursesActionTypes.DELETE_COURSE,
		};
		const expectedState: CoursesState = {
			...initialState,
			isCoursesLoading: true,
			coursesError: null,
		};
		expect(coursesReducer(initialState, action)).toEqual(expectedState);
	});
	it('should handle DELETE_COURSE_SUCCESS', () => {
		const courseToDelete: ICourse = mockedCoursesList[0];
		const state: CoursesState = {
			courses: mockedCoursesList,
			isCoursesLoading: false,
			coursesError: null,
		};
		const action: CoursesAction = {
			type: CoursesActionTypes.DELETE_COURSE_SUCCESS,
			payload: courseToDelete,
		};
		const expectedState: CoursesState = {
			courses: mockedCoursesList.filter(
				(course: ICourse) => course.id !== courseToDelete.id
			),
			isCoursesLoading: false,
			coursesError: null,
		};
		expect(coursesReducer(state, action)).toEqual(expectedState);
	});

	it('should handle DELETE_COURSE_ERROR', () => {
		const state: CoursesState = {
			courses: mockedCoursesList,
			isCoursesLoading: false,
			coursesError: null,
		};
		const action: CoursesAction = {
			type: CoursesActionTypes.DELETE_COURSE_ERROR,
			payload: mockedError,
		};
		const expectedState: CoursesState = {
			courses: mockedCoursesList,
			isCoursesLoading: false,
			coursesError: mockedError,
		};
		expect(coursesReducer(state, action)).toEqual(expectedState);
	});

	it('should handle UPDATE_COURSE', () => {
		const state: CoursesState = {
			courses: mockedCoursesList,
			isCoursesLoading: false,
			coursesError: 'previous error',
		};

		const action: CoursesAction = {
			type: CoursesActionTypes.UPDATE_COURSE,
		};
		const expectedState: CoursesState = {
			...state,
			isCoursesLoading: true,
			coursesError: null,
		};
		expect(coursesReducer(state, action)).toEqual(expectedState);
	});

	it('should handle UPDATE_COURSE_SUCCESS', () => {
		const updatedCourse: ICourse = {
			...mockedCoursesList[0],
			duration: 1000,
		};
		const state: CoursesState = {
			courses: mockedCoursesList,
			isCoursesLoading: true,
			coursesError: null,
		};
		const action: CoursesAction = {
			type: CoursesActionTypes.UPDATE_COURSE_SUCCESS,
			payload: updatedCourse,
		};
		const expectedState: CoursesState = {
			...state,
			isCoursesLoading: false,
			// courses: state.courses.map((course) =>
			// 	course.id === updatedCourse.id ? updatedCourse : course
			// ),
			courses: [
				...state.courses.filter((course) => course.id !== action.payload.id),
			],
		};
		expect(coursesReducer(state, action)).toEqual(expectedState);
	});

	it('should handle UPDATE_COURSE_ERROR', () => {
		const error = 'Failed to update course';
		const state: CoursesState = {
			courses: mockedCoursesList,
			isCoursesLoading: true,
			coursesError: null,
		};
		const action: CoursesAction = {
			type: CoursesActionTypes.UPDATE_COURSE_ERROR,
			payload: error,
		};
		const expectedState: CoursesState = {
			...state,
			isCoursesLoading: false,
			coursesError: error,
		};
		expect(coursesReducer(state, action)).toEqual(expectedState);
	});
});
