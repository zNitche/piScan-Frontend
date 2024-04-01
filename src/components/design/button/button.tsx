import { ButtonHTMLAttributes } from "react";
import classes from "./button.module.css";
import clsx from "@/utils/clsx";

interface ButtonProps {
    variant?: "primary" | "secondary" | "success" | "danger";
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant,
    fullWidth,
    className,
    ...otherProps
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={clsx(
                className,
                classes.btn,
                variant ? classes[variant] : classes.primary,
                fullWidth && classes["full-width"],
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
}
