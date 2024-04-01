import { InputHTMLAttributes } from "react";
import classes from "./text_input.module.css";
import clsx from "@/utils/clsx";

interface TextInputProps {
    fullWidth?: boolean;
}

export default function TextInput({
    fullWidth,
    className,
    ...otherProps
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div
            className={clsx(
                classes["input-wrapper"],
                fullWidth && classes["full-width"],
            )}
        >
            <input
                className={clsx(className, classes.input)}
                {...otherProps}
            />
        </div>
    );
}
