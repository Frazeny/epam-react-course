import { useState } from 'react';

export const useFetching = (callback: () => void) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetching = async () => {
		try {
			setIsLoading(true);
			await callback();
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError(`Unexpected error ${e}`);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return [fetching, isLoading, error];
};
