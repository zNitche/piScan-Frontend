import config from "@/config";
import useQuery from "./core/use_query";
import DeviceOptions from "@/types/device_options";

export default function useGetDeviceOptions(uuid: string | undefined) {
    const { isLoading, isError, refetch, data } = useQuery<DeviceOptions>({
        url: `${config.API_URL}/devices/${uuid}/options`,
        isEnabled: Boolean(uuid !== undefined),
        fetchOnMount: false,
        queryDependencyParams: [uuid],
    });

    return { isLoading, isError, refetch, data };
}
