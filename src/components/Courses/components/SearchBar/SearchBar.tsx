import React, { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import styles from './SearchBar.module.css';

type SearchBarProps = {
	onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [query, setQuery] = useState('');
	const handleSearch = (query: string) => {
		onSearch(query);
		setQuery('');
	};

	return (
		<div className={styles.searchBar}>
			<Input
				type='text'
				placeholderText='Enter course name...'
				onChange={setQuery}
				value={query}
			/>
			<Button children='Search' onClick={() => handleSearch(query)} />
		</div>
	);
};

export default SearchBar;
