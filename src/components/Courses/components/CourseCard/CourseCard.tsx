import React, { useCallback, useMemo } from 'react';

import { ICourse, IAuthor } from '../../../../types/types';
import { formattedDuration } from '../../../../helpers/pipeDuration';

import Button from '../../../../common/Button/Button';
import CardDescription from './components/CardDescription/CardDescription';

import styles from './CourseCard.module.css';
import { dateConverter } from '../../../../helpers/dateGeneratop';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../router/routes';

interface CourseCardProps {
	course: ICourse;
	authors: IAuthor[];
}

const MAX_AUTHORS_STRING_LENGTH = 60;

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	const navigate = useNavigate();
	const courseAuthorsString = useMemo(() => {
		const courseAuthors: string = course.authors
			.map((authorID) => {
				const author = authors.find((author) => author.id === authorID);
				return author ? author.name : '';
			})
			.join(', ');
		return authors.length < MAX_AUTHORS_STRING_LENGTH
			? courseAuthors
			: courseAuthors.slice(0, MAX_AUTHORS_STRING_LENGTH) + '...';
	}, [authors, course.authors]);

	const handleCourseInfo = useCallback(() => {
		navigate(`${ROUTES.COURSES}/${course.id}`);
	}, [course]);

	return (
		<div className={styles.courseCard}>
			<div className={styles.courseCard__info}>
				<h2>{course.title}</h2>
				<p>{course.description}</p>
			</div>

			<div className={styles.courseCard__description}>
				<div>
					<CardDescription title='Authors' data={courseAuthorsString} />
				</div>
				<div>
					<CardDescription
						title='Duration'
						data={formattedDuration(course.duration)}
					/>
				</div>
				<div>
					<CardDescription
						title='Created'
						data={dateConverter(new Date(course.creationDate))}
					/>
				</div>
				<div>
					<Button children='Show course' onClick={handleCourseInfo} />
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
