import { InputHTMLAttributes } from "react";
import classes from "./text_input.module.css";
import clsx from "@/utils/clsx";

interface TextInputProps {
	fullWidth?: boolean;
}

export default function TextInput({
	fullWidth,
	...props
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={clsx(classes.input, fullWidth && classes["full-width"])}
			{...props}
		/>
	);
}
