import ApiResponse from "@/types/api/api_response";
import { useCallback, useState } from "react";

interface Results<InputDataType, ResponseDataType> {
    isLoading: boolean;
    isError: boolean;
    fetchData: (
        data: InputDataType,
        spareURL?: string,
    ) => Promise<ApiResponse<ResponseDataType | null> | undefined>;
}

export default function useFetch<InputDataType, ResponseDataType>(
    url?: string,
    method: "POST" | "PUT" | "DELETE" = "POST",
): Results<InputDataType, ResponseDataType> {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = useCallback(
        async (data: InputDataType, spareURL?: string) => {
            if (isLoading) {
                return;
            }

            setIsLoading(true);
            setIsError(false);

            try {
                const fetchURL = url ? url : spareURL;

                if (fetchURL === undefined) {
                    throw new Error("request URL not specified");
                }

                const res = await fetch(fetchURL, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const responseText = await res.text();
                const resData = responseText ? JSON.parse(responseText) : null;

                setIsLoading(false);

                return {
                    code: res.status,
                    data: resData,
                };
            } catch (error) {
                console.error(`error while fetching ${url}: ${error}`);
                setIsError(true);
            }

            setIsLoading(false);
        },
        [url, isLoading],
    );

    return { isLoading, isError, fetchData };
}
