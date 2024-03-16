import Device from "@/types/devices/device";
import useFetch from "./core/use_fetch";
import config from "@/config";


interface useFetchDevicesResults {
	isLoading: boolean;
	isError: boolean;
	refetch: () => Promise<void>;
	data: Device[] | [];
}

export default function useFetchDevices(): useFetchDevicesResults {
	const { isLoading, isError, refetch, data } = useFetch<Device[]>(
		`${config.API_URL}/devices`,
	);

	return { isLoading, isError, refetch, data: data ? data : [] };
}
