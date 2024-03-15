import { useEffect } from "react";
import classes from "./notification_snackbar.module.css";
import NotificationTypeEnum from "../../types/enums/notifications_type_enum";
import CloseIcon from "../../icons/close";
import clsx from "../../utils/clsx";

interface NotificationSnackbarProps {
	message: string;
	autoHideDuration: number;
	type: NotificationTypeEnum;
	handleClose: () => void;
}

export default function NotificationSnackbar({
	message,
	autoHideDuration,
	type,
	handleClose,
}: NotificationSnackbarProps) {
	useEffect(() => {
		setTimeout(function () {
			handleClose();
		}, autoHideDuration);
	}, []);

	return (
		<div
			className={clsx(
				classes["notification-snackbar"],
				classes[`${type}-notification`],
			)}
		>
			<div className={classes.content}>{message}</div>
			<div className={classes.actions}>
				<div className={classes.close} onClick={handleClose}>
					<CloseIcon className={classes.icon} />
				</div>
			</div>
		</div>
	);
}
