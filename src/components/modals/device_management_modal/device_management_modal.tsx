import classes from "./device_management_modal.module.css";
import Modal from "../modal/modal";
import { Dispatch, SetStateAction } from "react";

interface DeviceManagementModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onCloseCallback: () => void;
	deviceId: string;
}

export default function DeviceManagementModal({
	isOpen,
	setIsOpen,
	onCloseCallback,
	deviceId,
}: DeviceManagementModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			onCloseCallback={onCloseCallback}
			title="Device Management"
		>
			<div className={classes.wrapper}>GG {deviceId}</div>
		</Modal>
	);
}
