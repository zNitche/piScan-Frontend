import config from "@/config";
import useInfiniteQuery from "./core/use_infinite_query";
import ScanFile from "@/types/scan_file";

export default function useGetFiles(searchQuery: string) {
    const { isLoading, isError, hasNext, refetch, fetchNext, data } =
        useInfiniteQuery<ScanFile>({
            url: `${config.API_URL}/scan-files`,
            itemsPerPage: 1,
            queryDependencyParams: [searchQuery],
            searchParams: {
                search: searchQuery,
            },
        });

    return {
        isLoading,
        isError,
        hasNext,
        refetch,
        fetchNext,
        data,
    };
}
