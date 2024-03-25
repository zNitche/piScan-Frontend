import useGetScanFormatsForDevice from "@/hooks/fetch/use_get_scan_formats_for_device";
import classes from "./device_scan_formats_management.module.css";
import Loader from "../design/loader/loader";
import clsx from "@/utils/clsx";
import SettingsIcon from "@/icons/settings";

interface DeviceScanFormatsManagementProps {
    deviceUUID: string | undefined;
    onSettingsIconClick?: () => void;
}

export default function DeviceScanFormatsManagement({
    deviceUUID,
    onSettingsIconClick,
}: DeviceScanFormatsManagementProps) {
    const {
        isLoading: isLoadingScanFormatsForDevice,
        isError: errorWhileLoadingScanFormats,
        data: deviceScanFormats,
    } = useGetScanFormatsForDevice(deviceUUID);

    return (
        <>
            {errorWhileLoadingScanFormats && (
                <div className={classes.error}>
                    Error while loading scan formats
                </div>
            )}
            {!errorWhileLoadingScanFormats && isLoadingScanFormatsForDevice ? (
                <div className={classes.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={classes.wrapper}>
                    <div className={clsx(classes.row, classes.horizontal)}>
                        Device scan formats:{" "}
                        <div className={classes.formats}>
                            {deviceScanFormats && deviceScanFormats.length > 0
                                ? deviceScanFormats.map((item) => {
                                      return (
                                          <span key={item.uuid}>
                                              {item.name}
                                          </span>
                                      );
                                  })
                                : "---"}
                        </div>
                        <div
                            className={classes["settings-icon"]}
                            onClick={() => {
                                onSettingsIconClick?.();
                            }}
                        >
                            <SettingsIcon />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
