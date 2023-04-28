import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import styles from './Courses.module.css';

import { IAuthor, ICourse } from '../../types/types';
import { useFetching, useFetching2 } from '../../hooks/useFetching';
import CoursesService from '../../API/CoursesService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Loader from '../UI/Loader';

const Courses: React.FC = () => {
	const [courses, setCourses] = useState<ICourse[]>([]);
	const [authors, setAuthors] = useState<IAuthor[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();
	const [isCoursesLoading, setIsCourseLoading] = useState<boolean>(false);
	const [getCoursesError, setGetCoursesError] = useState<string>('');
	const [isAuthorsLoading, setIsAuthorsLoading] = useState<boolean>(false);
	const [getAuthorsError, setGetAuthorsError] = useState<string>('');

	const getCourses = useCallback(async () => {
		try {
			setIsCourseLoading(true);
			const response = await CoursesService.getAllCourses();
			setCourses(response);
		} catch (error) {
			if (error instanceof Error) {
				setGetCoursesError(error.message);
			} else {
				setGetCoursesError(`Unexpected error ${error}`);
			}
		} finally {
			setIsCourseLoading(false);
		}
	}, []);

	const getAuthors = useCallback(async () => {
		try {
			setIsAuthorsLoading(true);
			const response = await CoursesService.getAllAuthors();
			setAuthors(response.data.result);
		} catch (error) {
			if (error instanceof Error) {
				setGetAuthorsError(error.message);
			} else {
				setGetAuthorsError(`Unexpected error ${error}`);
			}
		} finally {
			setIsAuthorsLoading(false);
		}
	}, []);

	useEffect(() => {
		getCourses();
		getAuthors();
	}, []);

	const searchedCourses = useMemo(() => {
		if (searchQuery) {
			return [...courses].filter(
				(course) =>
					course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					course.id.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		return courses;
	}, [courses, searchQuery]);

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const handleCreateCourse = useCallback(() => {
		navigate(ROUTES.ADD_COURSE);
	}, [navigate]);

	return (
		<div className={styles.courses}>
			<div className={styles.courses__header}>
				<SearchBar
					inputID={'course-search'}
					inputName={'course-search'}
					onSearch={handleSearch}
				/>
				<Button children='Add new course' onClick={handleCreateCourse} />
			</div>
			{getAuthorsError && <p>getAuthorsError</p>}
			{getCoursesError && <p>getCoursesError</p>}
			{isCoursesLoading || isAuthorsLoading ? (
				<Loader />
			) : (
				searchedCourses.map((course) => (
					<CourseCard key={course.id} course={course} authors={authors} />
				))
			)}
		</div>
	);
};

export default Courses;
