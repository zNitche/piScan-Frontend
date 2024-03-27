import { useCallback, useMemo, useState } from "react";
import classes from "./index.module.css";
import AddDeviceCard from "@/components/add_device_card/add_device_card";
import DeviceCard from "@/components/device_card/device_card";
import Loader from "@/components/design/loader/loader";
import AddDeviceModal from "@/components/modals/add_device_modal/add_device_modal";
import useGetDevices from "@/hooks/fetch/use_get_devices";
import DeviceManagementModal from "@/components/modals/device_management_modal/device_management_modal";
import useSelectedDevice from "@/hooks/use_selected_device";

export default function Content() {
    const { setSelectedDevice } = useSelectedDevice();

    const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
    const [isDeviceManagementModalOpen, setIsDeviceManagementModalOpen] =
        useState(false);

    const { isLoading, isError, data: devices, refetch } = useGetDevices();

    const cards = useMemo(() => {
        return devices?.map((device) => {
            return (
                <div
                    key={device.uuid}
                    className={classes["device-card-wrapper"]}
                    onClick={() => {
                        setSelectedDevice(device);
                        setIsDeviceManagementModalOpen(true);
                    }}
                >
                    <DeviceCard name={device.name} />
                </div>
            );
        });
    }, [devices]);

    const refetchDevices = useCallback(async () => {
        await refetch();
    }, [refetch]);

    return (
        <>
            <AddDeviceModal
                isOpen={isAddDeviceModalOpen}
                setIsOpen={setIsAddDeviceModalOpen}
                onAddedDeviceCallback={refetchDevices}
            />
            <DeviceManagementModal
                isOpen={isDeviceManagementModalOpen}
                setIsOpen={setIsDeviceManagementModalOpen}
                onDeviceRemovedCallback={refetchDevices}
                onDeviceUpdatedCallback={refetchDevices}
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
