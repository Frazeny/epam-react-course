import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { IAuthor, ICourse } from '../../types/types';

import { formattedDuration } from '../../helpers/pipeDuration';
import { dateConverter } from '../../helpers/dateGeneratop';
import { v4 as uuidv4 } from 'uuid';

import styles from './CourseForm.module.css';
import Textarea from '../../common/Textarea/Textarea';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../UI/Loader';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ROUTES } from '../../router/routes';
import {
	selectAuthors,
	selectCourses,
	selectUser,
} from '../../store/servisces';

const COURSE_CREATION_ERROR_MESSAGE = 'Please fill in all fields correctly.';
const AUTHOR_CREATION_ERROR_MESSAGE =
	'Author name must be at least 2 characters long.';

const CourseForm: React.FC = () => {
	const {
		courses: storeCourses,
		isCoursesLoading,
		coursesError,
	} = useTypedSelector(selectCourses);
	const {
		authors: storeAuthors,
		isAuthorsLoading,
		authorsError,
	} = useTypedSelector(selectAuthors);
	const { token } = useTypedSelector(selectUser);

	const { fetchAuthors, fetchCourses } = useActions();

	const { courseId } = useParams();

	const course = useMemo(() => {
		return storeCourses.find((existingCourses) => {
			return existingCourses.id === courseId;
		});
	}, [courseId, storeCourses]);

	useEffect(() => {
		fetchAuthors();
		fetchCourses();
		const courseAuthors: IAuthor[] = [],
			authors: IAuthor[] = [];
		Object.keys(storeAuthors).forEach((authorId) => {
			if (course?.authors.some((id) => id === authorId)) {
				courseAuthors.push(storeAuthors[authorId]);
			} else {
				authors.push(storeAuthors[authorId]);
			}
		});
		setAuthors(authors);
		setCourseAuthors(courseAuthors);
	}, [course, fetchAuthors, fetchCourses]);

	const navigate = useNavigate();

	const [title, setTitle] = useState(course?.title ?? '');
	const [description, setDescription] = useState(course?.description ?? '');
	const [authors, setAuthors] = useState<IAuthor[]>([]);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState<number>(course?.duration ?? 0);
	const [isFormValid, setIsFormValid] = useState<boolean>(true);
	const [isAuthorValid, setIsAuthorValid] = useState<boolean>(true);

	const addAuthorToCourse = useCallback((author: IAuthor) => {
		setCourseAuthors((prevAuthors) => {
			return [...prevAuthors, author];
		});
		setAuthors((prevAuthors) => prevAuthors.filter((a) => a.id !== author.id));
	}, []);

	const { addCourse, updateCourse, addAuthor } = useActions();

	const removeAuthorFromCourse = useCallback((author: IAuthor) => {
		setAuthors((prevAuthors) => [...prevAuthors, author]);
		setCourseAuthors((prevAuthors) => {
			return prevAuthors.filter((a) => a.id !== author.id);
		});
	}, []);

	const createAuthor = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (authorName.length < 2) {
			setIsAuthorValid(false);
			return;
		}

		const newAuthor: IAuthor = {
			id: uuidv4(),
			name: authorName,
		};

		addAuthor(newAuthor, token);

		setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
		setAuthorName('');
	};

	const handleCreateCourse = useCallback(
		(event: React.SyntheticEvent) => {
			event.preventDefault();
			setIsFormValid(true);
			if (title.length === 0 || description.length < 2 || duration <= 0) {
				setIsFormValid(false);
				return;
			}

			const newCourse: ICourse = {
				id: uuidv4(),
				title,
				description,
				creationDate: dateConverter(new Date()),
				duration,
				authors: courseAuthors.map((a) => a.id),
			};
			addCourse(newCourse, token);
			if (!coursesError) {
				navigate(ROUTES.COURSES);
			}
		},
		[
			addCourse,
			courseAuthors,
			coursesError,
			description,
			duration,
			navigate,
			title,
			token,
		]
	);

	const handleUpdateCourse = useCallback(
		(event: React.SyntheticEvent) => {
			event.preventDefault();
			if (title.length === 0 || description.length < 2 || duration <= 0) {
				setIsFormValid(false);
				return;
			}

			const updatedCourse: ICourse = {
				id: courseId as string,
				title,
				description,
				creationDate: dateConverter(new Date()),
				duration,
				authors: courseAuthors.map((a) => a.id),
			};
			updateCourse(updatedCourse, token);
			if (!coursesError) {
				navigate(ROUTES.COURSES);
			}
		},
		[
			courseAuthors,
			courseId,
			coursesError,
			description,
			duration,
			navigate,
			title,
			token,
			updateCourse,
		]
	);

	return (
		<form className={styles.CreateCourseContainer}>
			{!isFormValid ? <p>{COURSE_CREATION_ERROR_MESSAGE}</p> : null}
			{!isAuthorValid ? <p>{AUTHOR_CREATION_ERROR_MESSAGE}</p> : null}
			{(isAuthorsLoading || isCoursesLoading) && <Loader />}
			{authorsError && <p>{authorsError}</p>}
			{coursesError && <p>{authorsError}</p>}
			<div className={styles.CreateCourseHeader}>
				<Input
					id={'course-title'}
					name={'course-title'}
					type='text'
					labelText='Title'
					placeholderText='Enter title...'
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Button
					children={courseId ? 'Update Course' : 'Create Course'}
					onClick={
						courseId
							? (e) => handleUpdateCourse(e)
							: (e) => handleCreateCourse(e)
					}
				/>
			</div>
			<div className={styles.CreateCourseDescription}>
				<Textarea
					id={'course-description'}
					name={'course-description'}
					labelText='Description'
					placeholderText='Enter description'
					value={description}
					required={true}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>
			<div className={styles.CreateCourseBody}>
				<div className={styles.addAuthorContainer}>
					<div className={styles.addAuthorInputContainer}>
						<h3>Add author</h3>
						<Input
							id={'new-author'}
							name={'new-author'}
							type='text'
							placeholderText='Enter author name...'
							labelText='Author name'
							value={authorName}
							onChange={(event) => setAuthorName(event.target.value)}
						/>
						<Button children='Create author' onClick={(e) => createAuthor(e)} />
					</div>

					<div className={styles.durationInputContainer}>
						<h3>Duration</h3>
						<Input
							id={'course-duration'}
							name={'course-duration'}
							type='number'
							placeholderText='Enter duration in minutes...'
							value={`${duration}`}
							labelText='Duration'
							onChange={(event) => setDuration(parseInt(event.target.value))}
						/>
						<p className={styles.durationInputContainer__representation}>
							Duration:
							<span
								className={styles.durationInputContainer__representation_bold}
							>
								{formattedDuration(duration)}
							</span>
						</p>
					</div>
				</div>
				<div className={styles.authorsContainer}>
					<h3>Authors</h3>
					<div className={styles.authorsContainer__list}>
						<ul className={styles.authorsList}>
							{authors.map((author) => {
								return (
									<li className={styles.authorsList__item} key={author.id}>
										{author.name}
										<Button
											children='Add author'
											onClick={() => addAuthorToCourse(author)}
										/>
									</li>
								);
							})}
						</ul>
					</div>
					<div className={styles.authorsContainer__list}>
						<h3>Course authors</h3>
						<ul className={styles.authorsList}>
							{courseAuthors?.map((courseAuthor) => {
								return (
									<li
										className={styles.authorsList__item}
										key={courseAuthor.id}
									>
										{courseAuthor.name}
										<Button
											children='Delete Author'
											onClick={() => removeAuthorFromCourse(courseAuthor)}
										/>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</form>
	);
};

export default CourseForm;
