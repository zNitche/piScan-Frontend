import { InputHTMLAttributes } from "react";
import classes from "./text_input.module.css";

export default function TextInput(
	props: InputHTMLAttributes<HTMLInputElement>,
) {
	return (
		<input
			className={classes.input}
			{...props}
		/>
	);
}
