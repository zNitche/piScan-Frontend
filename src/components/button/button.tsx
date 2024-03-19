import { ButtonHTMLAttributes } from "react";
import classes from "./button.module.css";
import clsx from "@/utils/clsx";

interface ButtonProps {
	variant?: "primary" | "secondary" | "success" | "danger";
}

export default function Button({
	children,
	variant,
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				classes.button,
				variant ? classes[variant] : classes.primary,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
