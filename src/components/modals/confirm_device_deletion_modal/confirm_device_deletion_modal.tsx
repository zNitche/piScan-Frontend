import classes from "./confirm_device_deletion_modal.module.css";
import Modal from "../modal/modal";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/design/button/button";
import useSelectedDevice from "@/hooks/use_selected_device";

interface ConfirmDeviceDeletionModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onConfirmCallback?: () => Promise<void>;
    onCancelCallback?: () => Promise<void>;
}

export default function ConfirmDeviceDeletionModal({
    isOpen,
    setIsOpen,
    onConfirmCallback,
    onCancelCallback,
}: ConfirmDeviceDeletionModalProps) {
    const { selectedDevice: device } = useSelectedDevice();

    return (
        <Modal
            nested
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Delete Device"
            extraStyles={classes["modal-wrapper"]}
        >
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    Are you sure you want to remove {device?.name} ?
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
