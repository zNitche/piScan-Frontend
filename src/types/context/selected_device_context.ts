import Device from "../devices/device";

interface SelectedDeviceContextType {
    device: Device | undefined;
    setDevice: (device: Device) => void;
}

export default SelectedDeviceContextType;
