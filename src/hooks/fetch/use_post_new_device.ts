import AddNewDeviceResponse from "@/types/api/add_new_device_response";
import NewDevice from "@/types/api/new_device";
import { useCallback, useState } from "react";
import config from "@/config";
import useFetch from "./core/use_fetch";

interface usePostNewDevicesResults {
	isLoading: boolean;
	isError: boolean;
	post: (data: NewDevice) => Promise<AddNewDeviceResponse>;
	currentDeviceId: string;
}

export default function usePostNewDevices(): usePostNewDevicesResults {
	const [currentDeviceId, setCurrentDeviceId] = useState("");
	const { isLoading, isError, fetchData } = useFetch<NewDevice, null>(
		`${config.API_URL}/devices/`,
	);

	const postData = useCallback(
		async (data: NewDevice) => {
			setCurrentDeviceId(data.device_id);

			const res = await fetchData(data);

			setCurrentDeviceId("");

			return {
				success: res?.code === 200 || res?.code === 201,
			};
		},
		[fetchData],
	);

	return {
		isLoading,
		isError,
		post: postData,
		currentDeviceId,
	};
}
