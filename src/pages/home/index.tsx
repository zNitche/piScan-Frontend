import SearchBar from "@/components/search_bar/search_bar";
import classes from "./index.module.css";
import { useState } from "react";
import useGetFiles from "@/hooks/fetch/use_get_files";
import Button from "@/components/design/button/button";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const { isLoading, isError, hasNext, data, refetch, fetchNext } =
        useGetFiles();

    return (
        <div className={classes.wrapper}>
            <div className={classes["filters-wrapper"]}>
                <SearchBar setSearchValue={setSearchQuery} />
            </div>
            <span>isLoading: {isLoading ? "true" : "false"}</span>
            <div className={classes.files}>
                {data.map((file, index) => {
                    return <span key={index}>{file.name}</span>;
                })}
            </div>
            {hasNext && (
                <Button
                    onClick={() => {
                        void fetchNext();
                    }}
                >
                    Load More
                </Button>
            )}
            <Button
                onClick={() => {
                    void refetch();
                }}
            >
                Refetch
            </Button>
        </div>
    );
}
