import useGetScanFormatsForDevice from "@/hooks/fetch/use_get_scan_formats_for_device";
import classes from "./device_scan_formats_management.module.css";
import Loader from "../design/loader/loader";
import clsx from "@/utils/clsx";

interface DeviceScanFormatsManagementProps {
    deviceUUID: string | undefined;
}

export default function DeviceScanFormatsManagement({
    deviceUUID,
}: DeviceScanFormatsManagementProps) {
    const {
        isLoading: isLoadingScanFormats,
        isError: errorWhileLoadingScanFormats,
        data: scanFormats,
    } = useGetScanFormatsForDevice(deviceUUID);

    return (
        <>
            {errorWhileLoadingScanFormats && (
                <div className={classes.error}>
                    Error while loading scan formats
                </div>
            )}
            {!errorWhileLoadingScanFormats && isLoadingScanFormats ? (
                <div className={classes.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={classes.wrapper}>
                    <div className={clsx(classes.row, classes.horizontal)}>
                        Scan formats:{" "}
                        <div className={classes.formats}>
                            {scanFormats && scanFormats.length > 0
                                ? scanFormats.map((item) => {
                                      return (
                                          <span key={item.uuid}>
                                              {item.name}
                                          </span>
                                      );
                                  })
                                : "---"}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
