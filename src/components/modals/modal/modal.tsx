import { Dispatch, ReactNode, SetStateAction } from "react";
import classes from "./modal.module.css";
import CloseIcon from "../../../icons/close";

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	content: ReactNode;
}

export default function Modal({
	isOpen,
	setIsOpen,
	title,
	content,
}: ModalProps) {
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
							}}
						/>
					</div>
					<div className={classes.content}>{content}</div>
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
