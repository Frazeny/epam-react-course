import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import styles from './Courses.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Loader from '../UI/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { selectAuthors, selectCourses } from '../../store/servisces';

const Courses: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const { courses, isCoursesLoading, coursesError } =
		useTypedSelector(selectCourses);
	const { authors, isAuthorsLoading, authorsError } =
		useTypedSelector(selectAuthors);

	const { fetchAuthors, fetchCourses } = useActions();

	useEffect(() => {
		fetchAuthors();
		fetchCourses();
	}, [fetchAuthors, fetchCourses]);

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
			{coursesError && <p>{coursesError}</p>}
			{authorsError && <p>{authorsError}</p>}
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
