import React, { useCallback, useEffect, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import styles from './Courses.module.css';

import { ICourse, IAuthor } from '../../types/types';

interface CourseProps {
	displayCourses: () => void;
	fetchedCourses: ICourse[];
	fetchedAuthors: IAuthor[];
}

const Courses: React.FC<CourseProps> = ({
	displayCourses,
	fetchedCourses,
	fetchedAuthors,
}) => {
	const [courses, setCourses] = useState<ICourse[] | []>([]);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		setCourses(fetchedCourses);
	}, [fetchedCourses]);

	const handleSearch = useCallback(
		(query: string) => {
			setSearchQuery(query);
			if (!query) {
				setCourses(fetchedCourses);
			} else {
				const filteredCourses = fetchedCourses.filter(
					(course) =>
						course.title.toLowerCase().includes(query.toLowerCase()) ||
						course.id.toLowerCase().includes(query.toLowerCase())
				);
				setCourses(filteredCourses);
			}
		},
		[fetchedCourses]
	);

	return (
		<div className={styles.courses}>
			<div className={styles.courses__header}>
				<SearchBar onSearch={handleSearch} />
				<Button children='Add new course' onClick={displayCourses} />
			</div>
			{courses.map((course) => (
				<CourseCard key={course.id} course={course} authors={fetchedAuthors} />
			))}
		</div>
	);
};

export default Courses;
