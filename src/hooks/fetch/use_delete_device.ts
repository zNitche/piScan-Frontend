import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface DeleteDeviceResponse {
	success: boolean;
}

interface DeleteDeviceResults {
	isLoading: boolean;
	isError: boolean;
	delete: () => Promise<DeleteDeviceResponse>;
}

export default function useDeleteDevice(
	uuid: string | undefined,
): DeleteDeviceResults {
	const { isLoading, isError, fetchData } = useFetch<undefined, undefined>(
		`${config.API_URL}/devices/${uuid}`,
		"DELETE",
	);

	const deleteData = useCallback(async () => {
		if (uuid) {
			const res = await fetchData(undefined);

			return {
				success: res?.code === 200,
			};
		}

		return {
			success: false,
		};
	}, [fetchData]);

	return {
		isLoading,
		isError,
		delete: deleteData,
	};
}
