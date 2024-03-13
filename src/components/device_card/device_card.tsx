import PrinterIcon from "../../icons/printer";
import classes from "./device_card.module.css";

interface DeviceCardProps {
	uuid: string;
	name: string;
}

export default function DeviceCard({ name, uuid }: DeviceCardProps) {
	return (
		<div className={classes.wrapper}>
			<PrinterIcon className={classes.icon} />
			<div className={classes.name}>{name}</div>
		</div>
	);
}
