import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface DeleteScanFormatResponse {
    success: boolean;
}

interface DeleteScanFormatResults {
    isLoading: boolean;
    isError: boolean;
    fetch: (uuid: string) => Promise<DeleteScanFormatResponse>;
}

export default function useDeleteScanFormat(): DeleteScanFormatResults {
    const { isLoading, isError, fetchData } = useFetch<undefined, undefined>(
        undefined,
        "DELETE",
    );

    const fetchHandler = useCallback(
        async (uuid: string) => {
            const res = await fetchData(
                undefined,
                `${config.API_URL}/scan-formats/${uuid}`,
            );

            return {
                success: res?.code === 200,
            };
        },
        [fetchData],
    );

    return {
        isLoading,
        isError,
        fetch: fetchHandler,
    };
}
