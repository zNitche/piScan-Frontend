import ScanFormat from "./scan_format"

export default interface Device {
    uuid: string
    name: string
    device_id: string
    resolutions: Array<number>
    scan_formats: Array<ScanFormat>
}