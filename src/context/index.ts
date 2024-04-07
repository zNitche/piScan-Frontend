/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import NotificationsContextType from "../types/context/notifications_context";
import NotificationTypeEnum from "../types/enums/notifications_type_enum";
import SelectedDeviceContextType from "@/types/context/selected_device_context";
import Device from "@/types/devices/device";
import SelectedFileContextType from "@/types/context/selected_file_context";
import ScanFile from "@/types/scan_file";

export const NotificationsContext = createContext<NotificationsContextType>({
    addNotification(
        _message: string,
        _expiration: number,
        _type: NotificationTypeEnum,
    ): void {
        throw new Error("Function not implemented");
    },
});

export const SelectedDeviceContext = createContext<SelectedDeviceContextType>({
    device: undefined,
    setDevice(_device: Device): void {
        throw new Error("Function not implemented");
    },
});

export const SelectedFileContext = createContext<SelectedFileContextType>({
    file: undefined,
    setFile(_file: ScanFile): void {
        throw new Error("Function not implemented");
    },
});
