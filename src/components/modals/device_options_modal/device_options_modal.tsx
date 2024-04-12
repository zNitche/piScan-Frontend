import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import classes from "./device_options_modal.module.css";
import Loader from "@/components/design/loader/loader";
import RefreshIcon from "@/icons/refresh";
import clsx from "@/utils/clsx";
import Modal from "../modal/modal";
import useSelectedDevice from "@/hooks/use_selected_device";
import useGetDeviceOptions from "@/hooks/fetch/use_get_device_options";
import Collapsible from "@/components/design/collapsible/collapsible";

interface DeviceOptionseModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    inAnotherModal?: boolean;
}

export default function DeviceOptionseModal({
    isOpen,
    setIsOpen,
    inAnotherModal,
}: DeviceOptionseModalProps) {
    const { selectedDevice: device } = useSelectedDevice();

    const { isLoading, isError, data, refetch } = useGetDeviceOptions(
        device?.uuid,
    );

    useEffect(() => {
        if (isOpen) {
            void refetch();
        }
    }, [isOpen]);

    const content = useMemo(() => {
        if (!data || !data.options) {
            return;
        }

        return data.options.map((row, index) => {
            const content = row.parameters.map((parameter, parameter_index) => {
                return (
                    <div
                        key={parameter_index}
                        className={classes["parameter-wrapper"]}
                    >
                        <div className={classes["parameter-name"]}>
                            {parameter.name}
                        </div>
                        <div>{parameter.description}</div>
                    </div>
                );
            });

            return (
                <Collapsible
                    key={index}
                    title={row.name}
                    content={
                        <div className={classes["parameters-wrapper"]}>
                            {content}
                        </div>
                    }
                />
            );
        });
    }, [data]);

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Device options"
            nested={inAnotherModal}
        >
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <span className={classes["header-info"]}>
                        Options for {device ? device.name : "---"}
                    </span>
                    {!isLoading && (
                        <RefreshIcon
                            className={clsx(classes.icon, classes.action)}
                            onClick={refetch}
                        />
                    )}
                </div>
                {isError && (
                    <div className={classes["fetch-info-wrapper"]}>
                        Error while fetching device options...
                    </div>
                )}
                {!isError && !isLoading && content === undefined && (
                    <div className={classes["fetch-info-wrapper"]}>
                        No devices options
                    </div>
                )}
                {isLoading && !isError ? (
                    <div className={classes["fetch-info-wrapper"]}>
                        <Loader />
                    </div>
                ) : (
                    <div className={classes["options-wrapper"]}>{content}</div>
                )}
            </div>
        </Modal>
    );
}
