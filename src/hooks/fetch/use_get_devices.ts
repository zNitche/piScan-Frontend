import Device from "@/types/devices/device";
import config from "@/config";
import useQuery from "./core/use_query";

export default function useGetDevices() {
    const { isLoading, isError, refetch, data } = useQuery<Device[]>({
        url: `${config.API_URL}/devices`,
    });

    return { isLoading, isError, refetch, data: data ? data : [] };
}
