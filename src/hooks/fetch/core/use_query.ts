import { getData } from "@/utils/fetch";
import { useCallback, useEffect, useRef, useState } from "react";

interface Params {
    url: string;
    queryDependencyParams?: Array<
        string | number | boolean | undefined | object
    >;
    isEnabled?: boolean;
    fetchOnMount?: boolean;
    searchParams?: Record<string, string | number | null | undefined>;
    refetchInterval?: number;
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
    refetchInterval,
}: Params): Results<ResponseDataType> {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<ResponseDataType | undefined>(undefined);

    // I'm not convinced this is good approach but for now it works
    const [fetchesCount, setFetchesCount] = useState(0);
    const periodicRefetchTimer = useRef<NodeJS.Timeout | null>(null);

    const fetchData = useCallback(async () => {
        setFetchesCount(fetchesCount + 1);

        if (!isEnabled) {
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
        if (fetchOnMount && !(queryDependencyParams.length > 0)) {
            void fetchData();
        }
    }, []);

    useEffect(() => {
        if (queryDependencyParams.length > 0) {
            void fetchData();
        }
    }, queryDependencyParams);

    useEffect(() => {
        if (refetchInterval) {
            periodicRefetchTimer.current = setTimeout(
                fetchData,
                refetchInterval,
            );
        }
        return () => clearTimeout(periodicRefetchTimer.current || 0);
    }, [fetchesCount]);

    return { isLoading, isError, refetch: fetchData, data };
}
