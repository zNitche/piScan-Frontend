import { SelectHTMLAttributes } from "react";
import classes from "./select.module.css";
import clsx from "@/utils/clsx";

interface SelectItem {
    name: string;
    value: string | number;
}

interface SelectProps {
    items: SelectItem[];
    fullWidth?: boolean;
}

export default function Select({
    items,
    fullWidth,
    className,
    ...otherProps
}: SelectProps & SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            className={clsx(
                className,
                classes.select,
                fullWidth && classes["full-width"],
            )}
            {...otherProps}
        >
            {items.map((item) => {
                return (
                    <option
                        key={item.value}
                        value={item.value}
                    >
                        {item.name}
                    </option>
                );
            })}
        </select>
    );
}
