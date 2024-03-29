import classes from "./device_scan_formats_management_modal.module.css";
import useGetScanFormats from "@/hooks/fetch/use_get_scan_formats";
import Modal from "../modal/modal";
import Loader from "@/components/design/loader/loader";
import Select from "@/components/design/select/select";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import Button from "@/components/design/button/button";
import useNotifications from "@/hooks/use_notifications";
import useAddScanFormatToDevice from "@/hooks/fetch/use_add_scan_format_to_device";
import useRemoveScanFormatForDevice from "@/hooks/fetch/use_remove_scan_format_for_device";
import ScanFormat from "@/types/scan_format";
import useSelectedDevice from "@/hooks/use_selected_device";
import useGetScanFormatsForDevice from "@/hooks/fetch/use_get_scan_formats_for_device";

interface DeviceScanFormatsManagementModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onActionCompletedCallback?: () => Promise<void>;
    inAnotherModal?: boolean;
}

export default function DeviceScanFormatsManagementModal({
    isOpen,
    setIsOpen,
    inAnotherModal,
    onActionCompletedCallback,
}: DeviceScanFormatsManagementModalProps) {
    const [currentlySelectedScanFormat, setCurrentlySelectedScanFormat] =
        useState<ScanFormat | undefined>(undefined);

    const { addSuccessNotification, addErrorNotification } = useNotifications();
    const { selectedDevice: device } = useSelectedDevice();

    const {
        refetch: refetchScanFormatsForDevice,
        isLoading: isLoadingScanFormatsForDevice,
        data: deviceScanFormats,
    } = useGetScanFormatsForDevice(device?.uuid);

    const {
        isLoading: isLoadingScanFormats,
        isError: errorWhileGettingScanFormats,
        data: scanFormats,
        refetch: refetchScanFormats,
    } = useGetScanFormats(false);

    const { isLoading: isAddingScanFormat, fetch: addScanFormat } =
        useAddScanFormatToDevice();

    const { isLoading: isRemovingScanFormat, fetch: deleteScanFormat } =
        useRemoveScanFormatForDevice();

    const alreadyAddedScanFormatsIds = useMemo(() => {
        return deviceScanFormats.map((format) => format.uuid);
    }, [deviceScanFormats]);

    const formatAlreadyAdded = currentlySelectedScanFormat
        ? alreadyAddedScanFormatsIds.includes(currentlySelectedScanFormat.uuid)
        : false;

    useEffect(() => {
        if (isOpen) {
            void refetchScanFormats();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scanFormats.length > 0 && !currentlySelectedScanFormat) {
            setCurrentlySelectedScanFormat(scanFormats[0]);
        }
    }, [scanFormats]);

    const handleAddScanFormat = useCallback(async () => {
        if (!isAddingScanFormat && device && currentlySelectedScanFormat) {
            const res = await addScanFormat(
                device.uuid,
                currentlySelectedScanFormat.uuid,
            );

            if (res.success) {
                addSuccessNotification(
                    `Successfully added "${currentlySelectedScanFormat.name}" to ${device.name}`,
                );
                void onActionCompletedCallback?.();
                void refetchScanFormatsForDevice?.();
            } else {
                addErrorNotification("Error while adding scan format");
            }
        }
    }, [isAddingScanFormat, device, currentlySelectedScanFormat]);

    const handleDeleteScanFormat = useCallback(async () => {
        if (!isRemovingScanFormat && device && currentlySelectedScanFormat) {
            const res = await deleteScanFormat(
                device.uuid,
                currentlySelectedScanFormat.uuid,
            );

            if (res.success) {
                addSuccessNotification(
                    "Scan format has been successfully removed",
                );
                void onActionCompletedCallback?.();
                void refetchScanFormatsForDevice?.();
            } else {
                addErrorNotification("Error while removing scan format");
            }
        }
    }, [isRemovingScanFormat, currentlySelectedScanFormat]);

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Device Scan Formats Management"
            nested={inAnotherModal}
            extraStyles={classes["modal-wrapper"]}
        >
            <div className={classes.wrapper}>
                {errorWhileGettingScanFormats && (
                    <div className={classes.info}>
                        Error while loading scan formats
                    </div>
                )}
                {!errorWhileGettingScanFormats && isLoadingScanFormats ? (
                    <div className={classes.loader}>
                        <Loader />
                    </div>
                ) : (
                    <div className={classes.row}>
                        {scanFormats.length > 0 ? (
                            <div className={classes.row}>
                                Available scan formats
                                <Select
                                    onChange={(
                                        event: ChangeEvent<HTMLSelectElement>,
                                    ) => {
                                        const format = scanFormats.find(
                                            (elem) =>
                                                elem.uuid ===
                                                event.currentTarget.value,
                                        );
                                        setCurrentlySelectedScanFormat(format);
                                    }}
                                    items={scanFormats.map((format) => {
                                        return {
                                            name: format.name,
                                            value: format.uuid,
                                        };
                                    })}
                                />
                            </div>
                        ) : (
                            <div className={classes.info}>
                                No scan formats available
                            </div>
                        )}
                    </div>
                )}
                <div className={classes["actions-wrapper"]}>
                    <Button
                        variant="success"
                        fullWidth
                        disabled={
                            isAddingScanFormat ||
                            !currentlySelectedScanFormat ||
                            formatAlreadyAdded ||
                            isLoadingScanFormats ||
                            isLoadingScanFormatsForDevice
                        }
                        onClick={handleAddScanFormat}
                    >
                        Add
                    </Button>
                    <Button
                        variant="danger"
                        fullWidth
                        disabled={
                            isRemovingScanFormat ||
                            !currentlySelectedScanFormat ||
                            !formatAlreadyAdded ||
                            isLoadingScanFormats ||
                            isLoadingScanFormatsForDevice
                        }
                        onClick={handleDeleteScanFormat}
                    >
                        Remove Selected
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
