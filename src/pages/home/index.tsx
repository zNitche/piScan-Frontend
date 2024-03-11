import Loader from "../../components/loader/loader";
import HomeIcon from "../../icons/home";
import classes from "./index.module.css";

export default function Home() {
	return (
		<div className={classes.wrapper}>
			<HomeIcon /> Hello Home
			<Loader />
		</div>
	);
}
