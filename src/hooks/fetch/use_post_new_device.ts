import AddNewDeviceResponse from "@/types/api/add_new_device_response";
import NewDevice from "@/types/api/new_device";
import { useCallback } from "react";
import usePost from "./core/use_post";
import config from "@/config";

interface usePostNewDevicesResults {
	isLoading: boolean;
	isError: boolean;
	post: (data: NewDevice) => Promise<AddNewDeviceResponse>;
}

export default function usePostNewDevices(): usePostNewDevicesResults {
	const { isLoading, isError, post } = usePost<NewDevice, null>(
		`${config.API_URL}/devices/`,
	);

	const postData = useCallback(async (data: NewDevice) => {
		const res = await post(data);

		return {
			success: res?.code === 200 || res?.code === 201,
		};
	}, [post]);

	return {
		isLoading,
		isError,
		post: postData,
	};
}
