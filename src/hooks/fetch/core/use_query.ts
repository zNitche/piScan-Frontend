import { addSearchParamsToUrl } from "@/utils/fetch";
import { useCallback, useEffect, useState } from "react";

interface Params {
    url: string;
    queryParams?: Array<string | number | boolean | undefined>;
    isEnabled?: boolean;
    fetchOnMount?: boolean;
    searchParams?: Record<string, string | number | null | undefined>;
}

interface Results<ResponseDataType> {
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<void>;
    data: ResponseDataType | undefined;
}

export default function useQuery<ResponseDataType>({
    url,
    queryParams = [],
    isEnabled = true,
    fetchOnMount = true,
    searchParams,
}: Params): Results<ResponseDataType> {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<ResponseDataType | undefined>(undefined);

    const fetchData = useCallback(async () => {
        if (isLoading || !isEnabled) {
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            const urlObj = addSearchParamsToUrl(url, searchParams);

            const res = await fetch(urlObj.toString(), {
                method: "GET",
                headers: {},
            });

            const resData = await res.json();
            setData(resData);
        } catch (error) {
            console.error(`error while fetching ${url}: ${error}`);
            setIsError(true);
        }

        setIsLoading(false);
    }, [url, isLoading, isEnabled]);

    useEffect(() => {
        if (fetchOnMount) {
            void fetchData();
        }
    }, []);

    useEffect(() => {
        if (queryParams.length > 0) {
            void fetchData();
        }
    }, queryParams);

    return { isLoading, isError, refetch: fetchData, data };
}
