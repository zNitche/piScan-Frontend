import NotificationTypeEnum from "../enums/notifications_type_enum";

interface NotificationsContextType {
    addNotification: (
        message: string,
        expiration: number,
        type: NotificationTypeEnum,
    ) => void;
}

export default NotificationsContextType;
