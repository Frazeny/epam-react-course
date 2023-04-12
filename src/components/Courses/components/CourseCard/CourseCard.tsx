import React, { useMemo } from 'react';

import { ICourse, IAuthor } from '../../../../types/types';
import { formattedDuration } from '../../../../helpers/pipeDuration';

import Button from '../../../../common/Button/Button';
import CardDescription from './components/CardDescription/CardDescription';

import styles from './CourseCard.module.css';

interface CourseCardProps {
	course: ICourse;
	authors: IAuthor[];
}

const MAX_AUTHORS_STRING_LENGTH = 60;

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
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
					<CardDescription title='Created' data={course.creationDate} />
				</div>
				<div>
					<Button children='Show course' />
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
