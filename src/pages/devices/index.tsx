import { config } from '../../config'
import useFetch from '../../hooks/fetch/core/useFetch'
import Device from '../../types/device'
import classes from './index.module.css'

export default function Devices() {
    const {isLoading, isError, data: devices} = useFetch<Device[]>(`${config.API_URL}/devices`)

    return (
        <div className={classes.wrapper}>
            devices count: {devices?.length}
            is error: {isError ? 1 : 0}
            is Loading: {isLoading ? 1 : 0}
        </div>
    )
}
