import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import classes from "./add_device_modal.module.css";
import Modal from "../modal/modal";
import useFetchConnectedDevices from "../../../hooks/fetch/use_fetch_connected_devices";
import RefreshIcon from "../../../icons/refresh";
import Loader from "../../loader/loader";
import CheckedIcon from "../../../icons/checked";
import AddIcon from "../../../icons/add";
import usePostNewDevices from "../../../hooks/fetch/use_post_new_device";
import ConnectedDevice from "../../../types/devices/connected_device";
import clsx from "../../../utils/clsx";

interface AddDeviceModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	refetchDevices?: () => Promise<void>;
}

export default function AddDeviceModal({
	isOpen,
	setIsOpen,
	refetchDevices,
}: AddDeviceModalProps) {
	const { isLoading, isError, data, refetch } = useFetchConnectedDevices();
	const {
		isLoading: addingDevice,
		isError: addingDeviceError,
		post: addDevice,
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

				if (res.success) {
					void refetchDevices?.();
					setIsOpen(false);
				}
			}
		},
		[addDevice, addingDevice],
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
					{!device.is_added && (
						<AddIcon
							className={clsx(classes.icon, classes.action)}
							onClick={async () => {
								handleAddNewDevice(device);
							}}
						/>
					)}
				</div>
			);
		});
	}, [data]);

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
					{!isLoading && (
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
