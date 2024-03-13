import { useMemo } from "react";
import useFetchDevices from "../../hooks/fetch/useFetchDevices";
import classes from "./index.module.css";
import DeviceCard from "../../components/device_card/device_card";
import Loader from "../../components/loader/loader";
import AddDeviceCard from "../../components/add_device_card/add_device_card";

export default function Devices() {
	const { isLoading, isError, data: devices } = useFetchDevices();

	const cards = useMemo(() => {
		return devices?.map((device) => {
			return (
				<div
					key={device.uuid}
					className={classes["device-card-wrapper"]}
				>
					<DeviceCard
						name={device.name}
						uuid={device.uuid}
					/>
				</div>
			);
		});
	}, [devices]);

	return (
		<div className={classes.wrapper}>
			{isError ? (
				<div className={classes.error}>Error while loading...</div>
			) : (
				<div className={classes["devices-cards"]}>
					{!isLoading && (
						<div className={classes["device-card-wrapper"]}>
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
	);
}
