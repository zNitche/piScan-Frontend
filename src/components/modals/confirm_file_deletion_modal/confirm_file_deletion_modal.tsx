import classes from "./confirm_file_deletion_modal.module.css";
import Modal from "../modal/modal";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/design/button/button";
import useSelectedFile from "@/hooks/use_selected_file";

interface ConfirmFileDeletionModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onConfirmCallback?: () => Promise<void>;
    onCancelCallback?: () => Promise<void>;
}

export default function ConfirmFileDeletionModal({
    isOpen,
    setIsOpen,
    onConfirmCallback,
    onCancelCallback,
}: ConfirmFileDeletionModalProps) {
    const { selectedFile: file } = useSelectedFile();

    return (
        <Modal
            nested
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Delete File"
            extraStyles={classes["modal-wrapper"]}
        >
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    Are you sure you want to remove{" "}
                    {file && file.name ? file.name : "this file"} ?
                </div>
                <div className={classes.actions}>
                    <Button
                        variant="danger"
                        fullWidth
                        onClick={async () => {
                            void onConfirmCallback?.();
                        }}
                    >
                        Remove
                    </Button>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={async () => {
                            void onCancelCallback?.();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
