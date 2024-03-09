import useFetchDevices from '../../hooks/fetch/useFetchDevices'
import classes from './index.module.css'

export default function Devices() {
    const {isLoading, isError, data: devices} = useFetchDevices()

    return (
        <div className={classes.wrapper}>
            devices count: {devices?.length}
            is error: {isError ? 1 : 0}
            is Loading: {isLoading ? 1 : 0}
        </div>
    )
}
