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

    const isEnabledRef = useRef(isEnabled);
    const searchParamsRef = useRef(searchParams);
    const urlRef = useRef(url);

    isEnabledRef.current = isEnabled;
    urlRef.current = url;
    searchParamsRef.current = searchParams;

    const periodicRefetchIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchData = useCallback(async () => {
        if (!isEnabledRef.current) {
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            const resData = await getData<ResponseDataType>(
                urlRef.current,
                searchParamsRef.current,
            );

            setData(resData);
        } catch (error) {
            console.error(`error while fetching ${url}: ${error}`);
            setIsError(true);
        }

        setIsLoading(false);
    }, [
        url,
        urlRef,
        isLoading,
        isEnabled,
        isEnabledRef,
        searchParams,
        searchParamsRef,
    ]);

    useEffect(() => {
        if (fetchOnMount && !(queryDependencyParams.length > 0)) {
            void fetchData();
        }
    }, []);

    useEffect(() => {
        if (queryDependencyParams.length > 0 && data !== undefined) {
            void fetchData();
        }
    }, queryDependencyParams);

    useEffect(() => {
        if (refetchInterval) {
            periodicRefetchIntervalRef.current = setInterval(() => {
                fetchData();
            }, refetchInterval);
        }
        return () => clearInterval(periodicRefetchIntervalRef.current || 0);
    }, []);

    return { isLoading, isError, refetch: fetchData, data };
}
