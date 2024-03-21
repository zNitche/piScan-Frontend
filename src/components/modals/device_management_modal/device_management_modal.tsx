import classes from "./device_management_modal.module.css";
import Modal from "../modal/modal";
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import Device from "@/types/devices/device";
import TextInput from "@/components/design/text_input/text_input";
import Button from "@/components/design/button/button";
import useUpdateDevice from "@/hooks/fetch/use_update_device";
import useDeleteDevice from "@/hooks/fetch/use_delete_device";
import useNotifications from "@/hooks/use_notifications";
import DeviceUpdate from "@/types/api/device_update";
import ConfirmDeviceDeletionModal from "../confirm_device_deletion_modal/confirm_device_deletion_modal";
import useSetDeviceScanResolutions from "@/hooks/fetch/use_set_device_scan_resolutions";

interface DeviceManagementModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	device: Device | undefined;
	onDeviceRemovedCallback?: () => Promise<void>;
	onDeviceUpdatedCallback?: () => Promise<void>;
}

export default function DeviceManagementModal({
	isOpen,
	setIsOpen,
	device,
	onDeviceRemovedCallback,
	onDeviceUpdatedCallback,
}: DeviceManagementModalProps) {
	const [isDeviceDeletionModalOpen, setIsDeviceDeletionModalOpen] =
		useState(false);
	const [deviceAvailable, setDeviceAvailable] = useState(false);
	const [deviceName, setDeviceName] = useState(device ? device.name : "");
	const [scanResolutions, setScanResolutions] = useState(
		device ? device.resolutions.join(",") : "",
	);

	const { addSuccessNotification, addErrorNotification } = useNotifications();

	const {
		isLoading: isUpdatingDevice,
		isError: errorWhileUpdatingDevice,
		update: updateDevice,
	} = useUpdateDevice(device?.uuid);

	const {
		isLoading: isDeletingDevice,
		isError: errorWhileDeletingDevice,
		delete: deleteDevice,
	} = useDeleteDevice(device?.uuid);

	const {
		isLoading: isUpdatingDeviceScanResolutions,
		isError: errorWhileUpdatingDeviceScanResolutions,
		update: updateDeviceScanResolutions,
	} = useSetDeviceScanResolutions(device?.uuid);

	useEffect(() => {
		setDeviceAvailable(device ? true : false);

		if (device) {
			setDeviceName(device.name);
			setScanResolutions(device.resolutions.join(","));
		}
	}, [isOpen, device]);

	const handleDeleteDevice = useCallback(async () => {
		if (!isDeletingDevice && device) {
			const res = await deleteDevice();

			if (res.success && !errorWhileDeletingDevice) {
				addSuccessNotification(`Successfully deleted ${device?.name}`);

				void onDeviceRemovedCallback?.();
				setIsOpen(false);
			} else {
				addErrorNotification(`Error while deleting ${device?.name}`);
			}
		}
	}, [deleteDevice, isDeletingDevice, errorWhileDeletingDevice, device]);

	const handleUpdateDevice = useCallback(async () => {
		if (!isUpdatingDevice && !isUpdatingDeviceScanResolutions && device) {
			const updateData: DeviceUpdate = {
				name: deviceName,
			};

			const res = await updateDevice(updateData);

			const resolutions = scanResolutions
				? scanResolutions.split(",")
				: null;
			const res2 = await updateDeviceScanResolutions(
				resolutions ? resolutions.map((elem) => Number(elem)) : [],
			);

			if (
				res.success &&
				!errorWhileUpdatingDevice &&
				res2.success &&
				!errorWhileUpdatingDeviceScanResolutions
			) {
				addSuccessNotification("Successfully updated device");
			} else {
				addErrorNotification("Error while updating device");
			}

			void onDeviceUpdatedCallback?.();
		}
	}, [
		updateDevice,
		isUpdatingDevice,
		errorWhileUpdatingDevice,
		updateDeviceScanResolutions,
		isUpdatingDeviceScanResolutions,
		errorWhileUpdatingDeviceScanResolutions,
		device,
		deviceName,
		scanResolutions,
	]);

	return (
		<>
			<ConfirmDeviceDeletionModal
				isOpen={isDeviceDeletionModalOpen}
				setIsOpen={setIsDeviceDeletionModalOpen}
				deviceName={deviceName}
				onCancelCallback={async () => {
					setIsDeviceDeletionModalOpen(false);
				}}
				onConfirmCallback={async () => {
					setIsDeviceDeletionModalOpen(false);
					await handleDeleteDevice();
				}}
			/>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="Device Management"
			>
				<div className={classes.wrapper}>
					{deviceAvailable ? (
						<div className={classes["content-wrapper"]}>
							<TextInput
								fullWidth
								value={deviceName}
								onChange={(
									event: ChangeEvent<HTMLInputElement>,
								) => {
									setDeviceName(event.target.value);
								}}
							/>
							<TextInput
								fullWidth
								value={scanResolutions}
								onChange={(
									event: ChangeEvent<HTMLInputElement>,
								) => {
									setScanResolutions(event.target.value);
								}}
								placeholder="200,300"
							/>
							<div className={classes["actions-wrapper"]}>
								<Button
									variant="success"
									fullWidth
									disabled={
										(!isUpdatingDevice &&
											!isUpdatingDeviceScanResolutions) ||
										device
											? false
											: true
									}
									onClick={handleUpdateDevice}
								>
									Update
								</Button>
								<Button
									variant="danger"
									fullWidth
									disabled={
										!isDeletingDevice || device
											? false
											: true
									}
									onClick={() => {
										setIsDeviceDeletionModalOpen(true);
									}}
								>
									Remove
								</Button>
							</div>
						</div>
					) : (
						<div className={classes["info-wrapper"]}>
							No device selected
						</div>
					)}
				</div>
			</Modal>
		</>
	);
}
