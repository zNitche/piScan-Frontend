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
    itemsPerPage?: number;
}

interface Results<ResponseDataType> {
    isLoading: boolean;
    isError: boolean;
    hasNext: boolean;
    refetch: () => Promise<void>;
    fetchNext: () => Promise<void>;
    data: ResponseDataType[];
}

export default function useInfiniteQuery<ResponseDataType>({
    url,
    queryDependencyParams = [],
    isEnabled = true,
    fetchOnMount = true,
    searchParams,
    itemsPerPage = 20,
}: Params): Results<ResponseDataType> {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [data, setData] = useState<ResponseDataType[]>([]);

    const fetchData = useCallback(
        async (params?: typeof searchParams) => {
            if (!isEnabled) {
                return;
            }

            setHasNext(true);
            setIsLoading(true);
            setIsError(false);

            let resData = undefined;

            try {
                resData = await getData<ResponseDataType[]>(url, {
                    ...params,
                    ...searchParams,
                });

                setIsLoading(false);
            } catch (error) {
                console.error(`error while fetching ${url}: ${error}`);
                setIsError(true);
            }

            return resData;
        },
        [url, isLoading, isEnabled, searchParams],
    );

    const refetch = useCallback(async () => {
        const params = {
            limit: itemsPerPage,
            offset: 0,
        };

        const resData = await fetchData(params);

        if (resData !== undefined && resData.length > 0) {
            setData(resData);
        } else {
            setHasNext(false);
        }
    }, [itemsPerPage, fetchData]);

    const fetchNext = useCallback(async () => {
        const params = {
            limit: itemsPerPage,
            offset: data.length,
        };

        const resData = await fetchData(params);

        if (resData !== undefined && resData.length > 0) {
            setData([...data, ...resData]);
        } else {
            setHasNext(false);
        }
    }, [data, itemsPerPage, fetchData]);

    useEffect(() => {
        if (fetchOnMount && !(queryDependencyParams.length > 0)) {
            void refetch();
        }
    }, []);

    useEffect(() => {
        if (queryDependencyParams.length > 0) {
            void refetch();
        }
    }, queryDependencyParams);

    return { isLoading, isError, hasNext, refetch, fetchNext, data };
}
