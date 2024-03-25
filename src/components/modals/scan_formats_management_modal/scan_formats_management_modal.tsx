import classes from "./scan_formats_management_modal.module.css";
import usePostNewScanFormat from "@/hooks/fetch/use_post_new_scan_format";
import useDeleteScanFormat from "@/hooks/fetch/use_delete_scan_format";
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
    useState,
} from "react";
import Button from "@/components/design/button/button";
import NewScanFormat from "@/types/api/new_scan_format";
import useNotifications from "@/hooks/use_notifications";
import TextInput from "@/components/design/text_input/text_input";

interface ScanFormatsManagementModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    inAnotherModal?: boolean;
}

export default function ScanFormatsManagementModal({
    isOpen,
    setIsOpen,
    inAnotherModal,
}: ScanFormatsManagementModalProps) {
    const [newScanFormatName, setNewScanFormatName] = useState("");
    const [currentlySelectedScanFormat, setCurrentlySelectedScanFormat] =
        useState("");

    const { addSuccessNotification, addErrorNotification } = useNotifications();

    const {
        isLoading: isLoadingScanFormats,
        isError: errorWhileGettingScanFormats,
        data: scanFormats,
        refetch: refetchScanFormats,
    } = useGetScanFormats(false);

    const { isLoading: isAddingNewScanFormat, fetch: addNewScanFormat } =
        usePostNewScanFormat();

    const { isLoading: isRemovingScanFormat, fetch: deleteScanFormat } =
        useDeleteScanFormat();

    useEffect(() => {
        if (isOpen) {
            void refetchScanFormats();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scanFormats && scanFormats.length > 0) {
            setCurrentlySelectedScanFormat(scanFormats[0].uuid);
        }
    }, [scanFormats]);

    const handleAddScanFormat = useCallback(async () => {
        if (!isAddingNewScanFormat) {
            const scanFormat: NewScanFormat = {
                name: newScanFormatName,
            };

            const res = await addNewScanFormat(scanFormat);

            if (res.success) {
                addSuccessNotification(`Successfully added ${scanFormat.name}`);
                void refetchScanFormats();
            } else {
                addErrorNotification("Error while adding new scan format");
            }
        }
    }, [isAddingNewScanFormat, newScanFormatName]);

    const handleDeleteScanFormat = useCallback(async () => {
        if (!isRemovingScanFormat) {
            const res = await deleteScanFormat(currentlySelectedScanFormat);

            if (res.success) {
                addSuccessNotification(
                    "Scan format has been successfully removed",
                );
                void refetchScanFormats();
            } else {
                addErrorNotification("Error while removing scan format");
            }
        }
    }, [isRemovingScanFormat, currentlySelectedScanFormat]);

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Scan Formats Management"
            nested={inAnotherModal}
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
                        {scanFormats && scanFormats.length > 0 ? (
                            <div className={classes.row}>
                                Available scan formats
                                <Select
                                    onChange={(
                                        event: ChangeEvent<HTMLSelectElement>,
                                    ) => {
                                        setCurrentlySelectedScanFormat(
                                            event.target.value,
                                        );
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
                <div className={classes.row}>
                    New scan format:
                    <TextInput
                        fullWidth
                        value={newScanFormatName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setNewScanFormatName(event.target.value);
                        }}
                        placeholder="png"
                    />
                </div>
                <div className={classes["actions-wrapper"]}>
                    <Button
                        variant="success"
                        fullWidth
                        disabled={Boolean(
                            isAddingNewScanFormat || !newScanFormatName,
                        )}
                        onClick={handleAddScanFormat}
                    >
                        Add
                    </Button>
                    <Button
                        variant="danger"
                        fullWidth
                        disabled={isRemovingScanFormat}
                        onClick={handleDeleteScanFormat}
                    >
                        Remove Selected
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
