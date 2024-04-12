import ExpandIcon from "@/icons/expand";
import classes from "./collapsible.module.css";
import { ReactElement, useState } from "react";
import clsx from "@/utils/clsx";

interface CollapsibleProps {
    title: string;
    content: ReactElement | ReactElement[];
}

export default function Collapsible({ title, content }: CollapsibleProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classes["collapsible-wrapper"]}>
            <div
                className={classes.header}
                onClick={() => setIsOpen((state) => !state)}
            >
                <div className={classes.title}>{title}</div>
                <ExpandIcon
                    className={clsx(
                        classes["expand-more"],
                        isOpen && classes.open,
                    )}
                />
            </div>
            {isOpen && <div className={classes.content}>{content}</div>}
        </div>
    );
}
