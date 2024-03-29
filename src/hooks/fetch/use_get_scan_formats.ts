import config from "@/config";
import useQuery from "./core/use_query";
import ScanFormat from "@/types/scan_format";

interface useGetScanFormatsResults {
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<void>;
    data: ScanFormat[] | [];
}

export default function useGetScanFormats(
    fetchOnMount: boolean,
): useGetScanFormatsResults {
    const { isLoading, isError, refetch, data } = useQuery<ScanFormat[]>({
        url: `${config.API_URL}/scan-formats`,
        fetchOnMount,
    });

    return { isLoading, isError, refetch, data: data ? data : [] };
}
