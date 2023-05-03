import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAuthor, ICourse } from '../../types/types';
import CoursesService from '../../API/CoursesService';
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
	const [isCourseLoading, setIsCourseLoading] = useState<boolean>(false);
	const [fetchCourseError, setFetchCourseError] = useState<string>('');
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);
	const [isAuthorLoading, setIsAuthorLoading] = useState<boolean>(false);
	const [getAuthorError, setGetAuthorError] = useState<string>('');

	useEffect(() => {
		const fetchAuthors = async () => {
			try {
				setIsAuthorLoading(true);
				if (course) {
					const courseAuthors = await Promise.all(
						course.authors.map(async (authorId: string) => {
							const response = await CoursesService.getAuthorByID(authorId);
							return response.data.result;
						})
					);
					setCourseAuthors(courseAuthors);
				} else {
					setCourseAuthors([]);
				}
			} catch (error) {
				if (error instanceof Error) {
					setGetAuthorError(error.message);
				} else {
					setGetAuthorError(`Unexpected error ${error}`);
				}
			} finally {
				setIsAuthorLoading(false);
			}
		};
		fetchAuthors();
	}, [course]);

	const fetchCourse = useCallback(async (courseId: string) => {
		try {
			setIsCourseLoading(true);
			const response = await CoursesService.getCourseInfo(courseId);
			setCourse(response.data.result);
		} catch (error) {
			if (error instanceof Error) {
				setFetchCourseError(error.message);
			} else {
				setFetchCourseError(`Unexpected error ${error}`);
			}
		} finally {
			setIsCourseLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCourse(courseId as string);
	}, [courseId, fetchCourse]);

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
							{isAuthorLoading ? (
								<Loader />
							) : getAuthorError ? (
								<p>getAuthorError</p>
							) : courseAuthors ? (
								<CardDescription
									title='Authors'
									data={courseAuthors
										.map((author) => {
											return author.name;
										})
										.join(', ')}
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
