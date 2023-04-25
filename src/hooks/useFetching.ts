import { useState } from 'react';

type CallbackType = (...args: any[]) => Promise<void>;
export const useFetching = (callback: CallbackType) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetching = async (...args: any[]) => {
		try {
			setIsLoading(true);
			await callback(...args);
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

	return [fetching, isLoading, error] as const;
};
