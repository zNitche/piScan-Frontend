import { SelectedDeviceContext } from "@/context";
import Device from "@/types/devices/device";
import { useContext } from "react";

interface useSelectedDeviceResults {
    selectedDevice: Device | undefined;
    setSelectedDevice: (device: Device) => void;
}

export default function useSelectedDevice(): useSelectedDeviceResults {
    const { device, setDevice } = useContext(SelectedDeviceContext);

    return { selectedDevice: device, setSelectedDevice: setDevice };
}
