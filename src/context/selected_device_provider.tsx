import { ReactElement, useCallback, useState } from "react";
import { SelectedDeviceContext } from ".";
import Device from "@/types/devices/device";

interface SelectedDeviceProviderProps {
    children: ReactElement;
}

export default function SelectedDeviceProvider({
    children,
}: SelectedDeviceProviderProps) {
    const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(
        undefined,
    );

    const setDevice = useCallback((device: Device) => {
        setSelectedDevice(device);
    }, []);

    const contextData = {
        device: selectedDevice,
        setDevice,
    };

    return (
        <SelectedDeviceContext.Provider value={contextData}>
            {children}
        </SelectedDeviceContext.Provider>
    );
}
