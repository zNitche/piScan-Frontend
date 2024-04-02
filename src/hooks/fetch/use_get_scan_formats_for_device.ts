import config from "@/config";
import useQuery from "./core/use_query";
import ScanFormat from "@/types/scan_format";

export default function useGetScanFormatsForDevice(uuid: string | undefined) {
    const { isLoading, isError, refetch, data } = useQuery<ScanFormat[]>({
        url: `${config.API_URL}/devices/${uuid}/scan-formats`,
        isEnabled: Boolean(uuid !== undefined),
        fetchOnMount: false,
        queryDependencyParams: [uuid],
    });

    return { isLoading, isError, refetch, data: data ? data : [] };
}
