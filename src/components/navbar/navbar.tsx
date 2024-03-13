import { useLocation } from "wouter";
import HomeIcon from "../../icons/home";
import PrinterIcon from "../../icons/printer";
import ScanIcon from "../../icons/scan";
import classes from "./navbar.module.css";
import clsx from "../../utils/clsx";

const actions = [
	{
		location: "/devices",
		icon: <PrinterIcon />,
	},
	{
		location: "/",
		icon: <HomeIcon />,
	},
	{
		location: "/scan",
		icon: <ScanIcon />,
	},
];

export default function Navbar() {
	const [location, navigate] = useLocation();

	return (
		<div className={classes.wrapper}>
			<div className={classes["icons-wrapper"]}>
				{actions.map((action, index) => {
					return (
						<div
							key={index}
							className={clsx(
								classes.icon,
								location === action.location && classes.active,
							)}
							onClick={() => {
								navigate(action.location);
							}}
						>
							{action.icon}
						</div>
					);
				})}
			</div>
		</div>
	);
}
