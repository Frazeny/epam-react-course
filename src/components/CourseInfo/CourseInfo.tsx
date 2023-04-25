import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICourse } from '../../types/types';
import CoursesService from '../../API/CoursesService';
import { useFetching } from '../../hooks/useFetching';
import styles from './CourseInfo.module.css';
import CardDescription from '../Courses/components/CourseCard/components/CardDescription/CardDescription';
import { formattedDuration } from '../../helpers/pipeDuration';
import { dateConverter } from '../../helpers/dateGeneratop';
import Loader from '../UI/Loader';
import { ROUTES } from '../../router/routes';
import Button from '../../common/Button/Button';

const CourseInfo = () => {
	const { courseId } = useParams<{ courseId: string }>();
	const navigate = useNavigate();
	const [course, setCourse] = useState<ICourse>();
	const [fetchCourse, isCourseLoading, fetchCourseError] = useFetching(
		async (id) => {
			const courseInfo = await CoursesService.getCourseInfo(id);
			setCourse(courseInfo.data.result);
		}
	);
	const [fetchAuthorName, isAuthorNameLoading, fetchAuthorNameError] =
		useFetching(async (authorId) => {
			const author = await CoursesService.getAuthorByID(authorId);
			return author.data.result.name;
		});
	useEffect(() => {
		fetchCourse(courseId);
	}, [courseId]);

	const courseAuthors = useMemo(() => {
		const authors = course?.authors.map((authorId) => {
			const name = fetchAuthorName(authorId);
			console.log(name);
			return name;
		});
		console.log(authors);
		return authors;
	}, [courseId, course?.authors]);

	const handleToCourses = useCallback(() => {
		navigate(ROUTES.COURSES);
	}, [navigate]);

	return (
		<div className={styles.container}>
			<div className={styles.goBackBtn}>
				<Button children='Back to courses' onClick={handleToCourses} />
			</div>
			{fetchCourseError && <p>fetchCourseError</p>}
			{isCourseLoading ? (
				<Loader />
			) : course ? (
				<div className={styles.courseInfo}>
					<h1 className={styles.courseInfo__header}>{course.title}</h1>
					<div className={styles.courseInfo__body}>
						<div className={styles.courseInfo__main}>
							<p>{course.description}</p>
						</div>
						<div className={styles.courseInfo__description}>
							<CardDescription title='ID' data={course.id} />
							<CardDescription
								title='Duration'
								data={formattedDuration(course.duration)}
							/>
							<CardDescription
								title='Created'
								data={dateConverter(new Date(course.creationDate))}
							/>
							{isAuthorNameLoading ? (
								<Loader />
							) : fetchAuthorNameError ? (
								<p>fetchAuthorNameError</p>
							) : courseAuthors ? (
								<CardDescription
									title='Authors'
									data={courseAuthors.join(', ')}
								/>
							) : null}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default CourseInfo;
