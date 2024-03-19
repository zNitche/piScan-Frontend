import { useCallback, useMemo, useState } from "react";
import classes from "./index.module.css";
import AddDeviceCard from "@/components/add_device_card/add_device_card";
import DeviceCard from "@/components/device_card/device_card";
import Loader from "@/components/loader/loader";
import AddDeviceModal from "@/components/modals/add_device_modal/add_device_modal";
import useFetchDevices from "@/hooks/fetch/use_fetch_devices";
import DeviceManagementModal from "@/components/modals/device_management_modal/device_management_modal";

export default function Devices() {
	const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
	const [isDeviceManagementModalOpen, setIsDeviceManagementModalOpen] =
		useState(false);
	const [choosenDeviceId, setChoosenDeviceId] = useState("");

	const { isLoading, isError, data: devices, refetch } = useFetchDevices();

	const cards = useMemo(() => {
		return devices?.map((device) => {
			return (
				<div
					key={device.uuid}
					className={classes["device-card-wrapper"]}
					onClick={() => {
						setChoosenDeviceId(device.device_id);
						setIsDeviceManagementModalOpen(true);
					}}
				>
					<DeviceCard
						name={device.name}
						uuid={device.uuid}
					/>
				</div>
			);
		});
	}, [devices]);

	const handleAddNewDevice = useCallback(async () => {
		await refetch();
	}, [refetch]);

	const deviceManagementModalClosedCallback = useCallback(() => {
		setChoosenDeviceId("");
	}, []);

	return (
		<>
			<AddDeviceModal
				isOpen={isAddDeviceModalOpen}
				setIsOpen={setIsAddDeviceModalOpen}
				onAddedDeviceCallback={handleAddNewDevice}
			/>
			<DeviceManagementModal
				isOpen={isDeviceManagementModalOpen}
				setIsOpen={setIsDeviceManagementModalOpen}
				onCloseCallback={deviceManagementModalClosedCallback}
				deviceId={choosenDeviceId}
			/>
			<div className={classes.wrapper}>
				{isError ? (
					<div className={classes.error}>Error while loading...</div>
				) : (
					<div className={classes["devices-cards"]}>
						{!isLoading && (
							<div
								className={classes["device-card-wrapper"]}
								onClick={() => {
									setIsAddDeviceModalOpen(true);
								}}
							>
								<AddDeviceCard />
							</div>
						)}
						{cards}
					</div>
				)}
				{isLoading && (
					<div className={classes["loader-wrapper"]}>
						<Loader variant="xl" />
					</div>
				)}
			</div>
		</>
	);
}
