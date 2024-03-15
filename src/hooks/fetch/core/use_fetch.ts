import { useCallback, useEffect, useState } from "react";

interface useFetchResults<T> {
	isLoading: boolean;
	isError: boolean;
	refetch: () => Promise<void>;
	data: T | undefined;
}

export default function useFetch<T>(
	url: string,
	fetchOnMount: boolean = true,
): useFetchResults<T> {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState<T | undefined>(undefined);

	const fetchData = useCallback(async () => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);
		setIsError(false);

		try {
			const res = await fetch(url, {
				method: "GET",
				headers: [],
			});

			const resData = await res.json();
			setData(resData);
		} catch (error) {
			console.error(`error while fetching ${url}: ${error}`);
			setIsError(true);
		}

		setIsLoading(false);
	}, [url, isLoading]);

	useEffect(() => {
		if (fetchOnMount) {
			void fetchData();
		}
	}, []);

	return { isLoading, isError, refetch: fetchData, data };
}
