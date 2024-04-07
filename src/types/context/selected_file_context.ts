import ScanFile from "../scan_file";

interface SelectedFileContextType {
    file: ScanFile | undefined;
    setFile: (file: ScanFile) => void;
}

export default SelectedFileContextType;
