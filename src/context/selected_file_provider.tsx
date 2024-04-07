import { ReactElement, useCallback, useState } from "react";
import ScanFile from "@/types/scan_file";
import { SelectedFileContext } from ".";

interface SelectedFileProviderProps {
    children: ReactElement;
}

export default function SelectedFileProvider({
    children,
}: SelectedFileProviderProps) {
    const [selectedFile, setSelectedFile] = useState<ScanFile | undefined>(
        undefined,
    );

    const setFile = useCallback((file: ScanFile) => {
        setSelectedFile(file);
    }, []);

    const contextData = {
        file: selectedFile,
        setFile,
    };

    return (
        <SelectedFileContext.Provider value={contextData}>
            {children}
        </SelectedFileContext.Provider>
    );
}
