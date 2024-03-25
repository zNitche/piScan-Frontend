import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface RemoveScanFormatForDeviceResponse {
    success: boolean;
}

interface RemoveScanFormatForDeviceResults {
    isLoading: boolean;
    isError: boolean;
    fetch: (
        deviceUUID: string,
        scanFormatUUID: string,
    ) => Promise<RemoveScanFormatForDeviceResponse>;
}

export default function useRemoveScanFormatForDevice(): RemoveScanFormatForDeviceResults {
    const { isLoading, isError, fetchData } = useFetch<undefined, undefined>(
        undefined,
        "DELETE",
    );

    const fetchHandler = useCallback(
        async (deviceUUID: string, scanFromatUUID: string) => {
            const res = await fetchData(
                undefined,
                `${config.API_URL}/devices/${deviceUUID}/format/${scanFromatUUID}`,
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
