import { useLocation } from 'wouter';
import HomeIcon from '../../icons/home'
import PrinterIcon from '../../icons/printer'
import ScanIcon from '../../icons/scan'
import classes from './navbar.module.css'

export default function Navbar() {
    const [_location, navigate] = useLocation();

    return (
        <div className={classes.wrapper}>
            <div className={classes.icon}>
                <PrinterIcon />
            </div>
            <div className={classes.icon} onClick={
                () => {
                    navigate('/')
                }}>
                <HomeIcon />
            </div>
            <div className={classes.icon}>
                <ScanIcon />
            </div>
        </div>
    )
}
