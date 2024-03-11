import clsx from "../../utils/clsx";
import classes from "./loader.module.css";

interface LoaderProps {
	variant?: "sm" | "md" | "xl";
}

export default function Loader({ variant }: LoaderProps) {
	const variantClass =
		variant !== undefined ? classes[`size-${variant}`] : classes["size-md"];

	return <div className={clsx(classes.wrapper, variantClass)} />;
}
