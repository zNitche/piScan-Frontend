import Device from "@/types/devices/device";
import config from "@/config";
import useQuery from "./core/use_query";

interface useFetchDevicesResults {
	isLoading: boolean;
	isError: boolean;
	refetch: () => Promise<void>;
	data: Device[] | [];
}

export default function useFetchDevices(): useFetchDevicesResults {
	const { isLoading, isError, refetch, data } = useQuery<Device[]>(
		`${config.API_URL}/devices`,
	);

	return { isLoading, isError, refetch, data: data ? data : [] };
}
