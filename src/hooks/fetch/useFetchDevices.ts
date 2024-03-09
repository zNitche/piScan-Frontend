import Device from "../../types/device";
import { config } from "../../config";
import useFetch from "./core/useFetch";

interface useFetchDevicesResults {
    isLoading: boolean
    isError: boolean
    data: Device[] | []
}

export default function useFetchDevices(): useFetchDevicesResults {
    const {isLoading, isError, data} = useFetch<Device[]>(`${config.API_URL}/devices`)

    return { isLoading, isError, data: data ? data : [] }
}
