import NotificationTypeEnum from "./enums/notifications_type_enum";

interface NotificationItem {
	id: string;
	message: string;
	expiration: number;
	type: NotificationTypeEnum;
}

export default NotificationItem;
