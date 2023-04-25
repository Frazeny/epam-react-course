import React, { useCallback, useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import styles from './SearchBar.module.css';

type SearchBarProps = {
	onSearch: (query: string) => void;
	inputID: string;
	inputName: string;
};

const SearchBar = ({ onSearch, inputID, inputName }: SearchBarProps) => {
	const [query, setQuery] = useState('');
	const handleSearch = useCallback(
		(query: string) => {
			onSearch(query);
			setQuery('');
		},
		[onSearch]
	);

	return (
		<div className={styles.searchBar}>
			<Input
				id={inputID}
				name={inputName}
				type='text'
				placeholderText='Enter course name...'
				onChange={(event) => setQuery(event.target.value)}
				value={query}
			/>
			<Button children='Search' onClick={() => handleSearch(query)} />
		</div>
	);
};

export default SearchBar;
