import SearchBar from "@/components/search_bar/search_bar";
import classes from "./index.module.css";
import { useEffect, useState } from "react";
import useGetFiles from "@/hooks/fetch/use_get_files";
import Button from "@/components/design/button/button";
import FileCard from "@/components/file_card/file_card";
import Loader from "@/components/design/loader/loader";
import { useLocation, useSearch } from "wouter";

export default function Home() {
    const [_location, navigate] = useLocation();
    const searchParams = useSearch();
    const [searchQuery, setSearchQuery] = useState("");

    const { isLoading, hasNext, data, fetchNext } = useGetFiles(searchQuery);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const searchParam = params.get("search");

        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, []);

    useEffect(() => {
        const url = new URL(window.location.origin);
        if (searchQuery && !searchParams.includes("search=")) {
            url.searchParams.append("search", searchQuery);
        }

        navigate(url, {
            replace: true,
        });
    }, [searchQuery]);

    return (
        <div className={classes.wrapper}>
            <div className={classes["filters-wrapper"]}>
                <SearchBar
                    searchValue={searchQuery}
                    setSearchValue={setSearchQuery}
                />
            </div>
            <div className={classes["content-wrapper"]}>
                <div className={classes["files-list"]}>
                    {data.map((file) => {
                        return (
                            <div
                                key={file.uuid}
                                className={classes["file-card-wrapper"]}
                            >
                                <FileCard file={file} />
                            </div>
                        );
                    })}
                </div>
                {isLoading && (
                    <div className={classes.loader}>
                        <Loader variant="sm" />
                    </div>
                )}
                {hasNext && (
                    <div className={classes["bottom-actions"]}>
                        <Button
                            disabled={isLoading}
                            onClick={() => {
                                void fetchNext();
                            }}
                        >
                            Load More
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
