import SelectedDeviceProvider from "@/context/selected_device_provider";
import Content from "./content";

export default function Devices() {
    return (
        <SelectedDeviceProvider>
            <Content />
        </SelectedDeviceProvider>
    );
}
