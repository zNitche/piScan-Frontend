import classes from "./progress_bar.module.css";

interface ProgressBarProps {
    progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className={classes["progress-bar"]}>
            <div
                className={classes["inner-bar"]}
                style={{ width: `${progress > 100 ? 100 : progress}%` }}
            />
        </div>
    );
}
