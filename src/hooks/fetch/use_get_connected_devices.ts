import ConnectedDevice from "@/types/devices/connected_device";
import config from "@/config";
import useQuery from "./core/use_query";

export default function useGetConnectedDevices(fetchOnMount: boolean = false) {
    const { isLoading, isError, refetch, data } = useQuery<ConnectedDevice[]>({
        url: `${config.API_URL}/devices/list-connected`,
        fetchOnMount,
    });

    return { isLoading, isError, refetch, data: data ? data : [] };
}
