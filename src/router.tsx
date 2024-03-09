import { Route, Switch } from "wouter";
import Home from "./pages/home";
import NotFound from "./pages/not_found";

export default function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
        </Switch>
    )
}
