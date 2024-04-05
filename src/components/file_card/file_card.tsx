import ScanFile from "@/types/scan_file";
import classes from "./file_card.module.css";
import { useMemo } from "react";
import { formatDateToNormal } from "@/utils/date";
import ErrorIndicatorIcon from "@/icons/error_indicator";

interface FileCardProps {
    file: ScanFile;
}

export default function FileCard({ file }: FileCardProps) {
    const createdAtDate = useMemo(() => {
        const date = formatDateToNormal(new Date(file.created_at));
        return date ? date : "---";
    }, [file.created_at]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.name}>
                    {file.name ? file.name : "---"}
                </div>
                <div className={classes["image-wrapper"]}>
                    {file.image?.thumbnail_url ? (
                        <img
                            src={file.image.thumbnail_url}
                            className={classes.image}
                        />
                    ) : (
                        <ErrorIndicatorIcon />
                    )}
                </div>
                <div className={classes.date}>{createdAtDate}</div>
            </div>
        </div>
    );
}
