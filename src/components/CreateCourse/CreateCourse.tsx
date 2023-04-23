import React, { useEffect, useState } from 'react';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { IAuthor, ICourse } from '../../types/types';

import { formattedDuration } from '../../helpers/pipeDuration';
import { dateConverter } from '../../helpers/dateGeneratop';
import { v4 as uuidv4 } from 'uuid';

import styles from './CreateCourse.module.css';
import Textarea from '../../common/Textarea/Textarea';

interface CreateCourseProps {
	displayCourses: () => void;
	fetchedAuthors: IAuthor[];
	addNewAuthor: React.Dispatch<React.SetStateAction<IAuthor[]>>;
	addNewCourse: React.Dispatch<React.SetStateAction<ICourse[]>>;
}

const CreateCourse: React.FC<CreateCourseProps> = ({
	displayCourses,
	fetchedAuthors,
	addNewCourse,
	addNewAuthor,
}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authors, setAuthors] = useState<IAuthor[]>(fetchedAuthors);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		setAuthors(
			fetchedAuthors.filter((author) => !courseAuthors.includes(author))
		);
	}, [courseAuthors, fetchedAuthors]);

	const addAuthorToCourse = (author: IAuthor) => {
		setCourseAuthors((prevAuthors) => [...prevAuthors, author]);
		setAuthors((prevAuthors) => prevAuthors.filter((a) => a.id !== author.id));
	};

	const removeAuthorFromCourse = (author: IAuthor) => {
		setAuthors((prevAuthors) => [...prevAuthors, author]);
		setCourseAuthors((prevAuthors) =>
			prevAuthors.filter((a) => a.id !== author.id)
		);
	};

	const createAuthor = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (authorName.length < 2) {
			alert('Author name must be at least 2 characters long.');
			return;
		}

		const newAuthor: IAuthor = {
			id: uuidv4(),
			name: authorName,
		};

		addNewAuthor((prevAuthors) => [...prevAuthors, newAuthor]);
		setAuthorName('');
	};

	const createCourse = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (title.length === 0 || description.length < 2 || duration <= 0) {
			alert('Please fill in all fields correctly.');
			return;
		}

		const newCourse: ICourse = {
			id: String(Date.now()),
			title,
			description,
			creationDate: dateConverter(new Date()),
			duration,
			authors: courseAuthors.map((a) => a.id),
		};

		addNewCourse((prevCourses) => [...prevCourses, newCourse]);

		displayCourses();
	};

	return (
		<form className={styles.CreateCourseContainer}>
			<div className={styles.CreateCourseHeader}>
				<Input
					id={'course-title'}
					name={'course-title'}
					type='text'
					labelText='Title'
					placeholderText='Enter title...'
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Button children='Create Course' onClick={(e) => createCourse(e)} />
			</div>
			<div className={styles.CreateCourseDescription}>
				<Textarea
					id={'course-description'}
					name={'course-description'}
					labelText='Description'
					placeholderText='Enter description'
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
							{courseAuthors.map((courseAuthor) => {
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

export default CreateCourse;
