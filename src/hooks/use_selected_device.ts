import { SelectedDeviceContext } from "@/context";
import { useContext } from "react";

export default function useSelectedDevice() {
    const { device, setDevice } = useContext(SelectedDeviceContext);

    return { selectedDevice: device, setSelectedDevice: setDevice };
}
