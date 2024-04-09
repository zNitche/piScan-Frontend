import classes from "./edit_scan_file_modal.module.css";
import Modal from "../modal/modal";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import Button from "@/components/design/button/button";
import useSelectedFile from "@/hooks/use_selected_file";
import TextInput from "@/components/design/text_input/text_input";
import ScanFileUpdate from "@/types/api/scan_file_update";
import useNotifications from "@/hooks/use_notifications";
import useUpdateScanFile from "@/hooks/fetch/use_update_scan_file";

interface EditScanFileModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSuccessCallback: () => void;
}

export default function EditScanFileModal({
    isOpen,
    setIsOpen,
    onSuccessCallback,
}: EditScanFileModalProps) {
    const { selectedFile: file } = useSelectedFile();
    const { addSuccessNotification, addErrorNotification } = useNotifications();

    const [fileName, setFileName] = useState<string>("");

    const {
        isLoading: isUpdatingFile,
        isError: errorWhileUpdatingFile,
        fetch: updateFile,
    } = useUpdateScanFile(file?.uuid);

    useEffect(() => {
        if (file && isOpen) {
            setFileName(file.name);
        }
    }, [file, isOpen]);

    const handleEditFile = useCallback(async () => {
        if (!isUpdatingFile && file) {
            const fileUpdate: ScanFileUpdate = {
                name: fileName,
            };

            const res = await updateFile(fileUpdate);

            if (res.success && !errorWhileUpdatingFile) {
                addSuccessNotification(
                    `Successfully updated ${file?.name ?? "file"}`,
                );

                onSuccessCallback();
            } else {
                addErrorNotification(
                    `Error while updating ${file?.name ?? "file"}`,
                );
            }
        }
    }, [updateFile, isUpdatingFile, errorWhileUpdatingFile, file, fileName]);

    return (
        <Modal
            nested
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Edit File"
            extraStyles={classes["modal-wrapper"]}
        >
            <div className={classes.wrapper}>
                <div className={classes.row}>
                    <span>File name</span>
                    <TextInput
                        fullWidth
                        value={fileName}
                        placeholder="file name..."
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setFileName(event.target.value);
                        }}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        variant="success"
                        fullWidth
                        onClick={async () => {
                            void handleEditFile();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
