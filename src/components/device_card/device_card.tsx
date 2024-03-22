import PrinterIcon from "@/icons/printer";
import classes from "./device_card.module.css";

interface DeviceCardProps {
    name: string;
}

export default function DeviceCard({ name }: DeviceCardProps) {
    return (
        <div className={classes.wrapper}>
            <PrinterIcon className={classes.icon} />
            <div className={classes.name}>{name}</div>
        </div>
    );
}
