import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface SetDeviceScanResolutionsResponse {
	success: boolean;
}

interface SetDeviceScanResolutionsResults {
	isLoading: boolean;
	isError: boolean;
	update: (data: number[]) => Promise<SetDeviceScanResolutionsResponse>;
}

export default function useSetDeviceScanResolutions(
	uuid: string | undefined,
): SetDeviceScanResolutionsResults {
	const { isLoading, isError, fetchData } = useFetch<number[], undefined>(
		`${config.API_URL}/devices/${uuid}/resolutions`
	);

	const updateData = useCallback(
		async (data: number[]) => {
			if (uuid) {
				const res = await fetchData(data);

				return {
					success: res?.code === 200,
				};
			}

			return {
				success: false,
			};
		},
		[fetchData],
	);

	return {
		isLoading,
		isError,
		update: updateData,
	};
}
