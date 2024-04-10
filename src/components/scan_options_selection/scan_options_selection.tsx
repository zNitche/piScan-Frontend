import Device from "@/types/devices/device";
import classes from "./scan_options_selection.module.css";
import Select from "../design/select/select";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import ScanOptions from "@/types/scan_options";
import ScanFormat from "@/types/scan_format";
import TextInput from "../design/text_input/text_input";

interface ScanOptionsSelectionProps {
    device: Device | undefined;
    setScanOptions: Dispatch<SetStateAction<ScanOptions | undefined>>;
}

export default function ScanOptionsSelection({
    device,
    setScanOptions,
}: ScanOptionsSelectionProps) {
    const [fileName, setFileName] = useState("");
    const [selectedResolution, setSelectedResolution] = useState(0);
    const [selectedScanFormat, setSelectedScanFormat] = useState<
        ScanFormat | undefined
    >(undefined);

    useEffect(() => {
        if (device !== undefined) {
            if (device.resolutions.length > 0) {
                setSelectedResolution(device.resolutions[0]);
            }

            if (device.scan_formats.length > 0) {
                setSelectedScanFormat(device.scan_formats[0]);
            }
        }
    }, [device]);

    useEffect(() => {
        if (selectedResolution !== 0 && selectedScanFormat !== undefined) {
            setScanOptions({
                fileName: fileName,
                resolution: selectedResolution,
                extension: selectedScanFormat.name,
            });
        }
    }, [selectedResolution, selectedScanFormat, fileName]);

    return (
        device && (
            <div className={classes.wrapper}>
                <div className={classes.row}>
                    <Select
                        className={classes["format-selection"]}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            const format = device.scan_formats.find(
                                (elem) =>
                                    elem.uuid === event.currentTarget.value,
                            );

                            if (format) {
                                setSelectedScanFormat(format);
                            }
                        }}
                        items={device.scan_formats.map((format) => {
                            return {
                                name: format.name,
                                value: format.uuid,
                            };
                        })}
                    />
                    <Select
                        className={classes["resolution-selection"]}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            const resolution = device.resolutions.find(
                                (elem) =>
                                    elem === Number(event.currentTarget.value),
                            );

                            if (resolution) {
                                setSelectedResolution(resolution);
                            }
                        }}
                        items={device.resolutions.map((resolution) => {
                            return {
                                name: String(resolution),
                                value: resolution,
                            };
                        })}
                    />
                </div>
                <div className={classes.row}>
                    <TextInput
                        fullWidth
                        value={fileName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setFileName(event.target.value);
                        }}
                        placeholder="File name"
                    />
                </div>
            </div>
        )
    );
}
