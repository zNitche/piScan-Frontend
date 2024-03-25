import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";
import DeviceUpdate from "@/types/api/device_update";

interface UpdateDeviceResponse {
    success: boolean;
}

interface UpdateDeviceResults {
    isLoading: boolean;
    isError: boolean;
    fetch: (data: DeviceUpdate) => Promise<UpdateDeviceResponse>;
}

export default function useUpdateDevice(
    uuid: string | undefined,
): UpdateDeviceResults {
    const { isLoading, isError, fetchData } = useFetch<DeviceUpdate, undefined>(
        `${config.API_URL}/devices/${uuid}`,
        "PUT",
    );

    const fetchHandler = useCallback(
        async (data: DeviceUpdate) => {
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
