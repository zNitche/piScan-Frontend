import { Route, Switch } from "wouter";
import Home from "./pages/home";
import NotFound from "./pages/not_found";
import Devices from "./pages/devices";

export default function Router() {
	return (
		<Switch>
			<Route
				path="/"
				component={Home}
			/>
			<Route
				path="/devices"
				component={Devices}
			/>
			<Route component={NotFound} />
		</Switch>
	);
}
