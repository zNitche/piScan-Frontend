import config from "@/config";
import useQuery from "./core/use_query";
import ScanFormat from "@/types/scan_format";

interface useGetScanFormatsForDeviceResults {
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<void>;
    data: ScanFormat[] | [];
}

export default function useGetScanFormatsForDevice(
    uuid: string | undefined,
): useGetScanFormatsForDeviceResults {
    const { isLoading, isError, refetch, data } = useQuery<ScanFormat[]>({
        url: `${config.API_URL}/devices/${uuid}/scan-formats`,
        isEnabled: Boolean(uuid !== undefined),
        fetchOnMount: false,
        queryParams: [uuid],
    });

    return { isLoading, isError, refetch, data: data ? data : [] };
}
