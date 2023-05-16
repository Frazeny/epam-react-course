import {
	applyMiddleware,
	combineReducers,
	createStore,
	Store,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import * as CourseReducer from './courses/reducer';
import * as AuthorsReducer from './authors/reducer';
import * as CoursesActionCreators from './courses/actionCreators';
import * as UserActionCreators from './user/actionCreators';
import * as AuthorsActionCreators from './authors/actionCreators';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
	user: userReducer,
	courses: CourseReducer.useReducer,
	authors: AuthorsReducer.useReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const store = configureStore({
// 	reducer: { rootReducer },
// 	middleware: [thunk],
// });

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type StoreState = typeof store;

export const ActionCreators = {
	...CoursesActionCreators,
	...UserActionCreators,
	...AuthorsActionCreators,
};
export const ActionCreators2 = {
	courses: { ...CoursesActionCreators },
	user: { ...UserActionCreators },
	authors: {},
};

export const selectUser = (state: RootState) => state.user;
export const selectCourses = (state: RootState) => state.courses;
export const selectAuthors = (state: RootState) => state.authors;
