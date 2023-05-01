import { useEffect, useState } from 'react';

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

export const useFetching2 = <T>(promiseFn: () => Promise<T>) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [result, setResult] = useState<T | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await promiseFn();
				setResult(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
				setError(`Unexpected error ${error}`);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [promiseFn]);

	return [result, isLoading, error] as const;
};
