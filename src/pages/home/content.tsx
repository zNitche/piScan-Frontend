/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchBar from "@/components/search_bar/search_bar";
import classes from "./index.module.css";
import { useCallback, useEffect, useState } from "react";
import useGetFiles from "@/hooks/fetch/use_get_files";
import Button from "@/components/design/button/button";
import FileCard from "@/components/file_card/file_card";
import Loader from "@/components/design/loader/loader";
import { useLocation, useSearch } from "wouter";
import clsx from "@/utils/clsx";
import useSelectedFile from "@/hooks/use_selected_file";
import ConfirmFileDeletionModal from "@/components/modals/confirm_file_deletion_modal/confirm_file_deletion_modal";
import useDeleteFile from "@/hooks/fetch/use_delete_file";
import useNotifications from "@/hooks/use_notifications";

export default function Content() {
    const [_location, navigate] = useLocation();
    const searchParams = useSearch();
    const [searchQuery, setSearchQuery] = useState("");
    const [isFileDeletionModalOpen, setIsFileDeletionModalOpen] =
        useState(false);

    const { setSelectedFile, selectedFile: file } = useSelectedFile();

    const { isLoading, isError, hasNext, data, fetchNext, refetch } =
        useGetFiles(searchQuery);

    const {
        isLoading: isDeletingFile,
        isError: errorWhileDeletingFile,
        fetch: deleteFile,
    } = useDeleteFile(file?.uuid);

    const { addSuccessNotification, addErrorNotification } = useNotifications();

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

    const handleDeleteFile = useCallback(async () => {
        if (!isDeletingFile && file) {
            const res = await deleteFile();

            if (res.success && !errorWhileDeletingFile) {
                addSuccessNotification(
                    `Successfully deleted ${file?.name ?? "file"}`,
                );

                void refetch();
            } else {
                addErrorNotification(
                    `Error while deleting ${file?.name ?? "file"}`,
                );
            }
        }
    }, [deleteFile, isDeletingFile, errorWhileDeletingFile, file]);

    return (
        <>
            <ConfirmFileDeletionModal
                isOpen={isFileDeletionModalOpen}
                setIsOpen={setIsFileDeletionModalOpen}
                onCancelCallback={async () => {
                    setIsFileDeletionModalOpen(false);
                }}
                onConfirmCallback={async () => {
                    setIsFileDeletionModalOpen(false);
                    await handleDeleteFile();
                }}
            />
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
                                    <FileCard
                                        file={file}
                                        onRemoveIconClick={() => {
                                            setSelectedFile(file);
                                            setIsFileDeletionModalOpen(true);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {!isLoading && !isError && data.length === 0 && (
                        <div
                            className={clsx(
                                classes["info-wrapper"],
                                classes.info,
                            )}
                        >
                            No files to show
                        </div>
                    )}
                    {isLoading && (
                        <div className={clsx(classes["info-wrapper"])}>
                            <Loader variant="sm" />
                        </div>
                    )}
                    {!isLoading && isError && (
                        <div
                            className={clsx(
                                classes["info-wrapper"],
                                classes.error,
                            )}
                        >
                            Error while loading files
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
        </>
    );
}
