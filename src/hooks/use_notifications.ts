import { useCallback, useContext } from "react";
import { NotificationsContext } from "../context";
import NotificationTypeEnum from "../types/enums/notifications_type_enum";

interface useNotificationsResults {
	addSuccessNotification: (text: string, expiration?: number) => void;
	addErrorNotification: (text: string, expiration?: number) => void;
}

export default function useNotifications(): useNotificationsResults {
	const { addNotification } = useContext(NotificationsContext);

	const addSuccessNotification = useCallback(
		(text: string, expiration: number = 5000) => {
			addNotification(text, expiration, NotificationTypeEnum.Success);
		},
		[addNotification],
	);

	const addErrorNotification = useCallback(
		(text: string, expiration: number = 2000) => {
			addNotification(text, expiration, NotificationTypeEnum.Error);
		},
		[addNotification],
	);

	return { addSuccessNotification, addErrorNotification };
}
