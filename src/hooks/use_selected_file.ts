import { SelectedFileContext } from "@/context";
import { useContext } from "react";

export default function useSelectedFile() {
    const { file, setFile } = useContext(SelectedFileContext);

    return { selectedFile: file, setSelectedFile: setFile };
}
