import classes from "./index.module.css";

export default function NotFound() {
	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>404</div>
			<div className={classes.caption}>page not found</div>
		</div>
	);
}
