import ConnectedDevice from "@/types/devices/connected_device";
import config from "@/config";
import useQuery from "./core/use_query";


interface useFetchConnectedDevicesResults {
	isLoading: boolean;
	isError: boolean;
	refetch: () => Promise<void>;
	data: ConnectedDevice[] | [];
}

export default function useFetchConnectedDevices(
	fetchOnMount: boolean = false,
): useFetchConnectedDevicesResults {
	const { isLoading, isError, refetch, data } = useQuery<ConnectedDevice[]>(
		`${config.API_URL}/devices/list-connected`,
		fetchOnMount,
	);

	return { isLoading, isError, refetch, data: data ? data : [] };
}
