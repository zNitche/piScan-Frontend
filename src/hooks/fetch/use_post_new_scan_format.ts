import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";
import NewScanFormat from "@/types/api/new_scan_format";

interface PostNewScanFormatResponse {
    success: boolean;
}

interface PostNewScanFormatResults {
    isLoading: boolean;
    isError: boolean;
    post: (data: NewScanFormat) => Promise<PostNewScanFormatResponse>;
}

export default function usePostNewScanFormat(): PostNewScanFormatResults {
    const { isLoading, isError, fetchData } = useFetch<
        NewScanFormat,
        undefined
    >(`${config.API_URL}/scan-formats`);

    const postData = useCallback(
        async (data: NewScanFormat) => {
            const res = await fetchData(data);

            return {
                success: res?.code === 201,
            };
        },
        [fetchData],
    );

    return {
        isLoading,
        isError,
        post: postData,
    };
}
