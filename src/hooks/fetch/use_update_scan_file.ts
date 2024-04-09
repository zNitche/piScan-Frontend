import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";
import ScanFileUpdate from "@/types/api/scan_file_update";

interface UpdateScanFileResponse {
    success: boolean;
}

interface UpdateScanFileResults {
    isLoading: boolean;
    isError: boolean;
    fetch: (data: ScanFileUpdate) => Promise<UpdateScanFileResponse>;
}

export default function useUpdateScanFile(
    uuid: string | undefined,
): UpdateScanFileResults {
    const { isLoading, isError, fetchData } = useFetch<
        ScanFileUpdate,
        undefined
    >(`${config.API_URL}/scan-files/${uuid}`, "PUT");

    const fetchHandler = useCallback(
        async (data: ScanFileUpdate) => {
            if (uuid) {
                const res = await fetchData(data);

                return {
                    success: res?.code === 200,
                };
            }

            return {
                success: false,
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
