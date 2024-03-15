/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import NotificationsContextType from "../types/context/notifications_context";
import NotificationTypeEnum from "../types/enums/notifications_type_enum";

export const NotificationsContext = createContext<NotificationsContextType>({
	addNotification(_message: string, _expiration: number, _type: NotificationTypeEnum): void {
		throw new Error("Function not implemented");
	},
});
