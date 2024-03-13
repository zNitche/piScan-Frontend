import { Dispatch, SetStateAction, useMemo } from "react";
import classes from "./add_device_modal.module.css";
import Modal from "../modal/modal";

interface AddDeviceModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddDeviceModal({
	isOpen,
	setIsOpen,
}: AddDeviceModalProps) {
	const content = useMemo(() => {
		return <div className={classes.wrapper}>content</div>;
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title="Add new device"
			content={content}
		/>
	);
}
