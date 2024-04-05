import { getData } from "@/utils/fetch";
import { useCallback, useEffect, useState } from "react";

interface Params {
    url: string;
    queryDependencyParams?: Array<
        string | number | boolean | undefined | object
    >;
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
    queryDependencyParams = [],
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
            const resData = await getData<ResponseDataType>(url, searchParams);

            setData(resData);
        } catch (error) {
            console.error(`error while fetching ${url}: ${error}`);
            setIsError(true);
        }

        setIsLoading(false);
    }, [url, isLoading, isEnabled, searchParams]);

    useEffect(() => {
        if (fetchOnMount) {
            void fetchData();
        }
    }, []);

    useEffect(() => {
        if (queryDependencyParams.length > 0) {
            void fetchData();
        }
    }, queryDependencyParams);

    return { isLoading, isError, refetch: fetchData, data };
}
