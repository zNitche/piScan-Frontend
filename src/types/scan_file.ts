import FileDetails from "./file_details";
import FileImage from "./file_image";

interface ScanFile {
    created_at: string;
    details: FileDetails;
    extension: string;
    image: FileImage;
    name: string;
    uuid: string;
}

export default ScanFile;
