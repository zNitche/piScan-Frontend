import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface AddScanFormatToDeviceResponse {
    success: boolean;
}

interface AddScanFormatToDeviceResults {
    isLoading: boolean;
    isError: boolean;
    post: (
        deviceUUID: string,
        scanFormatUUID: string,
    ) => Promise<AddScanFormatToDeviceResponse>;
}

export default function useAddScanFormatToDevice(): AddScanFormatToDeviceResults {
    const { isLoading, isError, fetchData } = useFetch<undefined, undefined>();

    const postData = useCallback(
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
        post: postData,
    };
}
