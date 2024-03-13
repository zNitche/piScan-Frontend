import { useCallback, useEffect, useState } from "react";

interface useFetchResults<T> {
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	data: T | undefined;
}

export default function useFetch<T>(url: string): useFetchResults<T> {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState<T | undefined>(undefined);

	const fetchData = useCallback(async () => {
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
			setIsError(true);
		}

		setIsLoading(false);
	}, [url]);

	useEffect(() => {
		void fetchData();
	}, []);

	return { isLoading, isError, refetch: fetchData, data };
}
