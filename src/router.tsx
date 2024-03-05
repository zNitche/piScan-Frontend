import { Route, Switch } from "wouter";
import Home from "./pages/home";

export default function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route>Not Found</Route>
        </Switch>
    )
}
