import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import NotificationsProvider from "./context/notifications_provider";
import Router from "./router";

function App() {
    return (
        <NotificationsProvider>
            <div className="main-wrapper">
                <Header />
                <div className="content-wrapper">
                    <Router />
                </div>
                <Navbar />
            </div>
        </NotificationsProvider>
    );
}

export default App;
