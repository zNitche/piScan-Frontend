import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import classes from "./add_device_modal.module.css";
import Loader from "@/components/design/loader/loader";
import useGetConnectedDevices from "@/hooks/fetch/use_get_connected_devices";
import usePostNewDevices from "@/hooks/fetch/use_post_new_device";
import useNotifications from "@/hooks/use_notifications";
import AddIcon from "@/icons/add";
import CheckedIcon from "@/icons/checked";
import RefreshIcon from "@/icons/refresh";
import ConnectedDevice from "@/types/devices/connected_device";
import clsx from "@/utils/clsx";
import Modal from "../modal/modal";

interface AddDeviceModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onAddedDeviceCallback?: () => Promise<void>;
}

export default function AddDeviceModal({
	isOpen,
	setIsOpen,
	onAddedDeviceCallback,
}: AddDeviceModalProps) {
	const { addSuccessNotification, addErrorNotification } = useNotifications();

	const { isLoading, isError, data, refetch } = useGetConnectedDevices();
	const {
		isLoading: addingDevice,
		isError: addingDeviceError,
		post: addDevice,
		currentDeviceId,
	} = usePostNewDevices();

	useEffect(() => {
		if (isOpen) {
			refetch();
		}
	}, [isOpen]);

	const handleAddNewDevice = useCallback(
		async (device: ConnectedDevice) => {
			if (!addingDevice) {
				const res = await addDevice({
					name: device.name,
					device_id: device.device_id,
				});

				if (res.success && !addingDeviceError) {
					addSuccessNotification("Successfully added new device");

					void onAddedDeviceCallback?.();
					setIsOpen(false);
				} else {
					addErrorNotification("Error while adding new device");
				}
			}
		},
		[addDevice, addingDevice, addingDeviceError],
	);

	const devicesCards = useMemo(() => {
		if (!data) {
			return;
		}

		return data.map((device, index) => {
			return (
				<div
					key={index}
					className={classes["device-wrapper"]}
				>
					{device.is_added ? (
						<CheckedIcon className={classes.icon} />
					) : (
						<div className={classes["icon-placeholder"]} />
					)}
					<div className={classes["device-name"]}>{device.name}</div>
					{addingDevice && currentDeviceId === device.device_id && (
						<Loader variant="xs" />
					)}
					{device.is_added ||
						(!addingDevice &&
							currentDeviceId !== device.device_id && (
							<AddIcon
								className={clsx(
									classes.icon,
									classes.action,
								)}
								onClick={async () => {
									handleAddNewDevice(device);
								}}
							/>
						))}
				</div>
			);
		});
	}, [data, addingDevice]);

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title="Add new device"
		>
			<div className={classes.wrapper}>
				<div className={classes.header}>
					<span className={classes["header-info"]}>
						Connected USB devices
					</span>
					{!isLoading && !addingDevice && (
						<RefreshIcon
							className={clsx(classes.icon, classes.action)}
							onClick={refetch}
						/>
					)}
				</div>
				{isError && (
					<div className={classes["fetch-info-wrapper"]}>
						Error while fetching devices...
					</div>
				)}
				{!isError && !isLoading && devicesCards?.length === 0 && (
					<div className={classes["fetch-info-wrapper"]}>
						No connected devices detected
					</div>
				)}
				{isLoading && !isError ? (
					<div className={classes["fetch-info-wrapper"]}>
						<Loader />
					</div>
				) : (
					<div className={classes["devices-wrapper"]}>
						{devicesCards}
					</div>
				)}
			</div>
		</Modal>
	);
}
