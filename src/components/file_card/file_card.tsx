import ScanFile from "@/types/scan_file";
import classes from "./file_card.module.css";
import { useMemo } from "react";
import { formatDateToNormal } from "@/utils/date";
import ErrorIndicatorIcon from "@/icons/error_indicator";
import DeleteIcon from "@/icons/delete";
import DownloadIcon from "@/icons/download";
import EditIcon from "@/icons/edit";

interface FileCardProps {
    file: ScanFile;
    onRemoveIconClick?: () => void;
    onEditIconClick?: () => void;
}

export default function FileCard({
    file,
    onRemoveIconClick,
    onEditIconClick,
}: FileCardProps) {
    const createdAtDate = useMemo(() => {
        const date = formatDateToNormal(new Date(file.created_at));
        return date ? date : "---";
    }, [file.created_at]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.top}>
                    <div className={classes.name}>
                        {file.name ? file.name : "---"}
                    </div>
                    <div className={classes["top-actions"]}>
                        <div
                            className={classes["action-icon"]}
                            onClick={() => {
                                onEditIconClick?.();
                            }}
                        >
                            <EditIcon />
                        </div>
                        <div className={classes["action-icon"]}>
                            <a
                                target="_blank"
                                href={file.image.download_url}
                                rel="noreferrer"
                            >
                                <DownloadIcon />
                            </a>
                        </div>
                        <div
                            className={classes["action-icon"]}
                            onClick={() => {
                                onRemoveIconClick?.();
                            }}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
                <div className={classes["image-wrapper"]}>
                    <a
                        target="_blank"
                        href={file.image.preview_url}
                        rel="noreferrer"
                    >
                        {file.image?.thumbnail_url ? (
                            <img
                                src={file.image.thumbnail_url}
                                className={classes.image}
                            />
                        ) : (
                            <ErrorIndicatorIcon />
                        )}
                    </a>
                </div>
                <div className={classes.date}>{createdAtDate}</div>
            </div>
        </div>
    );
}
