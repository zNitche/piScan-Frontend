import config from "@/config";
import useQuery from "./core/use_query";
import ScanFormat from "@/types/scan_format";

interface useGetScanFormatsResults {
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<void>;
    data: ScanFormat[] | [];
}

export default function useGetScanFormats(): useGetScanFormatsResults {
    const { isLoading, isError, refetch, data } = useQuery<ScanFormat[]>(
        `${config.API_URL}/devices`,
    );

    return { isLoading, isError, refetch, data: data ? data : [] };
}
