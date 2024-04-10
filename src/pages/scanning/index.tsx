import useGetDevices from "@/hooks/fetch/use_get_devices";
import classes from "./index.module.css";
import Loader from "@/components/design/loader/loader";
import Select from "@/components/design/select/select";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Device from "@/types/devices/device";
import ScanOptionsSelection from "@/components/scan_options_selection/scan_options_selection";
import ScanOptions from "@/types/scan_options";
import useGetScanProgress from "@/hooks/fetch/use_get_scan_progress";
import ProgressBar from "@/components/progress_bar/progress_bar";
import Button from "@/components/design/button/button";
import useStartScanProcess from "@/hooks/fetch/use_start_scan_process";
import ScanProcessParameters from "@/types/api/scan_process_parameters";

export default function Scanning() {
    const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
    const [scanOptions, setScanOptions] = useState<ScanOptions | undefined>();

    const {
        isLoading: isLoadingDevices,
        isError: errorWhileLoadingDevices,
        data: devices,
    } = useGetDevices();
    const { isError: errorWhileLoadingScanProgress, data: scanProgress } =
        useGetScanProgress(selectedDevice?.uuid);

    const { isLoading: isStartingScanProgress, fetch: startScanProcess } =
        useStartScanProcess();

    useEffect(() => {
        if (selectedDevice === undefined && devices.length > 0) {
            setSelectedDevice(devices[0]);
        }
    }, [devices]);

    const startScan = useCallback(() => {
        if (scanOptions && selectedDevice) {
            const parameters: ScanProcessParameters = {
                file_name: "",
                resolution: scanOptions.resolution,
                extension: scanOptions.extension,
            };

            startScanProcess(parameters, selectedDevice.uuid);
        }
    }, [scanOptions, selectedDevice]);

    return (
        <div className={classes.wrapper}>
            {errorWhileLoadingDevices && (
                <div className={classes.error}>
                    Error while fetching devices
                </div>
            )}
            {!errorWhileLoadingDevices && isLoadingDevices && <Loader />}
            {!isLoadingDevices && devices && devices.length > 0 && (
                <div className={classes["inner-wrapper"]}>
                    <div className={classes.content}>
                        <Select
                            fullWidth
                            onChange={(
                                event: ChangeEvent<HTMLSelectElement>,
                            ) => {
                                const device = devices.find(
                                    (d) => d.uuid === event.currentTarget.value,
                                );
                                setSelectedDevice(device);
                            }}
                            items={devices.map((device) => {
                                return {
                                    name: device.name,
                                    value: device.uuid,
                                };
                            })}
                        />
                        <ScanOptionsSelection
                            device={selectedDevice}
                            setScanOptions={setScanOptions}
                        />
                    </div>
                    <div className={classes["scan-progress-wrapper"]}>
                        {errorWhileLoadingScanProgress && (
                            <div className={classes.error}>
                                Error while loading scan progress
                            </div>
                        )}
                        {scanProgress && scanProgress.is_running ? (
                            <ProgressBar progress={scanProgress.progress} />
                        ) : (
                            <Button
                                disabled={isStartingScanProgress}
                                fullWidth
                                onClick={startScan}
                            >
                                Scan
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
