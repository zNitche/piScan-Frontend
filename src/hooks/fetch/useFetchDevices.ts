import Device from "../../types/device";
import { config } from "../../config";
import useFetch from "./core/useFetch";

interface useFetchDevicesResults {
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	data: Device[] | [];
}

export default function useFetchDevices(): useFetchDevicesResults {
	const { isLoading, isError, refetch, data } = useFetch<Device[]>(
		`${config.API_URL}/devices`,
	);

	return { isLoading, isError, refetch, data: data ? data : [] };
}
