import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface DeleteFileResponse {
    success: boolean;
}

interface DeleteFileResults {
    isLoading: boolean;
    isError: boolean;
    fetch: () => Promise<DeleteFileResponse>;
}

export default function useDeleteFile(
    uuid: string | undefined,
): DeleteFileResults {
    const { isLoading, isError, fetchData } = useFetch<undefined, undefined>(
        `${config.API_URL}/scan-files/${uuid}`,
        "DELETE",
    );

    const fetchHandler = useCallback(async () => {
        if (uuid) {
            const res = await fetchData(undefined);

            return {
                success: res?.code === 200,
            };
        }

        return {
            success: false,
        };
    }, [fetchData]);

    return {
        isLoading,
        isError,
        fetch: fetchHandler,
    };
}
