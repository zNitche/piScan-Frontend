import AddIcon from "@/icons/add";
import classes from "./add_device_card.module.css";

export default function AddDeviceCard() {
	return (
		<div className={classes.wrapper}>
			<AddIcon className={classes.icon} />
		</div>
	);
}
