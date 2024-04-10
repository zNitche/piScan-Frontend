import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";
import ScanProcessResponse from "@/types/api/scan_process_response";
import ScanProcessParameters from "@/types/api/scan_process_parameters";

interface StartScanProcessResponse {
    success: boolean;
    data: ScanProcessResponse | undefined;
}

interface StartScanProcessResults {
    isLoading: boolean;
    isError: boolean;
    fetch: (
        parameters: ScanProcessParameters,
        deviceUUID: string,
    ) => Promise<StartScanProcessResponse>;
}

export default function useStartScanProcess(): StartScanProcessResults {
    const { isLoading, isError, fetchData } = useFetch<
        ScanProcessParameters,
        undefined
    >();

    const fetchHandler = useCallback(
        async (parameters: ScanProcessParameters, deviceUUID: string) => {
            const res = await fetchData(
                parameters,
                `${config.API_URL}/devices/${deviceUUID}/scan`,
            );

            return {
                success: res?.code === 200,
                data: res?.data,
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
