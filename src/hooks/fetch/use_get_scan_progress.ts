import config from "@/config";
import useQuery from "./core/use_query";
import ScanProgress from "@/types/api/scan_progress";

export default function useGetScanProgress(uuid: string | undefined) {
    const { isLoading, isError, refetch, data } = useQuery<ScanProgress>({
        url: `${config.API_URL}/devices/${uuid}/scan/progress`,
        isEnabled: Boolean(uuid !== undefined),
        queryDependencyParams: [uuid],
        refetchInterval: 3000,
    });

    return { isLoading, isError, refetch, data: data };
}
