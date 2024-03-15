import { useCallback, useState } from "react";
import ApiResponse from "../../../types/api/api_response";

interface usePostResults<T, K> {
	isLoading: boolean;
	isError: boolean;
	post: (data: T) => Promise<ApiResponse<K | null> | undefined>;
}

export default function usePost<T, K>(url: string): usePostResults<T, K> {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const post = useCallback(async (data: T) => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);
		setIsError(false);

		try {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			
			const responseText = await res.text();
			const resData = responseText ? JSON.parse(responseText) : null;

			setIsLoading(false);

			return ({
				code: res.status,
				data: resData,
			});
		} catch (error) {
			console.error(`error while fetching ${url}: ${error}`);
			setIsError(true);
		}

		setIsLoading(false);
	}, [url, isLoading]);

	return { isLoading, isError, post };
}
