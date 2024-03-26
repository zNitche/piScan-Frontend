import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import classes from "./modal.module.css";
import CloseIcon from "@/icons/close";
import clsx from "@/utils/clsx";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    extraStyles?: string;
    nested?: boolean;
    onCloseCallback?: () => void;
}

export default function Modal({
    isOpen,
    setIsOpen,
    title,
    extraStyles,
    nested,
    onCloseCallback,
    children,
}: PropsWithChildren<ModalProps>) {
    return (
        isOpen && (
            <div
                className={clsx(
                    classes["modal-wrapper"],
                    nested && classes.nested,
                )}
            >
                <div className={clsx(classes.modal, extraStyles)}>
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
