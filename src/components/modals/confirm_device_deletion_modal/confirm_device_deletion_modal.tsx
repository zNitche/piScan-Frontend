import classes from "./confirm_device_deletion_modal.module.css";
import Modal from "../modal/modal";
import { Dispatch, SetStateAction, useCallback } from "react";
import Button from "@/components/design/button/button";

interface ConfirmDeviceDeletionModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    deviceName: string | undefined;
    onConfirmCallback?: () => Promise<void>;
    onCancelCallback?: () => Promise<void>;
}

export default function ConfirmDeviceDeletionModal({
    isOpen,
    setIsOpen,
    deviceName,
    onConfirmCallback,
    onCancelCallback,
}: ConfirmDeviceDeletionModalProps) {
    const handleConfirm = useCallback(async () => {
        void onConfirmCallback?.();
    }, [onConfirmCallback]);

    const handleCancel = useCallback(async () => {
        void onCancelCallback?.();
    }, [onCancelCallback]);

    return (
        <Modal
            nested
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Delete Device"
        >
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    Are you sure you want to remove {deviceName} ?
                </div>
                <div className={classes.actions}>
                    <Button
                        variant="danger"
                        fullWidth
                        onClick={handleConfirm}
                    >
                        Remove
                    </Button>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
