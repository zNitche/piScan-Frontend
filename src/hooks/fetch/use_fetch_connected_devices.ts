import ConnectedDevice from "@/types/devices/connected_device";
import useFetch from "./core/use_fetch";
import config from "@/config";


interface useFetchConnectedDevicesResults {
	isLoading: boolean;
	isError: boolean;
	refetch: () => Promise<void>;
	data: ConnectedDevice[] | [];
}

export default function useFetchConnectedDevices(
	fetchOnMount: boolean = false,
): useFetchConnectedDevicesResults {
	const { isLoading, isError, refetch, data } = useFetch<ConnectedDevice[]>(
		`${config.API_URL}/devices/list-connected`,
		fetchOnMount,
	);

	return { isLoading, isError, refetch, data: data ? data : [] };
}
