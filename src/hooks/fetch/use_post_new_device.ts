import NewDevice from "@/types/api/new_device";
import { useCallback, useState } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface AddNewDeviceResponse {
    success: boolean;
}

interface PostNewDevicesResults {
    isLoading: boolean;
    isError: boolean;
    fetch: (data: NewDevice) => Promise<AddNewDeviceResponse>;
    currentDeviceId: string;
}

export default function usePostNewDevices(): PostNewDevicesResults {
    const [currentDeviceId, setCurrentDeviceId] = useState("");
    const { isLoading, isError, fetchData } = useFetch<NewDevice, undefined>(
        `${config.API_URL}/devices`,
    );

    const fetchHandler = useCallback(
        async (data: NewDevice) => {
            setCurrentDeviceId(data.device_id);

            const res = await fetchData(data);

            setCurrentDeviceId("");

            return {
                success: res?.code === 200 || res?.code === 201,
            };
        },
        [fetchData],
    );

    return {
        isLoading,
        isError,
        fetch: fetchHandler,
        currentDeviceId,
    };
}
