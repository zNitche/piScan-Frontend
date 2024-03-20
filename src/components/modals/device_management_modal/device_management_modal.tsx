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

	useEffect(() => {
		setDeviceAvailable(device ? true : false);

		if (device) {
			setDeviceName(device.name);
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
		if (!isUpdatingDevice && device) {
			const updateData: DeviceUpdate = {
				name: deviceName,
			};

			const res = await updateDevice(updateData);

			if (res.success && !errorWhileUpdatingDevice) {
				addSuccessNotification("Successfully updated device");

				void onDeviceUpdatedCallback?.();
			} else {
				addErrorNotification("Error while updating device");
			}
		}
	}, [
		updateDevice,
		isUpdatingDevice,
		errorWhileUpdatingDevice,
		device,
		deviceName,
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
							<div className={classes["actions-wrapper"]}>
								<Button
									variant="success"
									fullWidth
									disabled={
										!isUpdatingDevice || device
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
