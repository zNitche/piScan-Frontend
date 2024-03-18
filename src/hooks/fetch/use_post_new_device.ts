import AddNewDeviceResponse from "@/types/api/add_new_device_response";
import NewDevice from "@/types/api/new_device";
import { useCallback } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface usePostNewDevicesResults {
	isLoading: boolean;
	isError: boolean;
	post: (data: NewDevice) => Promise<AddNewDeviceResponse>;
}

export default function usePostNewDevices(): usePostNewDevicesResults {
	const { isLoading, isError, fetchData } = useFetch<NewDevice, null>(
		`${config.API_URL}/devices/`,
	);

	const postData = useCallback(async (data: NewDevice) => {
		const res = await fetchData(data);

		return {
			success: res?.code === 200 || res?.code === 201,
		};
	}, [fetchData]);

	return {
		isLoading,
		isError,
		post: postData,
	};
}
