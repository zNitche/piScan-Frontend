import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import classes from "./modal.module.css";
import CloseIcon from "@/icons/close";

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	onCloseCallback?: () => void;
}

export default function Modal({
	isOpen,
	setIsOpen,
	title,
	onCloseCallback,
	children,
}: PropsWithChildren<ModalProps>) {
	return (
		isOpen && (
			<div className={classes["modal-wrapper"]}>
				<div className={classes.modal}>
					<div className={classes.header}>
						<span>{title}</span>
						<CloseIcon
							className={classes["close-icon"]}
							onClick={() => {
								setIsOpen(false);
								onCloseCallback?.();
							}}
						/>
					</div>
					<div className={classes.content}>{children}</div>
				</div>
				<div
					className={classes.overlay}
					onClick={() => {
						setIsOpen(false);
					}}
				/>
			</div>
		)
	);
}
