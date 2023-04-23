import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { mockedAuthorsList, mockedCoursesList, User } from './constants';
import { IAuthor, ICourse } from './types/types';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
// import CoursesService from './API/CoursesService';
// import { useFetching } from './hooks/useFetching';

function App() {
	const [isCreateCourseRendered, setIsCreateCourseRendered] = useState(false);
	const [fetchedCourses, setFetchedCourses] = useState<ICourse[]>([]);
	const [fetchedAuthors, setFetchedAuthors] = useState<IAuthor[]>([]);

	// useEffect(() => {
	// 	fetchCourses();
	// 	fetchAuthors();
	// }), [])

	// const [fetchCourses, isCoursesLoading, coursesError] = useFetching(
	// 	async () => {
	// 		const courses = await CoursesService.getAllCourses();
	// 	}
	// );
	// const [fetchAuthors, isAuthorsLoading, authorsError] = useFetching(
	// 	async () => {
	// 		const authors = await CoursesService.getAllAuthors();
	// 		setCourseAuthors(authors);
	// 	}
	// );

	useEffect(() => {
		setFetchedCourses(mockedCoursesList);
		setFetchedAuthors(mockedAuthorsList);
	}, []);

	const handleCreateCourseRender = useCallback(() => {
		setIsCreateCourseRendered(!isCreateCourseRendered);
	}, [isCreateCourseRendered]);

	return (
		<div className='App'>
			<Header userName={User.name} />
			{isCreateCourseRendered ? (
				<CreateCourse
					displayCourses={handleCreateCourseRender}
					fetchedAuthors={fetchedAuthors}
					addNewAuthor={setFetchedAuthors}
					addNewCourse={setFetchedCourses}
				/>
			) : (
				<Courses
					displayCourses={handleCreateCourseRender}
					fetchedCourses={fetchedCourses}
					fetchedAuthors={fetchedAuthors}
				/>
			)}
		</div>
	);
}

export default App;
