import NotificationSnackbar from "@/components/notification_snackbar/notification_snackbar";
import NotificationTypeEnum from "@/types/enums/notifications_type_enum";
import NotificationItem from "@/types/notification_item";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { NotificationsContext } from ".";
import generateUUID from "@/utils/crypto";

interface NotificationsProviderProps {
    children: ReactElement;
}

export default function NotificationsProvider({
    children,
}: NotificationsProviderProps) {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const addNotification = useCallback(
        (message: string, expiration: number, type: NotificationTypeEnum) => {
            const notification = {
                id: generateUUID(),
                message: message,
                expiration: expiration,
                type: type ? type : NotificationTypeEnum.Success,
            };

            setNotifications((notifications) => [
                ...notifications,
                notification,
            ]);
        },
        [setNotifications, notifications],
    );

    const removeNotification = useCallback(
        (id: string) => {
            setNotifications((notifications) =>
                notifications.filter((notification) => notification.id !== id),
            );
        },
        [setNotifications],
    );

    const notificationsSnackbars = useMemo(() => {
        return notifications.map((notification) => (
            <NotificationSnackbar
                key={notification.id}
                message={notification.message}
                autoHideDuration={notification.expiration}
                type={notification.type}
                handleClose={() => {
                    removeNotification(notification.id);
                }}
            />
        ));
    }, [notifications, removeNotification]);

    const contextData = {
        addNotification: addNotification,
    };

    return (
        <NotificationsContext.Provider value={contextData}>
            {children}

            <div className="notifications-wrapper">
                {notificationsSnackbars}
            </div>
        </NotificationsContext.Provider>
    );
}
