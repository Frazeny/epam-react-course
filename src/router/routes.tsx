import Courses from '../components/Courses/Courses';
import CreateCourse from '../components/CreateCourse/CreateCourse';
import Registration from '../components/Registration/Registration';
import Login from '../components/Login/Login';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import PageNotFound from '../components/PageNotFound/PageNotFound';

export const ROUTES = {
	ROOT: '/',
	REGISTRATION: '/registration',
	LOGIN: '/login',
	COURSES: '/courses',
	COURSE: 'courses/:courseId',
	ADD_COURSE: '/courses/add',
	PAGE_NOT_FOUND: '/*',
};

export const publicRoutes = [
	{ path: ROUTES.ROOT, component: <Registration /> },
	{ path: ROUTES.REGISTRATION, component: <Registration /> },
	{ path: ROUTES.LOGIN, component: <Login /> },
	{ path: ROUTES.PAGE_NOT_FOUND, component: <PageNotFound /> },
];

export const privateRoutes = [
	{ path: ROUTES.ROOT, component: <Courses /> },
	{ path: ROUTES.COURSES, component: <Courses /> },
	{ path: ROUTES.COURSE, component: <CourseInfo /> },
	{ path: ROUTES.ADD_COURSE, component: <CreateCourse /> },
	{ path: ROUTES.PAGE_NOT_FOUND, component: <PageNotFound /> },
];
