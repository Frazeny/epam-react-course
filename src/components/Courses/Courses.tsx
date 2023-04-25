import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import styles from './Courses.module.css';

import { IAuthor, ICourse } from '../../types/types';
import { useFetching } from '../../hooks/useFetching';
import CoursesService from '../../API/CoursesService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Loader from '../UI/Loader';

const Courses: React.FC = () => {
	const [courses, setCourses] = useState<ICourse[]>([]);
	const [authors, setAuthors] = useState<IAuthor[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const [fetchCourses, isCoursesLoading, fetchCoursesError] = useFetching(
		async () => {
			const courses = await CoursesService.getAllCourses();
			console.log('courses');
			console.log(courses.data.result);
			setCourses(courses.data.result);
		}
	);
	const [fetchAuthors, isAuthorsLoading, fetchAuthorsError] = useFetching(
		async () => {
			const authors = await CoursesService.getAllAuthors();
			console.log('authors');
			console.log(authors.data.result);
			setAuthors(authors.data.result);
		}
	);

	useEffect(() => {
		fetchCourses();
		fetchAuthors();
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
			{fetchAuthorsError && <p>fetchAuthorsError</p>}
			{fetchCoursesError && <p>fetchCoursesError</p>}
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
