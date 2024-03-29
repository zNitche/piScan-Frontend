import classes from "./device_scan_formats_management.module.css";
import Loader from "../design/loader/loader";
import clsx from "@/utils/clsx";
import SettingsIcon from "@/icons/settings";
import EditIcon from "@/icons/edit";
import ScanFormat from "@/types/scan_format";

interface DeviceScanFormatsManagementProps {
    scanFormats: ScanFormat[] | undefined;
    isError?: boolean;
    isLoading?: boolean;
    onSettingsIconClick?: () => void;
    onEditIconClick?: () => void;
}

export default function DeviceScanFormatsManagement({
    scanFormats,
    isError,
    isLoading,
    onSettingsIconClick,
    onEditIconClick,
}: DeviceScanFormatsManagementProps) {
    return (
        <>
            {isError && (
                <div className={classes.error}>
                    Error while loading scan formats
                </div>
            )}
            {!isError && isLoading ? (
                <div className={classes.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={classes.wrapper}>
                    <div className={clsx(classes.row, classes.horizontal)}>
                        <div
                            className={classes.icon}
                            onClick={() => {
                                onEditIconClick?.();
                            }}
                        >
                            <EditIcon />
                        </div>
                        Device scan formats:{" "}
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
                        <div
                            className={clsx(
                                classes.icon,
                                classes["settings-icon"],
                            )}
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
